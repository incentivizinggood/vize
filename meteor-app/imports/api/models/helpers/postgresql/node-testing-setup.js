// this is where I compile all the things
// while I test and figure them out in the REPL
// if this code looks bad or improper, don't worry:
// it's only ever meant to be run in the Node.js
// REPL via copy-paste

/*
	QUESTION
	Is it acceptable for null-values in certain fields
	to be converted to 0 by casting to Number in the
	various process*Results functions?
*/

const { Pool } = require("pg");
const fs = require("fs");

let pool = new Pool();

const closeAndExit = function(event) {
	pool.end(status => {
		console.log(`goodbye: ${event}, ${status}`);
	});
};

process.on("SIGTERM", closeAndExit);
process.on("SIGINT", closeAndExit);

let castToNumberIfDefined;
let processLocation;

castToNumberIfDefined = function(number) {
	return number === undefined || number === null ? number : Number(number);
};

processLocation = function(location) {
	/*
		location is expected to be a JSON
		string with the following format:
		{
			city: String
			address: String
			industrialHub: String
		}
		Right now we parse it with the purpose
		of giving back only the industrialHub.
		However, if one of the other two fields
		is defined, then we prefer first the
		city, and then the address. If none of
		these fields are defined, then there has
		been an error in one of the database
		functions. However, ince the underlying
		tables all force locations to be of type
		text, we can just return location since
		we know it will be a valid String, and
		that is all that GraphQL and the frontend
		are expecting at this point.
	*/
	let returnVal = "";

	try {
		const locationObj = JSON.parse(location);

		if (
			locationObj.industrialHub !== undefined &&
			locationObj.industrialHub !== null
		)
			returnVal = locationObj.industrialHub;
		else if (locationObj.city !== undefined && locationObj.city !== null)
			returnVal = locationObj.city;
		else if (
			locationObj.address !== undefined &&
			locationObj.address !== null
		)
			returnVal = locationObj.address;
	} catch (e) {
		returnVal = location;
	}

	if (returnVal === "") {
		return location;
	}

	return returnVal;
};

let wrapPgFunction;
let PostgreSQL;

// These function assume that arguments to the
// function parameter (query and mutation) are
// passed after the function name, so that they
// can be accessed and used array-style
wrapPgFunction = async function(func, readOnly) {
	const client = await pool.connect();
	let result = {};
	try {
		if (readOnly) await client.query("START TRANSACTION READ ONLY");
		else await client.query("START TRANSACTION");

		// removes function name and readOnly flag
		// from start of args list
		result = await func.apply(
			null,
			[client].concat([...arguments].slice(2)[0])
		);

		await client.query("COMMIT");
	} catch (e) {
		console.log(e);
		await client.query("ROLLBACK");
		result = e;
	} finally {
		await client.release();
	}

	if (result instanceof Error) {
		throw new Error(
			`${result.constraint}: ${result.detail} [sqlState ${result.code}]`
		);
	}

	return result;
};

PostgreSQL = class {
	static async executeQuery(query) {
		return wrapPgFunction(query, true, [...arguments].slice(1));
	}

	static async executeMutation(mutation) {
		return wrapPgFunction(mutation, false, [...arguments].slice(1));
	}
}

// variable declarations, so I can freely
// reassign them via copy-paste
let getCompanyByName;
let getCompanyById;
let companyNameRegexSearch;
let getAllCompanies;
let createCompany;
let processCompanyResults;

getCompanyByName = async function(client, name) {
	let companyResults = { rows: [] };
	let locationResults = { rows: undefined };
	let statResults = { rows: [] };

	companyResults = await client.query(
		"SELECT * FROM companies WHERE name=$1",
		[name]
	);

	if (companyResults.rows.length > 0) {
		locationResults = await client.query(
			"SELECT * FROM company_locations WHERE companyid=$1",
			[companyResults.rows[0].companyid]
		);
		statResults = await client.query(
			"SELECT * FROM company_review_statistics WHERE name=$1",
			[name]
		);
	}

	return {
		company: companyResults.rows[0],
		locations: locationResults.rows,
		reviewStats: statResults.rows[0],
	};
}

getCompanyById = async function(client, id) {
	let companyResults = { rows: [] };
	let locationResults = { rows: undefined };
	let statResults = { rows: [] };

	companyResults = await client.query(
		"SELECT * FROM companies WHERE companyid=$1",
		[id]
	);

	if (companyResults.rows.length > 0) {
		locationResults = await client.query(
			"SELECT * FROM company_locations WHERE companyid=$1",
			[id]
		);
		statResults = await client.query(
			"SELECT * FROM company_review_statistics WHERE name=$1",
			[companyResults.rows[0].name]
		);
	}

	return {
		company: companyResults.rows[0],
		locations: locationResults.rows,
		reviewStats: statResults.rows[0],
	};
}

companyNameRegexSearch = async function(client, name, skip, limit) {
	let companyResults = { rows: [] };
	let locationResults = {};
	let statResults = {};

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

	return {
		companies: companyResults.rows,
		locations: locationResults,
		reviewStats: statResults,
	};
}

getAllCompanies = async function(client, skip, limit) {
	let companyResults = { rows: [] };
	let locationResults = {};
	let statResults = {};

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

	return {
		companies: companyResults.rows,
		locations: locationResults,
		reviewStats: statResults,
	};
}

createCompany = async function(client, company) {
	let newCompany = { rows: [] };
	let newLocations = { rows: [] };
	let newStats = { rows: [] };

	// assumes that company has the well-known format
	// from the schema in imports/api/data/companies.js
	newCompany = await client.query(
		"INSERT INTO companies (name,yearEstablished,industry,contactPhoneNumber,descriptionOfCompany,numEmployees,contactEmail,websiteURL) " +
			"VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *", // I love PostgreSQL
		[
			company.name,
			company.yearEstablished,
			company.industry,
			company.contactPhoneNumber,
			company.descriptionOfCompany,
			company.numEmployees,
			company.contactEmail,
			company.websiteURL,
		]
	);

	if (newCompany.rows.length > 0) {
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
			"INSERT INTO company_locations (companyid,companylocation) " +
				"VALUES " +
				insertValueString +
				" RETURNING *",
			insertValues
		);
	}

	return {
		company: newCompany.rows[0],
		locations: newLocations.rows,
		/*
				Alas, PostgreSQL does not truly support
				"READ UNCOMMITTED" transactions, which
				prevents one from getting the review stats
				as well if there were already reviews for
				a company with the name of the new company,
				but I still want to prevent this function
				being yet another exception case for the
				purposes of results-processing, so we give
				back dummy, default values
			*/
		reviewStats: {
			name: newCompany.rows.length > 0 ? newCompany.rows[0].name : "",
			numreviews: 0,
			avgnummonthsworked: 0,
			percentrecommended: 0,
			healthandsafety: 0,
			managerrelationship: 0,
			workenvironment: 0,
			benefits: 0,
			overallsatisfaction: 0,
		},
	};
}

