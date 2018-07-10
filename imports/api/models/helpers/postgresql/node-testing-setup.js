// this is where I compile all the things
// while I test and figure them out in the REPL
// if this code looks bad or improper, don't worry:
// it's only ever meant to be run in the Node.js
// REPL via copy-paste

const { Pool } = require("pg");
let pool = new Pool();

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

		// removes function name  and readOnly flag
		// from start of args list
		result = await func.apply(
			null,
			[client].concat([...arguments].slice(2)[0])
		);

		await client.query("COMMIT");
	} catch (e) {
		console.log(e);
		await client.query("ROLLBACK");
	} finally {
		await client.release();
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

getCompanyByName = async function(client, name) {
	let companyResults = { rows: [] };
	let locationResults = { rows: [] };
	let statResults = { rows: [] };

	companyResults = await client.query(
		"SELECT * FROM companies WHERE name=$1",
		[name]
	);
	locationResults = await client.query(
		"SELECT * FROM company_locations WHERE companyid=$1",
		[companyResults.rows[0].companyid]
	);
	statResults = await client.query(
		"SELECT * FROM company_review_statistics WHERE name=$1",
		[name]
	);

	return {
		company: companyResults.rows[0],
		locations: locationResults.rows,
		reviewStats: statResults.rows[0],
	};
};

getCompanyById = async function(client, id) {
	let companyResults = { rows: [] };
	let locationResults = { rows: [] };
	let statResults = { rows: [] };

	companyResults = await client.query(
		"SELECT * FROM companies WHERE companyid=$1",
		[id]
	);
	locationResults = await client.query(
		"SELECT * FROM company_locations WHERE companyid=$1",
		[id]
	);
	statResults = await client.query(
		"SELECT * FROM company_review_statistics WHERE name=$1",
		[companyResults.rows[0].name]
	);

	return {
		company: companyResults.rows[0],
		locations: locationResults.rows,
		reviewStats: statResults.rows[0],
	};
};

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
};

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
};

createCompany = async function(client, company) {
	let newCompany = { rows: [] };
	let newLocations = { rows: [] };

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

	return {
		company: newCompany.rows[0],
		locations: newLocations.rows,
	};
};

let getReviewById;
let getReviewsByAuthor;
let getAllReviews;
let getReviewsForCompany;
let submitReview;

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
};

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
};

getAllReviews = async function(client, skip, limit) {

	let reviewResults = { rows: [] };
	let voteResults = {};

	reviewResults = await client.query(
		"SELECT * FROM reviews OFFSET $1 LIMIT $2",
		[skip,limit]
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
		votes: voteResults
	};
};

