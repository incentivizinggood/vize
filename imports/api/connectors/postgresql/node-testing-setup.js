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
let obj;

getCompanyByName = async function(name) {
	const client = await pool.connect();
	await client.query("START TRANSACTION READ ONLY");
	//companyResults format is unknown
	const companyResults = await client.query(
		"SELECT * FROM companies WHERE name=$1",
		[name]
	);
	// ...therefore companyResults.companyid is undefined
	const locationResults = await client.query(
		"SELECT locationname FROM company_locations WHERE companyid=$1",
		[companyResults.rows[0].companyid]
	);
	// same issue
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

// requires that server/sql/tests/setup-playground has been run
obj = await getCompanyByName("a");