processCompanyResults = function(companyResults) {
	/*
		Translate directly from model function results
		to Mongo SimplSchema format

		expects object with fields:
		company or companies -> singular company, or array of companies
		locations -> object with arrays indexed by company name
		optional reviewStats -> object with objects indexed by company name
		return array of companies, or dictionary of companies indexed by name?
		-> array is easier to iterate through
		-> companies should be in the same order they are given,
				assumes already sorted
	*/

	/*
		This function is super ugly but it works. If someone knows
		a better more functional-programming way to do this,
		please let me know or else feel free to fix it yourself.
	*/

	// singular company
	if (companyResults.company !== undefined) {
		return {
			_id: Number(companyResults.company.companyid),
			name: companyResults.company.name,
			contactEmail: companyResults.company.contactemail,
			yearEstablished: companyResults.company.yearestablished,
			numEmployees: companyResults.company.numemployees,
			industry: companyResults.company.industry,
			locations: companyResults.locations.map(loc =>
				JSON.parse(loc.companylocation)
			),
			contactPhoneNumber: companyResults.company.contactphonenumber,
			websiteURL: companyResults.company.websiteurl,
			descriptionOfCompany:
				companyResults.company.descriptionofcompany,
			dateJoined: companyResults.company.dateadded,
			numFlags: Number(companyResults.company.numflags),
			numReviews: Number(companyResults.reviewStats.numreviews),
			healthAndSafety: Number(
				companyResults.reviewStats.healthandsafety
			),
			managerRelationship: Number(
				companyResults.reviewStats.managerrelationship
			),
			workEnvironment: Number(
				companyResults.reviewStats.workenvironment
			),
			benefits: Number(companyResults.reviewStats.benefits),
			overallSatisfaction: Number(
				companyResults.reviewStats.overallsatisfaction
			),
			percentRecommended: Number(
				companyResults.reviewStats.percentrecommended
			),
			avgNumMonthsWorked: Number(
				companyResults.reviewStats.avgnummonthsworked
			),
		};
	}
	// array of companies
	else if (companyResults.companies !== undefined) {
		return companyResults.companies.map(company => {
			return {
				_id: Number(company.companyid),
				name: company.name,
				contactEmail: company.contactemail,
				yearEstablished: company.yearestablished,
				numEmployees: company.numemployees,
				industry: company.industry,
				locations: companyResults.locations[company.name].map(loc =>
					JSON.parse(loc.companylocation)
				),
				contactPhoneNumber: company.contactphonenumber,
				websiteURL: company.websiteurl,
				descriptionOfCompany: company.descriptionofcompany,
				dateJoined: company.dateadded,
				numFlags: Number(company.numflags),
				numReviews: Number(
					companyResults.reviewStats[company.name].numreviews
				),
				healthAndSafety: Number(
					companyResults.reviewStats[company.name].healthandsafety
				),
				managerRelationship: Number(
					companyResults.reviewStats[company.name]
						.managerrelationship
				),
				workEnvironment: Number(
					companyResults.reviewStats[company.name].workenvironment
				),
				benefits: Number(
					companyResults.reviewStats[company.name].benefits
				),
				overallSatisfaction: Number(
					companyResults.reviewStats[company.name]
						.overallsatisfaction
				),
				percentRecommended: Number(
					companyResults.reviewStats[company.name]
						.percentrecommended
				),
				avgNumMonthsWorked: Number(
					companyResults.reviewStats[company.name]
						.avgnummonthsworked
				),
			};
		});
	}
	return undefined;
}

let getUserById;
let createUser;
let setUserCompanyInfo;

getUserById = async function(client, id) {
	// Can take a MongoId (string)
	// or a PostgreSQL id (integer)
	let userResult = { rows: [] };
	let selector;
	if (typeof id === "string") selector = "usermongoid";
	else if (typeof id === "number") selector = "userid";
	else
		throw new Error(
			"illegal argument type: " +
				typeof id +
				" (expects string or number)"
		);

	userResult = await client.query(
		"SELECT * FROM users WHERE " + selector + "=$1",
		[id]
	);

	return {
		user: userResult.rows[0],
	};
}

createUser = async function(client, user, companyPostgresId) {
	// Assumes that user follows the schema in
	// imports/api/data/users.js
	let newUser = { rows: [] };

	// Some of the arguments and insertion values may
	// be undefined, but this is perfectly okay,
	// I want there to at least be the option
	newUser = await client.query(
		"INSERT INTO users (userMongoId,role,companyId) " +
			"VALUES ($1,$2,$3) RETURNING *",
		[user._id, user.role, companyPostgresId]
	);

	return {
		user: newUser.rows[0],
	};
}

setUserCompanyInfo = async function(client, userId, companyId) {
	// Expects a userId (string Mongo id
	// or integer Postgres id), the company's
	// integer Postgres id, and the company's
	// string Mongo id. We assume that the
	// caller is the only one who knows all
	// these things, and make no attempt to
	// calculate any of them.
	// Of course, this doesn't particularly
	// handle the case where we want to set
	// companyId or companyMongoId but not both,
	// but I'm not sure when we would encounter
	// that case anyway.
	let newUser = { rows: [] };
	let selector;
	if (typeof userId === "string") selector = "usermongoid";
	else if (typeof userId === "number") selector = "userid";
	else
		throw new Error(
			"illegal argument type: " +
				typeof userId +
				" (expects string or number)"
		);

	newUser = await client.query(
		"UPDATE users " +
			"SET companyid=$1 " +
			"WHERE " +
			selector +
			"=$2 RETURNING *",
		[companyId, userId]
	);

	return {
		user: newUser.rows[0],
	};
}