getReviewsForCompany = async function(client, name, skip, limit) {

	let reviewResults = { rows: [] };
	let voteResults = {};

	reviewResults = await client.query(
		"SELECT * FROM reviews WHERE companyname=$1 OFFSET $2 LIMIT $3",
		[name,skip,limit]
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
};

submitReview = async function(client, review) {
	// assumes review is formatted for SimplSchema conformity
	// ignores Comments and upvotes/downvotes, because this is
	// (supposed to be) a new review, which cannot have been
	// commented or voted on yet

	let newReview = { rows: [] };

	newReview = await client.query(
		"INSERT INTO reviews "+
		"(submittedBy,companyName,companyId,reviewLocation,"+
		"reviewTitle,jobTitle,numMonthsWorked,pros,cons,"+
		"wouldRecommend,healthAndSafety,managerRelationship,"+
		"workEnvironment,benefits,overallSatisfaction,additionalComments) "+
		"VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16) "+
		"RETURNING *",
		[review.submittedBy,review.companyName,review.companyId,
		review.location,review.reviewTitle,review.jobTitle,
		review.numberOfMonthsWorked,review.pros,review.cons,
		review.wouldRecommendToOtherJobSeekers,review.healthAndSafety,
		review.managerRelationship,review.workEnvironment,review.benefits,
		review.overallSatisfaction,review.additionalComments]
	);

	return {
		review: newReview.rows[0]
	};
};

let getSalaryById;
let getAllSalaries;
let getSalariesByAuthor;
let getSalariesForCompany;
let submitSalary;

getSalaryById = async function (client, id) {
	let salaryResults = { rows: [] };
	salaryResults = await client.query(
		"SELECT * FROM salaries WHERE salaryid=$1",
		[id]
	);
	return {
		salary: salaryResults.rows[0]
	};
}

getSalariesByAuthor = async function (client, id, skip, limit) {
	let salaryResults = { rows: [] };
	salaryResults = await client.query(
		"SELECT * FROM salaries WHERE submittedby=$1 OFFSET $2 LIMIT $3",
		[id,skip,limit]
	);
	return {
		salaries: salaryResults.rows
	};
}

getAllSalaries = async function (client, skip, limit) {
	let salaryResults = { rows: [] };
	salaryResults = await client.query(
		"SELECT * FROM salaries OFFSET $1 LIMIT $2",
		[skip,limit]
	);
	return {
		salaries: salaryResults.rows
	};
}

getSalariesForCompany = async function (client, name, skip, limit) {
	let salaryResults = { rows: [] };
	salaryResults = await client.query(
		"SELECT * FROM salaries WHERE companyname=$1 OFFSET $2 LIMIT $3",
		[name,skip,limit]
	);
	return {
		salaries: salaryResults.rows
	};
}

submitSalary = async function (client, salary) {
	// assumes salary is formatted for SimplSchema conformity
	let newSalary = { rows: [] };

	newSalary = await client.query(
		"INSERT INTO salaries " +
			"(submittedby,companyname,companyid,salarylocation,"+
			"jobtitle,incometype,incomeamount,gender) "+
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
			salary.gender
		]
	);

	return {
		salary: newSalary.rows[0]
	};
}

let getJobAdById;
let getAllJobAds;
let getJobAdsByCompany;
let postJobAd;

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
		jobAd: jobAdResults.rows[0],
		locations: locationResults.rows
	};
};

getAllJobAds = async function(client, skip, limit) {
	let jobAdResults = { rows: [] };
	let locationResults = {};
	jobAdResults = await client.query(
		"SELECT * FROM jobads OFFSET $1 LIMIT $2",
		[skip,limit]
	);
	for(let jobad of jobAdResults.rows) {
		let locations = await client.query(
			"SELECT * FROM job_locations WHERE jobadid=$1",
			[jobad.jobadid]
		);
		locationResults[jobad.jobadid] = locations.rows;
	}
	return {
		jobads: jobAdResults.rows,
		locations: locationResults
	};
};

getJobAdsByCompany = async function(client, companyName, skip, limit) {
	let jobAdResults = { rows: [] };
	let locationResults = {};
	jobAdResults = await client.query(
		"SELECT * FROM jobads WHERE companyname=$1 OFFSET $2 LIMIT $3",
		[companyName,skip,limit]
	);
	for(let jobad of jobAdResults.rows) {
		let locations = await client.query(
			"SELECT * FROM job_locations WHERE jobadid=$1",
			[jobad.jobadid]
		);
		locationResults[jobad.jobadid] = locations.rows;
	}
	return {
		jobads: jobAdResults.rows,
		locations: locationResults
	}
};

postJobAd = async function(client, jobad) {
	let newJobAd = { rows: [] };
	let newLocations = { rows: [] };

	newJobAd = await client.query(
		"INSERT INTO jobads " +
		"(companyname,companyid,jobtitle,pesosperhour,"+
		"contracttype,jobdescription,responsibilities,qualifications) "+
		"VALUES ($1,$2,$3,$4,$5,$6,$7,$8) " +
		"RETURNING *",
		[
			jobad.companyName,jobad.companyId,
			jobad.jobTitle,jobad.pesosPerHour,
			jobad.contractType,jobad.jobDescription,
			jobad.responsibilities,jobad.qualifications
		]
	);

	// this bit could probably be refactored out into a
	// function and used for both companies and jobads
	const id = newJobAd.rows[0].jobadid;
	let insertValues = [];
	let insertValueString = "";
	let index = 0;
	for(let location of jobad.locations) {
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
		locations: newLocations.rows
	};
};

