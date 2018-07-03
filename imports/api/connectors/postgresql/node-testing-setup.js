// this is where I compile all the things
// while I test and figure them out in the REPL
// if this code looks bad or improper, don't worry:
// it's only ever meant to be run in the Node.js
// REPL via copy-paste

const { Pool } = require("pg");
let pool = new Pool();

// variable declarations, so I can freely
// reassign them via copy-paste
let getCompanyByName;
let getCompanyById;
let companyNameRegexSearch;
let getAllCompanies;
let createCompany;
let obj;

getCompanyByName = async function(name) {
	const client = await pool.connect();
	let companyResults = { rows: [] };
	let locationResults = { rows: [] };
	let statResults = { rows: [] };
	try {
		await client.query("START TRANSACTION READ ONLY");
		companyResults = await client.query(
			"SELECT * FROM companies WHERE name=$1",
			[name]
		);
		locationResults = await client.query(
			"SELECT locationname FROM company_locations WHERE companyid=$1",
			[companyResults.rows[0].companyid]
		);
		statResults = await client.query(
			"SELECT * FROM company_review_statistics WHERE name=$1",
			[name]
		);
		await client.query("COMMIT");
	} finally {
		await client.release();
	}

	return {
		company: companyResults.rows[0],
		locations: locationResults.rows,
		reviewStats: statResults.rows[0],
	};
};

getCompanyById = async function(id) {
	const client = await pool.connect();
	let companyResults = { rows: [] };
	let locationResults = { rows: [] };
	let reviewStats = { rows: [] };
	try {
		await client.query("START TRANSACTION READ ONLY");
		companyResults = await client.query(
			"SELECT * FROM companies WHERE companyid=$1",
			[id]
		);
		locationResults = await client.query(
			"SELECT locationname FROM company_locations WHERE companyid=$1",
			[id]
		);
		statResults = await client.query(
			"SELECT * FROM company_review_statistics WHERE name=$1",
			[companyResults.rows[0].name]
		);
		await client.query("COMMIT");
	} finally {
		await client.release();
	}

	return {
		company: companyResults.rows[0],
		locations: locationResults.rows,
		reviewStats: statResults.rows[0],
	};
};

companyNameRegexSearch = async function(name, skip, limit) {
	const client = await pool.connect();
	let companyResults = { rows: [] };
	let locationResults = {};
	let statResults = {};
	try {
		await client.query("START TRANSACTION READ ONLY");
		companyResults = await client.query(
			"SELECT * FROM companies WHERE name LIKE $1 OFFSET $2 LIMIT $3",
			["%" + name + "%", skip, limit]
		);

		for (let company of companyResults.rows) {
			let locations = await client.query(
				"SELECT * FROM company_locations WHERE companyid=$1",
				[company.companyid]
			);
			let stats = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[company.name]
			);
			locationResults[company.name] = locations.rows;
			statResults[company.name] = stats.rows[0];
		}

		await client.query("COMMIT");
	} finally {
		await client.release();
	}

	return {
		matchingCompanies: companyResults.rows,
		matchingCompanyLocations: locationResults,
		matchingCompanyReviewStats: statResults,
	};
};

getAllCompanies = async function(skip, limit) {
	const client = await pool.connect();
	let companyResults = { rows: [] };
	let locationResults = {};
	let statResults = {};
	try {
		await client.query("START TRANSACTION READ ONLY");
		companyResults = await client.query(
			"SELECT * FROM companies OFFSET $1 LIMIT $2",
			[skip, limit]
		);

		for (let company of companyResults.rows) {
			let locations = await client.query(
				"SELECT * FROM company_locations WHERE companyid=$1",
				[company.companyid]
			);
			let stats = await client.query(
				"SELECT * FROM company_review_statistics WHERE name=$1",
				[company.name]
			);
			locationResults[company.name] = locations.rows;
			statResults[company.name] = stats.rows[0];
		}

		await client.query("COMMIT");
	} finally {
		await client.release();
	}

	return {
		matchingCompanies: companyResults.rows,
		matchingCompanyLocations: locationResults,
		matchingCompanyReviewStats: statResults,
	};
};