let getReviewById;
let getReviewsByAuthor;
let getAllReviews;
let getReviewsForCompany;
let submitReview;
let processReviewResults;

getReviewById = async function(client, id) {
	let reviewResults = { rows: [] };
	let voteResults = { rows: [] };

	reviewResults = await client.query(
		"SELECT * FROM reviews WHERE reviewid=$1",
		[id]
	);

	voteResults = await client.query(
		"SELECT * FROM review_vote_counts WHERE refersto=$1",
		[id]
	);

	return {
		review: reviewResults.rows[0],
		votes: voteResults.rows[0],
	};
}

getReviewsByAuthor = async function(client, id, skip, limit) {
	let reviewResults = { rows: [] };
	let voteResults = {};

	reviewResults = await client.query(
		"SELECT * FROM reviews WHERE submittedby=$1 OFFSET $2 LIMIT $3",
		[id, skip, limit]
	);

	for (let review of reviewResults.rows) {
		let votes = await client.query(
			"SELECT * FROM review_vote_counts WHERE refersto=$1",
			[review.reviewid]
		);

		voteResults[review.reviewid] = votes.rows[0];
	}

	return {
		reviews: reviewResults.rows,
		votes: voteResults,
	};
}

getAllReviews = async function(client, skip, limit) {
	let reviewResults = { rows: [] };
	let voteResults = {};

	reviewResults = await client.query(
		"SELECT * FROM reviews OFFSET $1 LIMIT $2",
		[skip, limit]
	);

	for (let review of reviewResults.rows) {
		const votes = await client.query(
			"SELECT * FROM review_vote_counts WHERE refersto=$1",
			[review.reviewid]
		);

		voteResults[review.reviewid] = votes.rows[0];
	}

	return {
		reviews: reviewResults.rows,
		votes: voteResults,
	};
}

getReviewsForCompany = async function(client, name, skip, limit) {
	let reviewResults = { rows: [] };
	let voteResults = {};

	reviewResults = await client.query(
		"SELECT * FROM reviews WHERE companyname=$1 OFFSET $2 LIMIT $3",
		[name, skip, limit]
	);

	for (let review of reviewResults.rows) {
		let votes = await client.query(
			"SELECT * FROM review_vote_counts WHERE refersto=$1",
			[review.reviewid]
		);

		voteResults[review.reviewid] = votes.rows[0];
	}

	return {
		reviews: reviewResults.rows,
		votes: voteResults,
	};
}

submitReview = async function(client, review) {
	// assumes review is formatted for SimplSchema conformity
	// ignores Comments and upvotes/downvotes, because this is
	// (supposed to be) a new review, which cannot have been
	// commented or voted on yet

	let newReview = { rows: [] };

	newReview = await client.query(
		"INSERT INTO reviews " +
			"(submittedBy,companyName,companyId,reviewLocation," +
			"reviewTitle,jobTitle,numMonthsWorked,pros,cons," +
			"wouldRecommend,healthAndSafety,managerRelationship," +
			"workEnvironment,benefits,overallSatisfaction,additionalComments) " +
			"VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) " +
			"RETURNING *",
		[
			review.submittedBy,
			review.companyName,
			review.companyId,
			review.location,
			review.reviewTitle,
			review.jobTitle,
			review.numberOfMonthsWorked,
			review.pros,
			review.cons,
			review.wouldRecommendToOtherJobSeekers,
			review.healthAndSafety,
			review.managerRelationship,
			review.workEnvironment,
			review.benefits,
			review.overallSatisfaction,
			review.additionalComments,
		]
	);

	return {
		review: newReview.rows[0],
		// dummy values to prevent exception case
		votes: {
			refersto:
				newReview.rows[0] === undefined
					? -1
					: newReview.rows[0].reviewid,
			upvotes: 0,
			downvotes: 0,
		},
	};
}

processReviewResults = function(reviewResults) {
	/*
		Translate from model function results
		to Mongo SimplSchema format

		Expects object with fields:
		- review or reviews: singular review or array of reviews
		- votes: singular or array depending on whether we get review or reviews
	*/
	if (reviewResults.review !== undefined) {
		const review = reviewResults.review;
		return {
			_id: Number(review.reviewid),
			submittedBy: castToNumberIfDefined(review.submittedby),
			companyName: review.companyname,
			companyId: castToNumberIfDefined(review.companyid),
			reviewTitle: review.reviewtitle,
			location: JSON.parse(review.reviewlocation),
			jobTitle: review.jobtitle,
			numberOfMonthsWorked: Number(review.nummonthsworked),
			pros: review.pros,
			cons: review.cons,
			wouldRecommendToOtherJobSeekers: review.wouldrecommend,
			healthAndSafety: Number(review.healthandsafety),
			managerRelationship: Number(review.managerrelationship),
			workEnvironment: Number(review.workenvironment),
			benefits: Number(review.benefits),
			overallSatisfaction: Number(review.overallsatisfaction),
			additionalComments: review.additionalcomments,
			datePosted: review.dateadded,
			upvotes: Number(reviewResults.votes.upvotes),
			downvotes: Number(reviewResults.votes.downvotes),
		};
	} else if (reviewResults.reviews !== undefined) {
		return reviewResults.reviews.map(review => {
			return {
				_id: Number(review.reviewid),
				submittedBy: castToNumberIfDefined(review.submittedby),
				companyName: review.companyname,
				companyId: castToNumberIfDefined(review.companyid),
				reviewTitle: review.reviewtitle,
				location: JSON.parse(review.reviewlocation),
				jobTitle: review.jobtitle,
				numberOfMonthsWorked: Number(review.nummonthsworked),
				pros: review.pros,
				cons: review.cons,
				wouldRecommendToOtherJobSeekers: review.wouldrecommend,
				healthAndSafety: Number(review.healthandsafety),
				managerRelationship: Number(review.managerrelationship),
				workEnvironment: Number(review.workenvironment),
				benefits: Number(review.benefits),
				overallSatisfaction: Number(review.overallsatisfaction),
				additionalComments: review.additionalcomments,
				datePosted: review.dateadded,
				upvotes: Number(
					reviewResults.votes[String(review.reviewid)].upvotes
				),
				downvotes: Number(
					reviewResults.votes[String(review.reviewid)].downvotes
				),
			};
		});
	}
	return undefined;
}