let getCommentById;
let getAllComments;
let getCommentsByAuthor;
let writeComment;

getCommentById = async function(client, id) {
	let commentResults = { rows: [] };
	let voteResults = { rows: [] };

	commentResults = await client.query(
		"SELECT * FROM review_comments WHERE commentid=$1",
		[id]
	);

	voteResults = await client.query (
		"SELECT * FROM comment_vote_counts WHERE refersto=$1",
		[id]
	);

	return {
		comment: commentResults.rows[0],
		votes: voteResults.rows[0]
	};
}

getAllComments = async function(client, skip, limit) {
	let commentResults = { rows: [] };
	let voteResults = {};

	commentResults = await client.query(
		"SELECT * FROM review_comments OFFSET $1 LIMIT $2",
		[skip,limit]
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
		votes: voteResults
	};
}

getCommentsByAuthor = async function(client, id, skip, limit) {
	let commentResults = { rows: [] };
	let voteResults = {};

	commentResults = await client.query(
		"SELECT * FROM review_comments WHERE submittedby=$1 OFFSET $2 LIMIT $3",
		[id,skip,limit]
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
		votes: voteResults
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
		[comment.reviewId,comment.submittedBy,comment.content]
	);
	return {
		comment: newComment.rows[0]
	};
}

let getVoteByPrimaryKey;
let getAllVotes;
let getVotesForSubject;
let getVotesByAuthor;
let castVote;

getVoteByPrimaryKey = async function(client, voteKeyFields) {
	let voteResults = { rows: [] };
	if(voteKeyFields.voteSubject !== "review" && voteKeyFields.voteSubject !== "comment")
		throw new Error("Illegal subject: table does not exist");
	voteResults = await client.query(
		"SELECT * FROM " + voteKeyFields.voteSubject + "_votes WHERE submittedby=$1 AND refersto=$2",
		[voteKeyFields.submittedBy, voteKeyFields.references]
	);
	return {
		vote: voteResults.rows[0]
	};
}

getAllVotes = async function(client, skip, limit) {
	let reviewVoteResults = { rows: [] };
	let commentVoteResults = { rows: [] };
	reviewVoteResults = await client.query(
		"SELECT * FROM review_vote_counts OFFSET $1 LIMIT $2",
		[skip,limit]
	);
	commentVoteResults = await client.query(
		"SELECT * FROM comment_vote_counts OFFSET $1 LIMIT $2",
		[skip,limit]
	);
	return {
		reviewVotes: reviewVoteResults.rows,
		commentVotes: commentVoteResults.rows
	};
}

getVotesForSubject = async function(client, subject, refersto, skip, limit) {
	let voteResults = { rows: [] };
	if(subject !== "review" && subject !== "comment")
		throw new Error("Illegal subject: table does not exist");
	voteResults = await client.query(
		"SELECT * FROM " + subject + "_vote_counts WHERE " +
		"refersto=$1 OFFSET $2 LIMIT $3",
		[refersto,skip,limit]
	);
	return {
		votes: voteResults.rows[0]
	};
}

getVotesByAuthor = async function(client, id, skip, limit) {
	let reviewVoteResults = { rows: [] };
	let commentVoteResults = { rows: [] };
	reviewVoteResults = await client.query(
		"SELECT * FROM review_votes WHERE submittedby=$1 OFFSET $2 LIMIT $3",
		[id,skip,limit]
	);
	commentVoteResults = await client.query(
		"SELECT * FROM comment_votes WHERE submittedby=$1 OFFSET $2 LIMIT $3",
		[id,skip,limit]
	);
	return {
		reviewVotes: reviewVoteResults.rows,
		commentVotes: commentVoteResults.rows
	};
}

