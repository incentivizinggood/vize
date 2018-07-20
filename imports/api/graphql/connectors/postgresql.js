import { Meteor } from "meteor/meteor";
const { Pool } = require("pg");
const LivePg = require("pg-live-select");

/* ----------------------------
	SETUP
 ------------------------------ */

const PG_CONNECTION_STRING = `postgresql://${process.env.PGUSER}:${
	process.env.PGPASSWORD
}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
const PG_CHANNEL_NAME = "vize_app_pg_clients";

const pool = new Pool();
const liveDb = new LivePg(PG_CONNECTION_STRING, PG_CHANNEL_NAME);

const closeAndExit = function() {
	pool.end();
	liveDb.cleanup(process.exit);
};

process.on("SIGTERM", closeAndExit);
process.on("SIGINT", closeAndExit);

/* ----------------------------
	POSTGRESQL PUBLICATIONS

	Current Mongo publications, so we have an idea
	of what we're trying to replace:
	Companies:
	Meteor.publish("CompanyProfiles", function() {
		return Companies.find({});
	});
	Reviews:
	Meteor.publish("Reviews", function() {
		return Reviews.find({});
	});
	JobAds:
	Meteor.publish("JobAds", function() {
		return JobAds.find({});
	});
	Salaries:
	Meteor.publish("Salaries", function() {
		return Salaries.find({});
	});
	Comments:
	Meteor.publish("Comments", function() {
		return Comments.find({});
	});
	Votes:
	Meteor.publish("Votes", function() {
		return Votes.find({});
	});

	...so basically, the only publication that restricts
	its fields is the only publication that would still
	be using Mongo to do so: Meteor.Users

	However, votes and locations make this a bit more complicated.
	We can certainly subscribe to views, and we can certainly use
	the subscribe functions to process the results.

	...I guess we would also need a good idea of what kind
	of subscriptions we're trying to replace. Here are some
	data needs from around the block:
	- count of job posts by company
	- count of salaries posted for a company
	- individual companies (processed)
	- all reviews for a company (processed)
	- all job ads by a company (processed)
	- all salaries for a company (processed)
	- votes by a certain user on reviews for a certain company

 ------------------------------ */

/* ----------------------------
	ACCESS TO HELPER FUNCTIONS
 ------------------------------ */

// assumes that arguments to func are passed as additional
// arguments after the first two "wrapper args"
const wrapPgFunction = async function(func, readOnly) {
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

export default class PostgreSQL {
	static async executeQuery(query) {
		return wrapPgFunction(query, true, [...arguments].slice(1));
	}

	static async executeMutation(mutation) {
		return wrapPgFunction(mutation, false, [...arguments].slice(1));
	}
}