let getSalaryById;
let getAllSalaries;
let getSalariesByAuthor;
let getSalariesForCompany;
let getSalaryCountForCompany;
let submitSalary;
let processSalaryResults;

getSalaryById = async function (client, id) {
	let salaryResults = { rows: [] };

	salaryResults = await client.query(
		"SELECT * FROM salaries WHERE salaryid=$1",
		[id]
	);

	return {
		salary: salaryResults.rows[0],
	};
}

getSalariesByAuthor = async function (client, id, skip, limit) {
	let salaryResults = { rows: [] };

	salaryResults = await client.query(
		"SELECT * FROM salaries WHERE submittedby=$1 OFFSET $2 LIMIT $3",
		[id, skip, limit]
	);

	return {
		salaries: salaryResults.rows,
	};
}

getAllSalaries = async function (client, skip, limit) {
	let salaryResults = { rows: [] };

	salaryResults = await client.query(
		"SELECT * FROM salaries OFFSET $1 LIMIT $2",
		[skip, limit]
	);

	return {
		salaries: salaryResults.rows,
	};
}

getSalariesForCompany = async function (client, name, skip, limit) {
	let salaryResults = { rows: [] };

	salaryResults = await client.query(
		"SELECT * FROM salaries WHERE companyname=$1 OFFSET $2 LIMIT $3",
		[name, skip, limit]
	);

	return {
		salaries: salaryResults.rows,
	};
}

getSalaryCountForCompany = async function (client, name) {
	let countResults = { rows: [{ count: undefined }] };

	countResults = await client.query(
		"SELECT * FROM salary_counts WHERE companyname=$1",
		[name]
	);

	return countResults.rows[0] === undefined
		? undefined
		: Number(countResults.rows[0].count);
}

submitSalary = async function (client, salary) {
	// assumes salary is formatted for SimplSchema conformity
	let newSalary = { rows: [] };

	newSalary = await client.query(
		"INSERT INTO salaries " +
			"(submittedby,companyname,companyid,salarylocation," +
			"jobtitle,incometype,incomeamount,gender) " +
			"VALUES ($1,$2,$3,$4,$5,$6,$7,$8) " +
			"RETURNING *",
		[
			salary.submittedBy,
			salary.companyName,
			salary.companyId,
			salary.location,
			salary.jobTitle,
			salary.incomeType,
			salary.incomeAmount,
			salary.gender,
		]
	);

	return {
		salary: newSalary.rows[0],
	};
}

processSalaryResults = function(salaryResults) {
	/*
		Expects object as argument,
		with single field:
		either salary (singular salary) or salaries (array of salaries)
	*/
	if (salaryResults.salary !== undefined) {
		const salary = salaryResults.salary;
		return {
			_id: Number(salary.salaryid),
			submittedby: castToNumberIfDefined(salary.submittedby),
			companyName: salary.companyname,
			companyId: castToNumberIfDefined(salary.companyid),
			location: JSON.parse(salary.salarylocation),
			jobTitle: salary.jobtitle,
			incomeType: salary.incometype,
			incomeAmount: salary.incomeamount,
			gender: salary.gender,
			datePosted: salary.dateadded,
		};
	} else if (salaryResults.salaries !== undefined) {
		return salaryResults.salaries.map(salary => {
			return {
				_id: Number(salary.salaryid),
				submittedby: castToNumberIfDefined(salary.submittedby),
				companyName: salary.companyname,
				companyId: castToNumberIfDefined(salary.companyid),
				location: JSON.parse(salary.salarylocation),
				jobTitle: salary.jobtitle,
				incomeType: salary.incometype,
				incomeAmount: salary.incomeamount,
				gender: salary.gender,
				datePosted: salary.dateadded,
			};
		});
	}
	return undefined;
}

let getJobAdById;
let getAllJobAds;
let getJobAdsByCompany;
let getJobAdCountForCompany;
let postJobAd;
let processJobAdResults;

getJobAdById = async function(client, id) {
	let jobAdResults = { rows: [] };
	let locationResults = { rows: [] };

	jobAdResults = await client.query(
		"SELECT * FROM jobads WHERE jobadid=$1",
		[id]
	);

	locationResults = await client.query(
		"SELECT * FROM job_locations WHERE jobadid=$1",
		[id]
	);

	return {
		jobad: jobAdResults.rows[0],
		locations: locationResults.rows,
	};
}

getAllJobAds = async function(client, skip, limit) {
	let jobAdResults = { rows: [] };
	let locationResults = {};

	jobAdResults = await client.query(
		"SELECT * FROM jobads OFFSET $1 LIMIT $2",
		[skip, limit]
	);

	for (let jobad of jobAdResults.rows) {
		let locations = await client.query(
			"SELECT * FROM job_locations WHERE jobadid=$1",
			[jobad.jobadid]
		);
		locationResults[jobad.jobadid] = locations.rows;
	}

	return {
		jobads: jobAdResults.rows,
		locations: locationResults,
	};
}

getJobAdsByCompany = async function(client, companyName, skip, limit) {
	let jobAdResults = { rows: [] };
	let locationResults = {};

	jobAdResults = await client.query(
		"SELECT * FROM jobads WHERE companyname=$1 OFFSET $2 LIMIT $3",
		[companyName, skip, limit]
	);

	for (let jobad of jobAdResults.rows) {
		let locations = await client.query(
			"SELECT * FROM job_locations WHERE jobadid=$1",
			[jobad.jobadid]
		);
		locationResults[jobad.jobadid] = locations.rows;
	}

	return {
		jobads: jobAdResults.rows,
		locations: locationResults,
	};
}

getJobAdCountForCompany = async function(client, name) {
	let countResults = { rows: [{ count: undefined }] };

	countResults = await client.query(
		"SELECT * FROM job_post_counts WHERE companyname=$1",
		[name]
	);

	return countResults.rows[0] === undefined
		? undefined
		: Number(countResults.rows[0].count);
}

