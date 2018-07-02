// this is where I compile all the things
// while I test and figure them out in the REPL
// if this code looks bad or improper, don't worry:
// it's only ever meant to be run in the Node.js
// REPL via copy-paste

const { Pool } = require("pg");
const pool = new Pool();

// variable declarations, so I can freely
// reassign them via copy-paste
let getCompanyByName;
let getCompanyById;
let companyNameRegexSearch;
let getAllCompanies;
let obj;

getCompanyByName = async function(name) {
	const client = await pool.connect();
	await client.query("START TRANSACTION READ ONLY");
	const companyResults = await client.query(
		"SELECT * FROM companies WHERE name=$1",
		[name]
	);
	const locationResults = await client.query(
		"SELECT locationname FROM company_locations WHERE companyid=$1",
		[companyResults.rows[0].companyid]
	);
	const statResults = await client.query(
		"SELECT * FROM company_review_statistics WHERE name=$1",
		[name]
	);
	await client.query("COMMIT");
	client.release();

	return {
		company: companyResults.rows[0],
		locations: locationResults.rows,
		reviewStats: statResults.rows[0],
	};
};

getCompanyById = async function(id) {
	const client = await pool.connect();
	await client.query("START TRANSACTION READ ONLY");
	const companyResults = await client.query(
		"SELECT * FROM companies WHERE companyid=$1",
		[id]
	);
	const locationResults = await client.query(
		"SELECT locationname FROM company_locations WHERE companyid=$1",
		[id]
	);
	const statResults = await client.query(
		"SELECT * FROM company_review_statistics WHERE name=$1",
		[companyResults.rows[0].name]
	);
	await client.query("COMMIT");
	client.release();

	return {
		company: companyResults.rows[0],
		locations: locationResults.rows,
		reviewStats: statResults.rows[0],
	};
};

companyNameRegexSearch = async function(name,skip,limit) {
	const client = await pool.connect();
	await client.query("START TRANSACTION READ ONLY");
	const companyResults = await client.query(
		"SELECT * FROM companies WHERE name LIKE $1 OFFSET $2 LIMIT $3",
		["%" + name + "%",skip,limit]
	);

	let locationResults = {};
	let statResults = {};
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
	client.release();

	return {
		matchingCompanies: companyResults.rows,
		matchingCompanyLocations: locationResults,
		matchingCompanyReviewStats: statResults
	}
}

getAllCompanies = async function(skip, limit) {
	const client = await pool.connect();
	await client.query("START TRANSACTION READ ONLY");
	const companyResults = await client.query(
		"SELECT * FROM companies OFFSET $1 LIMIT $2",
		[skip, limit]
	);

	const locationResults = {};
	const statResults = {};
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
	client.release();

	return {
		matchingCompanies: companyResults.rows,
		matchingCompanyLocations: locationResults,
		matchingCompanyReviewStats: statResults,
	};
}

// requires that server/sql/tests/setup-playground has been run
await getCompanyByName("a");
await getCompanyById(1);
await companyNameRegexSearch("a",0,1000);
await getAllCompanies(0,1000);