createCompany = async function(company) {
	const client = await pool.connect();
	await client.query("START TRANSACTION");
	let newCompany = { rows: [] };
	let newLocations = { rows: [] };

	try {
		// assumes that company has the well-known format
		// from the schema in imports/api/data/companies.js
		newCompany = await client.query(
			"INSERT INTO companies (name,dateEstablished,industry,otherContactInfo,descriptionOfCompany,numEmployees,contactEmail,websiteURL) " +
				"VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", // I love PostgreSQL
			[
				company.name,
				company.dateEstablished,
				company.industry,
				company.otherContactInfo,
				company.descriptionOfCompany,
				company.numEmployees,
				company.contactEmail,
				company.websiteURL,
			]
		);

		// screw functional programming
		const id = newCompany.rows[0].companyid;
		let insertValues = [];
		let insertValueString = "";
		let index = 0;
		for (let location of company.locations) {
			insertValues.push(id, location);
			insertValueString =
				insertValueString +
				"($" +
				(index + 1) +
				",$" +
				(index + 2) +
				"),";
			index += 2;
		}
		insertValueString = insertValueString.slice(0, -1);

		newLocations = await client.query(
			"INSERT INTO company_locations (companyid,locationname) " +
				"VALUES " +
				insertValueString +
				" RETURNING *",
			insertValues
		);

		await client.query("COMMIT");
	} finally {
		await client.release();
	}

	return {
		company: newCompany.rows[0],
		locations: newLocations.rows,
	};
};

// requires that server/sql/tests/setup-playground has been run
obj = await getCompanyByName("a");
obj = await getCompanyById(1);
obj = await companyNameRegexSearch("a",0,1000);
obj = await getAllCompanies(0,1000);

let vize = {
	name: "wut",
	numEmployees: "1 - 50",
	industry: "Software Development",
	otherContactInfo: "None to speak of",
	contactEmail: "incentivizinggood@gmail.com",
	websiteURL: "https://www.incentivizinggood.com",
	descriptionOfCompany: "Pretty leet",
	locations: ["My house", "Shaffer's aparment", "Tijuana"]
}

obj = await createCompany(vize);

let getReviewById;
let getReviewsByAuthor;
let getAllReviews;
let getReviewsForCompany;
let submitReview;

getReviewById = async function(id) {
	const client = await pool.connect();
	let reviewResults = { rows: [] };
	let voteResults = { rows: [] };
	try {
		await client.query("START TRANSACTION READ ONLY");

		reviewResults = await client.query(
			"SELECT * FROM reviews WHERE reviewid=$1",
			[id]
		);

		voteResults = await client.query(
			"SELECT * FROM review_vote_counts WHERE refersto=$1",
			[id]
		);
		await client.query("COMMIT");
	} finally {
		await client.release();
	}

	return {
		review: reviewResults.rows[0],
		votes: voteResults.rows[0],
	};
};

getReviewsByAuthor = async function(id, skip, limit) {
	const client = await pool.connect();
	let reviewResults = { rows: [] };
	let voteResults = {};
	try {
		await client.query("START TRANSACTION READ ONLY");

		reviewResults = await client.query(
			"SELECT * FROM reviews WHERE submittedby=$1",
			[id]
		);

		voteResults = {};
		for (let review of reviewResults.rows) {
			let votes = await client.query(
				"SELECT * FROM review_vote_counts WHERE refersto=$1",
				[review.reviewid]
			);

			voteResults[review.reviewid] = votes.rows[0];
		}

		await client.query("COMMIT");
	} finally {
		await client.release();
	}

	return {
		reviews: reviewResults.rows,
		votes: voteResults,
	};
};

getAllReviews = async function(skip, limit) {};

getReviewsForCompany = async function(name, skip, limit) {};

submitReview = async function(review) {};