postJobAd = async function(client, jobad) {
	let newJobAd = { rows: [] };
	let newLocations = { rows: [] };

	newJobAd = await client.query(
		"INSERT INTO jobads " +
			"(companyname,companyid,jobtitle,pesosperhour," +
			"contracttype,jobdescription,responsibilities,qualifications) " +
			"VALUES ($1,$2,$3,$4,$5,$6,$7,$8) " +
			"RETURNING *",
		[
			jobad.companyName,
			jobad.companyId,
			jobad.jobTitle,
			jobad.pesosPerHour,
			jobad.contractType,
			jobad.jobDescription,
			jobad.responsibilities,
			jobad.qualifications,
		]
	);

	// this bit could probably be refactored out into a
	// function and used for both companies and jobads
	const id = newJobAd.rows[0].jobadid;
	let insertValues = [];
	let insertValueString = "";
	let index = 0;
	for (let location of jobad.locations) {
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
		"INSERT INTO job_locations (jobadid,joblocation) " +
			"VALUES " +
			insertValueString +
			" RETURNING *",
		insertValues
	);

	return {
		jobad: newJobAd.rows[0],
		locations: newLocations.rows,
	};
}

processJobAdResults = function(jobAdResults) {
	/*
		Expect input object to have fields:
		jobad or jobads for single ad or array of ads
		locations
	*/
	if (jobAdResults.jobad !== undefined) {
		const jobad = jobAdResults.jobad;
		return {
			_id: Number(jobad.jobadid),
			companyName: jobad.companyname,
			companyId: castToNumberIfDefined(jobad.companyid),
			jobTitle: jobad.jobtitle,
			locations: jobAdResults.locations.map(loc =>
				JSON.parse(loc.joblocation)
			),
			pesosPerHour: jobad.pesosperhour,
			contractType: jobad.contracttype,
			jobDescription: jobad.jobdescription,
			responsibilities: jobad.responsibilities,
			qualifications: jobad.qualifications,
			datePosted: jobad.dateadded,
		};
	} else if (jobAdResults.jobads !== undefined) {
		return jobAdResults.jobads.map(jobad => {
			return {
				_id: Number(jobad.jobadid),
				companyName: jobad.companyname,
				companyId: castToNumberIfDefined(jobad.companyid),
				jobTitle: jobad.jobtitle,
				locations: jobAdResults.locations[
					String(jobad.jobadid)
				].map(loc => JSON.parse(loc.joblocation)),
				pesosPerHour: jobad.pesosperhour,
				contractType: jobad.contracttype,
				jobDescription: jobad.jobdescription,
				responsibilities: jobad.responsibilities,
				qualifications: jobad.qualifications,
				datePosted: jobad.dateadded,
			};
		});
	}
}

let getCommentById;
let getAllComments;
let getCommentsByAuthor;
let writeComment;
let processCommentResults;

getCommentById = async function(client, id) {
	let commentResults = { rows: [] };
	let voteResults = { rows: [] };

	commentResults = await client.query(
		"SELECT * FROM review_comments WHERE commentid=$1",
		[id]
	);

	voteResults = await client.query(
		"SELECT * FROM comment_vote_counts WHERE refersto=$1",
		[id]
	);

	return {
		comment: commentResults.rows[0],
		votes: voteResults.rows[0],
	};
}

getAllComments = async function(client, skip, limit) {
	let commentResults = { rows: [] };
	let voteResults = {};

	commentResults = await client.query(
		"SELECT * FROM review_comments OFFSET $1 LIMIT $2",
		[skip, limit]
	);

	for (let comment of commentResults.rows) {
		let votes = await client.query(
			"SELECT * FROM comment_vote_counts WHERE refersto=$1",
			[comment.commentid]
		);

		voteResults[comment.commentid] = votes.rows[0];
	}

	return {
		comments: commentResults.rows,
		votes: voteResults,
	};
}

getCommentsByAuthor = async function(client, id, skip, limit) {
	let commentResults = { rows: [] };
	let voteResults = {};

	commentResults = await client.query(
		"SELECT * FROM review_comments WHERE submittedby=$1 OFFSET $2 LIMIT $3",
		[id, skip, limit]
	);

	for (let comment of commentResults.rows) {
		let votes = await client.query(
			"SELECT * FROM comment_vote_counts WHERE refersto=$1",
			[comment.commentid]
		);

		voteResults[comment.commentid] = votes.rows[0];
	}

	return {
		comments: commentResults.rows,
		votes: voteResults,
	};
}

writeComment = async function(client, comment) {
	// assumes that the comment follows a SimplSchema-esque
	// JSON format, and that it has no flags, upvotes, or
	// downvotes yet
	let newComment = { rows: [] };
	newComment = await client.query(
		"INSERT INTO review_comments (reviewid,submittedby,content)" +
			"VALUES ($1,$2,$3) RETURNING *",
		[comment.reviewId, comment.submittedBy, comment.content]
	);

	return {
		comment: newComment.rows[0],
		votes: {
			refersto: newComment.commentid,
			upvotes: 0,
			downvotes: 0,
		},
	};
}

processCommentResults = function(commentResults) {
	/*
		Expects argument to have fields:
		comment (singular) or comments(array)
		and votes (singular or array, depending
		on comment or comments)
	*/
	if (commentResults.comment !== undefined) {
		const comment = commentResults.comment;
		return {
			_id: Number(comment.commentid),
			datePosted: comment.dateadded,
			content: comment.content,
			refersto: Number(comment.reviewid),
			submittedBy: castToNumberIfDefined(comment.submittedby),
			upvotes: Number(commentResults.votes.upvotes),
			downvotes: Number(commentResults.votes.downvotes),
		};
	} else if (commentResults.comments !== undefined) {
		return commentResults.comments.map(comment => {
			return {
				_id: Number(comment.commentid),
				datePosted: comment.dateadded,
				content: comment.content,
				refersto: Number(comment.reviewid),
				submittedBy: castToNumberIfDefined(comment.submittedby),
				upvotes: Number(
					commentResults.votes[comment.commentid].upvotes
				),
				downvotes: Number(
					commentResults.votes[comment.commentid].downvotes
				),
			};
		});
	}
	return undefined;
}