castVote = async function(client, vote) {
	let voteResults = { rows: [] };
	if(vote.voteSubject !== "review" && vote.voteSubject !== "comment")
		throw new Error("Illegal subject: table does not exist");
	const tblName = vote.voteSubject + "_votes";
	voteResults = await client.query(
		"INSERT INTO " + tblName + " (refersto,submittedby,value) " +
		"VALUES ($1,$2,$3) " +
		"ON CONFLICT (submittedby,refersto) DO UPDATE SET value=$3 " + // I love PostgreSQL
		"RETURNING *",
		[vote.references,vote.submittedBy,vote.value]
	);
	return {
		vote: voteResults.rows[0]
	};
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
	otherContactInfo: "None to speak of",
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
obj = await PostgreSQL.executeQuery(getCompanyByName, "a");
obj = await PostgreSQL.executeQuery(getCompanyById, 1);
obj = await PostgreSQL.executeQuery(companyNameRegexSearch, "a", 0, 1000);
obj = await PostgreSQL.executeQuery(getAllCompanies, 0, 1000);

// review query functions
obj = await PostgreSQL.executeQuery(getReviewById, 1);
obj = await PostgreSQL.executeQuery(getReviewsByAuthor, 1, 0, 1000);
obj = await PostgreSQL.executeQuery(getReviewsForCompany, 'a', 0, 1000);
obj = await PostgreSQL.executeQuery(getAllReviews, 0, 1000);

// salary query functions
obj = await PostgreSQL.executeQuery(getSalaryById, 1);
obj = await PostgreSQL.executeQuery(getSalariesByAuthor, 3, 0, 1000);
obj = await PostgreSQL.executeQuery(getSalariesForCompany, 'a', 0, 1000);
obj = await PostgreSQL.executeQuery(getAllSalaries, 0, 1000);

// jobad query functions
obj = await PostgreSQL.executeQuery(getJobAdById, 1);
obj = await PostgreSQL.executeQuery(getJobAdsByCompany, "b");
obj = await PostgreSQL.executeQuery(getAllJobAds, 0, 1000);

// comment query functions
obj = await PostgreSQL.executeQuery(getCommentById, 1);
obj = await PostgreSQL.executeQuery(getAllComments, 0, 1000);
obj = await PostgreSQL.executeQuery(getCommentsByAuthor, 2, 0, 1000);

// vote query functions
obj = await PostgreSQL.executeQuery(getVoteByPrimaryKey, {submittedBy: 7, references: 1, voteSubject: "review"});
obj = await PostgreSQL.executeQuery(getVoteByPrimaryKey, {submittedBy: 7, references: 1, voteSubject: "comment"});
obj = await PostgreSQL.executeQuery(getAllVotes, 0, 1000);
obj = await PostgreSQL.executeQuery(getVotesByAuthor, 6, 0, 1000);
obj = await PostgreSQL.executeQuery(getVotesForSubject, "comment", 1, 0, 1000);
obj = await PostgreSQL.executeQuery(getVotesForSubject, "review", 1, 0, 1000);

//insertion functions
obj = await PostgreSQL.executeMutation(createCompany, vize);
obj = await PostgreSQL.executeMutation(submitReview, vizeReview);
obj = await PostgreSQL.executeMutation(submitSalary, vizeSalary);
obj = await PostgreSQL.executeMutation(postJobAd, vizeJobAd);
obj = await PostgreSQL.executeMutation(writeComment, vizeComment);
obj = await PostgreSQL.executeMutation(castVote, vizeVote);
obj = await PostgreSQL.executeMutation(castVote, vizeVote2);
obj = await PostgreSQL.executeMutation(castVote, vizeVote3);
obj = await PostgreSQL.executeMutation(castVote, vizeVote4);