let getVoteByPrimaryKey;
let getAllVotes;
let getVotesForSubject;
let getVotesByAuthor;
let castVote;
let processVoteResults;

getVoteByPrimaryKey = async function(client, voteKeyFields) {
	let voteResults = { rows: [] };
	if (
		voteKeyFields.voteSubject !== "review" &&
		voteKeyFields.voteSubject !== "comment"
	)
		throw new Error("Illegal subject: table does not exist");

	voteResults = await client.query(
		"SELECT * FROM " +
			voteKeyFields.voteSubject +
			"_votes WHERE submittedby=$1 AND refersto=$2",
		[voteKeyFields.submittedBy, voteKeyFields.references]
	);

	return {
		subject: voteKeyFields.voteSubject,
		vote: voteResults.rows[0],
	};
}

getAllVotes = async function(client, skip, limit) {
	let reviewVoteResults = { rows: [] };
	let commentVoteResults = { rows: [] };

	reviewVoteResults = await client.query(
		"SELECT * FROM review_vote_counts OFFSET $1 LIMIT $2",
		[skip, limit]
	);
	commentVoteResults = await client.query(
		"SELECT * FROM comment_vote_counts OFFSET $1 LIMIT $2",
		[skip, limit]
	);

	return {
		reviewVotes: reviewVoteResults.rows,
		commentVotes: commentVoteResults.rows,
	};
}

getVotesForSubject = async function(client, subject, refersto, skip, limit) {
	let voteResults = { rows: [] };
	if (subject !== "review" && subject !== "comment")
		throw new Error("Illegal subject: table does not exist");

	voteResults = await client.query(
		"SELECT * FROM " +
			subject +
			"_vote_counts WHERE " +
			"refersto=$1 OFFSET $2 LIMIT $3",
		[refersto, skip, limit]
	);

	return {
		subject: subject,
		votes: voteResults.rows[0],
	};
}

getVotesByAuthor = async function(client, id, skip, limit) {
	let reviewVoteResults = { rows: [] };
	let commentVoteResults = { rows: [] };

	reviewVoteResults = await client.query(
		"SELECT * FROM review_votes WHERE submittedby=$1 OFFSET $2 LIMIT $3",
		[id, skip, limit]
	);
	commentVoteResults = await client.query(
		"SELECT * FROM comment_votes WHERE submittedby=$1 OFFSET $2 LIMIT $3",
		[id, skip, limit]
	);

	return {
		reviewVotes: reviewVoteResults.rows,
		commentVotes: commentVoteResults.rows,
	};
}

castVote = async function(client, vote) {
	let voteResults = { rows: [] };
	if (vote.voteSubject !== "review" && vote.voteSubject !== "comment")
		throw new Error("Illegal subject: table does not exist");

	const tblName = vote.voteSubject + "_votes";
	voteResults = await client.query(
		"INSERT INTO " +
		tblName +
		" (refersto,submittedby,value) " +
		"VALUES ($1,$2,$3) " +
		"ON CONFLICT (submittedby,refersto) DO UPDATE SET value=$3 " + // I love PostgreSQL
			"RETURNING *",
		[vote.references, vote.submittedBy, vote.value]
	);

	return {
		subject: vote.voteSubject,
		vote: voteResults.rows[0],
	};
}

processVoteResults = function(voteResults) {
	/*
		Argument can be:
		vote (singular) or
		*IGNORE...*
		votes (array) and subject,
		or reviewVotes and commentVotes
		*...TO HERE*
	*/
	if (
		voteResults.vote !== undefined &&
		(voteResults.subject === "review" ||
			voteResults.subject === "comment")
	) {
		const vote = voteResults.vote;
		return {
			submittedBy: Number(vote.submittedby),
			voteSubject: voteResults.subject,
			references: Number(vote.refersto),
			value: vote.value,
			dateAdded: vote.dateadded,
		};
	}

	// Just realized that the votes case is equivalent
	// to querying the object the votes are for and discarding
	// everything about the object except the votes,
	// which seems kind of pointless. Skipping for now,
	// and will ignore until we think of some actual use case.

	// Just realized that the reviewVotes/commentVotes case
	// goes through the views, just like the votes case.
	// Not sure how we would need to process the results,
	// because I'm not sure how it would be used. Skipping for now.

	return undefined;
}

let obj;
let vize;
let vizeReview;
let vizeSalary;
let vizeJobAd;
let vizeComment;
let vizeVote;
let vizeVote2;

vize = {
	name: "another round 10",
	numEmployees: "1 - 50",
	industry: "Software Development",
	contactPhoneNumber: "5555555555",
	contactEmail: "incentivizinggood@gmail.com",
	websiteURL: "https://www.incentivizinggood.com",
	descriptionOfCompany: "Pretty leet",
	locations: ["My house", "Shaffer's aparment", "Tijuana"]
};

vizeReview = {
	companyName: 'a',
	companyId: 1,
	location: "asdf",
	reviewTitle: "Hello World",
	jobTitle: "Web developer",
	numberOfMonthsWorked: 50,
	pros: "b b b b b",
	cons: "c c c c c",
	wouldRecommendToOtherJobSeekers: true,
	healthAndSafety: 3.5,
	managerRelationship: 5,
	workEnvironment: 1.7,
	benefits: 2.8,
	overallSatisfaction: 4.3,
	additionalComments: "Hello World"
};

vizeSalary = {
	companyName: "a",
	companyId: 1,
	location: "asdf",
	jobTitle: "Web developer",
	incomeType: "Yearly Salary",
	incomeAmount: 50,
	gender: "Male"
};

vizeJobAd = {
	companyName: 'a',
	companyId: 1,
	jobTitle: "Web developer",
	locations: ["My house", "Shaffer's aparment", "Tijuana"],
	pesosPerHour: "100 - 200",
	contractType: "Full time",
	jobDescription: "Pretty leet for a web dev",
	responsibilities: "Do stuff",
	qualifications: "Be able to do stuff"
}

vizeComment = {
	reviewId: 1,
	content: "FIRST!"
}

vizeVote = {
	submittedBy: 11,
	voteSubject: "comment",
	references: 1,
	value: true
}

vizeVote2 = {
	submittedBy: 11,
	voteSubject: "comment",
	references: 1,
	value: false
}

vizeVote3 = {
	submittedBy: 11,
	voteSubject: "review",
	references: 1,
	value: true
}

vizeVote4 = {
	submittedBy: 11,
	voteSubject: "review",
	references: 1,
	value: false
}

// NOTE requires that server/sql/tests/setup-playground.sql has
// been run on the machine that these queries are being sent to

// company query functions
obj = processCompanyResults(await PostgreSQL.executeQuery(getCompanyByName, "a"));
obj = processCompanyResults(await PostgreSQL.executeQuery(getCompanyById, 1));
obj = processCompanyResults(await PostgreSQL.executeQuery(companyNameRegexSearch, "a", 0, 1000));
obj = processCompanyResults(await PostgreSQL.executeQuery(getAllCompanies, 0, 1000));

// review query functions
obj = processReviewResults(await PostgreSQL.executeQuery(getReviewById, 1));
obj = processReviewResults(await PostgreSQL.executeQuery(getReviewsByAuthor, 1, 0, 1000));
obj = processReviewResults(await PostgreSQL.executeQuery(getReviewsForCompany, 'a', 0, 1000));
obj = processReviewResults(await PostgreSQL.executeQuery(getAllReviews, 0, 1000));

// salary query functions
obj = processSalaryResults(await PostgreSQL.executeQuery(getSalaryById, 1));
obj = processSalaryResults(await PostgreSQL.executeQuery(getSalariesByAuthor, 3, 0, 1000));
obj = processSalaryResults(await PostgreSQL.executeQuery(getSalariesForCompany, 'a', 0, 1000));
obj = processSalaryResults(await PostgreSQL.executeQuery(getAllSalaries, 0, 1000));

// jobad query functions
obj = processJobAdResults(await PostgreSQL.executeQuery(getJobAdById, 1));
obj = processJobAdResults(await PostgreSQL.executeQuery(getJobAdsByCompany, "b"));
obj = processJobAdResults(await PostgreSQL.executeQuery(getAllJobAds, 0, 1000));

// comment query functions
obj = processCommentResults(await PostgreSQL.executeQuery(getCommentById, 1));
obj = processCommentResults(await PostgreSQL.executeQuery(getAllComments, 0, 1000));
obj = processCommentResults(await PostgreSQL.executeQuery(getCommentsByAuthor, 2, 0, 1000));

// vote query functions
obj = await PostgreSQL.executeQuery(getVoteByPrimaryKey, {submittedBy: 7, references: 1, voteSubject: "review"});
obj = await PostgreSQL.executeQuery(getVoteByPrimaryKey, {submittedBy: 7, references: 1, voteSubject: "comment"});
obj = await PostgreSQL.executeQuery(getAllVotes, 0, 1000);
obj = await PostgreSQL.executeQuery(getVotesByAuthor, 6, 0, 1000);
obj = await PostgreSQL.executeQuery(getVotesForSubject, "comment", 1, 0, 1000);
obj = await PostgreSQL.executeQuery(getVotesForSubject, "review", 1, 0, 1000);

// insertion functions
// NOTE that the review, salary, and comment insertions
// will all fail unless/until you go and add submittedBy
// fields and corresponding users.
obj = processCompanyResults(await PostgreSQL.executeMutation(createCompany, vize));
obj = processReviewResults(await PostgreSQL.executeMutation(submitReview, vizeReview));
obj = processSalaryResults(await PostgreSQL.executeMutation(submitSalary, vizeSalary));
obj = processJobAdResults(await PostgreSQL.executeMutation(postJobAd, vizeJobAd));
obj = processCommentResults(await PostgreSQL.executeMutation(writeComment, vizeComment));
obj = await PostgreSQL.executeMutation(castVote, vizeVote);
obj = await PostgreSQL.executeMutation(castVote, vizeVote2);
obj = await PostgreSQL.executeMutation(castVote, vizeVote3);
obj = await PostgreSQL.executeMutation(castVote, vizeVote4);

/*
	NOTE
	This next bit is the scratchpad I use for
	things related to manual database maintenance,
	many tasks of which are easiest to accomplish
	by utilizing the tools and functions implemented
	in the earlier portions of this file.
*/

/*
	NOTE
	This first section is for taking the "original"
	reviews and company profiles, parsing them,
	translating them to the latests schema version
	if necessary, and inserting them to whatever
	database instance we connected to earlier
	in the file.
	Pathnames are hard-coded based on my personal
	Arch Linux installation. You will probably need
	to change them if you want to use them yourself.
	Otherwise, when I think of a better way to do things,
	I will update this code.
	The current way has worked well because of how
	the project structure has kept changing. However,
	if we were to designate a directory where this data
	could be kept and committed it to source control,
	we could update the pathnames and make them relative,
	which would enable anyone to use this bit of code.
*/

let writeInitialCompaniesToDb;
let writeInitialReviewsToDb;

writeInitialCompaniesToDb = async function() {
	const companies = JSON.parse(fs.readFileSync('/home/jhigginbotham64/Desktop/Downloads/vize-production/CompanyProfiles.json','utf8'));
	return Promise.all(companies.map(async function(company) {
		return PostgreSQL.executeMutation(createCompany, company);
	}));
}

writeInitialReviewsToDb = async function() {
	const reviews = JSON.parse(fs.readFileSync('/home/jhigginbotham64/Desktop/Downloads/vize-production/Reviews.json','utf8'));
	return Promise.all(reviews.map(async function(review) {
		if(Number.isNaN(Number(review.companyId))) review.companyId = undefined;
		if(Number.isNaN(Number(review.submittedBy))) review.submittedBy = undefined; // this may need to be -1, I still have to check
		if(Array.isArray(review.locations)) {
			const locations = review.locations;
			review.locations = undefined;
			review.location = locations.join(', ');
		}
		return PostgreSQL.executeMutation(submitReview, review);
	}));
}

/*
	NOTE
	The next two sections are for working with Krit's data set,
	which contains the info for 400+ company profiles. There
	are a few helper functions for helping me analyze and
	translate the JSON file, and then functions for actually
	sending the profiles to the database.
	There ended up being several issues with the data,
	some of which are resolved by code in the following section
	section, and some of which are still unresolved
	but can be analyzed and demonstrated using the code
	in the section after.
	The first problems were "invalid" emails and URL's.
	This was fixed by processing the companies in a way
	that set those fields to undefined if they were invalid.
	Next up were invalid employee counts, which I could
	only partially fix by saying "If it's not one of the
	allowed values but it's still a plain number, translate
	to the range it falls in," which fixes many cases
	but not ones in which an invalid range is given.
	Then of course there was the fact that Krit's companies
	didn't have a location field but rather an address and
	an industrial park, which was pretty simple to fix.
*/

let numEmployeesIsValid;
let translateNumEmployees;
let writeOneKritCompanyToDb;
let writeKritsCompaniesToDb;

numEmployeesIsValid = function(numEmployees) {
	return (
		numEmployees === '1 - 50' || numEmployees === '51 - 500' || numEmployees === '501 - 2000' || numEmployees === '2001 - 5000' || numEmployees === '5000+'
	)
}

// can fix simple stuff, but not more complex stuff
// like invalid ranges or things with weird formats
translateNumEmployees = function(numEmployees) {
	if(numEmployeesIsValid(numEmployees)) {
		return numEmployees;
	}
	let num = Number(numEmployees);
	if(!Number.isNaN(num)) {
		if(num <= 0)
			return undefined;
		if(num >= 1 && num <= 50)
			return '1 - 50';
		else if(num >= 51 && num <= 500)
			return '51 - 500';
		else if(num >= 501 && num <= 2000)
			return '501 - 2000';
		else if(num >= 2001 && num <= 5000)
			return '2001 - 5000';
		else
			return '5000+';
	}

	return undefined;
}

writeOneKritCompanyToDb = async function(kritCompany) {
	const emailWithTldRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const urlRegex=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
	let obj = {};
	obj.name = kritCompany.name;
	obj.descriptionOfCompany = kritCompany.description;
	obj.contactEmail = (emailWithTldRegex.test(kritCompany.email)) ? kritCompany.email : "unknown@unknown.com";
	obj.numEmployees = translateNumEmployees(kritCompany.company_size);
	obj.websiteURL = (urlRegex.test(kritCompany.url)) ? kritCompany.url : undefined;
	obj.industry = kritCompany.industry;
	obj.locations = [
		JSON.stringify({
			address: kritCompany.address,
			industrialHub: kritCompany.industrial_hub
		})
	];
	const res = PostgreSQL.executeMutation(createCompany, obj);
	return res;
}

writeKritsCompaniesToDb = async function() {
	const kritCompanies = Object.values(JSON.parse(fs.readFileSync('/home/jhigginbotham64/Downloads/data.json','utf8')));
	return Promise.all(kritCompanies.map(async function(company) {
		return writeOneKritCompanyToDb(company);
	}));
}

/*
	NOTE
	This next bit where I did a bunch of scratchpadding
	in the REPL trying to figure out why some of Krit's
	companies weren't playing nice with the database.

*/

let arraysAreEqual;
let findDuplicatesInArray;
let originalCompanies;
let newCompanies;
let originalCompanyNames;
let newCompanyNames;
let originalNamesDuplicatedInNew;
let newNamesDuplicatedInSelf;
let allDuplicatesInNewAndOld;
let allDuplicateNames;
let tempDupHolderObj;
let allDuplicatedNames;
let getDuplicatesForName;
let sortedDuplicates;
let areThereAnyActualDuplicates;
let theActualDuplicatesIfAny;

// https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
arraysAreEqual = function(array1, array2) {
	return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
}

// https://stackoverflow.com/questions/840781/get-all-non-unique-values-i-e-duplicate-more-than-one-occurrence-in-an-array#840808
findDuplicatesInArray = function(array) {
	let sorted_arr = array.slice().sort();
	let results = [];
	for (let i = 0; i < sorted_arr.length - 1; i++) {
		if (sorted_arr[i + 1] == sorted_arr[i]) {
			results.push(sorted_arr[i]);
		}
	}
	return results;
}

originalCompanies = JSON.parse(fs.readFileSync('/home/jhigginbotham64/Desktop/Downloads/vize-production/CompanyProfiles.json','utf8'));
newCompanies = Object.values(JSON.parse(fs.readFileSync('/home/jhigginbotham64/Downloads/data.json','utf8')));
originalCompanyNames = originalCompanies.map(c => c.name);
newCompanyNames = newCompanies.map(c => c.name);
originalNamesDuplicatedInNew = originalCompanyNames.filter(n => newCompanyNames.includes(n));
newNamesDuplicatedInSelf = findDuplicatesInArray(newCompanyNames);
allDuplicatesInNewAndOld = newCompanies.filter(c => newNamesDuplicatedInSelf.includes(c.name) || originalNamesDuplicatedInNew.includes(c.name)).concat(originalCompanies.filter(c => originalNamesDuplicatedInNew.includes(c.name)));
allDuplicateNames = allDuplicatesInNewAndOld.map(c => c.name).slice().sort();
tempDupHolderobj = {};
// screw hashsets
allDuplicateNames.forEach(n => tempDupHolderobj[n] = n);
// NOTE allDuplicat[ed]Names !== allDuplicat[e]Names
allDuplicatedNames = Object.values(tempDupHolderobj);

getDuplicatesForName = function(companyName) {
	return allDuplicatesInNewAndOld.filter(c => c.name === companyName);
}

getDuplicateValuesForName = function(companyName) {
	return allDuplicatesInNewAndOld.filter(c => c.name === companyName).map(c => Object.values(c));
}

sortedDuplicates = allDuplicatedNames.map(n => getDuplicatesForName(n));
sortedDuplicateValues = allDuplicatedNames.map(n => getDuplicateValuesForName(n));
areThereAnyActualDuplicates = sortedDuplicateValues.map(arr => arraysAreEqual(arr[0],arr[1]));
theActualDuplicatesIfAny = sortedDuplicateValues.filter(arr => arraysAreEqual(arr[0],arr[1]));
