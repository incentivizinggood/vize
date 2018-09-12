/*
	NOTE
	This file contains a GraphQL "connector". The idea isn't to
	have a bunch of SQL queries, but just to provide a nice interface
	to the database itself, or rather to the database driver package node-pg.
	It handles transaction management and error reporting such that
	other pieces of code that need to use the database don't have to
	worry about those things, rather they can assume that those things
	are taken care of if they use the connector to wrap the database
	helper functions they want to execute (see imports/api/models/postgresql
	for files containing these "helper functions").
*/

import { Meteor } from "meteor/meteor";

/*
	NOTE
	We use node-pg's provided connection pooling features so that we
	don't have to worry about the details of connection management.
	All we have to worry about is making sure that clients acquired
	from the pool get returned to it, so that we don't leak clients.
*/
const { Pool } = require("pg");

/* ----------------------------
	SETUP
 ------------------------------ */

const pool = new Pool();

/*
	NOTE
	This seems like a good-practice cleanup step,
	however you may notice that attempts to use the
	pool immediately following a hot code push will
	fail because this listener gets called. I think
	this is because the process receives a SIGTERM
	when hot code pushes occur. If you refresh the page,
	the pool will get re-initialized and the error
	will go away. This seems like normal behavior.
	I have not noticed the bug on the GraphQL search
	pages, only on Autoform pages. I think this is because
	I chose to not reset the form on hot code pushes,
	which could prevent the refresh that re-initializes
	the pool.
	This bug was really getting me, I'm glad it makes more
	sense now.
	BUG
	It seems that, although a page refresh will cure
	the "already called end on pool" issue, we get an
	ENOMEM after enough hot code pushes because of
	too many callbacks being registered. I came to this
	conclusion because closeAndExit would execute more
	than once on process termination if there had been
	multiple hot code pushes. Dunno what to do about that,
	especially becuase...
	NOTE
	I have not been able to reproduce the bug, or anything
	resembling its "buildup" phase. Seems like we'll just
	have to pay close attention and go from there when we
	have better information.
*/
const closeAndExit = function(event) {
	pool.end(status => {
		console.log(`goodbye: ${event}, ${status}`);
	});
};

process.on("SIGTERM", closeAndExit);
process.on("SIGINT", closeAndExit);

/* ----------------------------
	ACCESS TO HELPER FUNCTIONS
 ------------------------------ */

 /*
 	NOTE
 	The basic logic of wrapPgFunction goes like this:
 	Get a client from the pool. Start a transation with
 	the client, read-only if needed. Execute the provided
 	query, and commit the transaction. Release the client
 	back to the pool. Return the results of the query.
 	If something goes wrong, roll back the transaction and
 	put the error where we can get back to it later, then
 	release the client back to the pool, then report the
 	error as a Meteor error rather than returning the
 	results of the query.
 	The cool part is that try-catch-finally can ensure
 	that results are returned and errors reported as necessary,
 	but that the client is always released back to the pool.
 */

// assumes that arguments to func are passed as additional
// arguments after the first two "wrapper args"
const wrapPgFunction = async function(func, readOnly) {
	const client = await pool.connect();
	let result = {};
	try {
		if (readOnly) await client.query("START TRANSACTION READ ONLY");
		else await client.query("START TRANSACTION");

		// removes function name and readOnly flag
		// from start of args list
		// as ugly as this code bit of code is, the only
		// thing you need to do to understand it is to
		// read the JavaScript documentation LOL
		result = await func.apply(
			null,
			// okay fine I'll tell you:
			// it means call "func" with an array of
			// arguments which is the second argument
			// to "apply". I construct this array by
			// concatenating an array containing only
			// client (which all the helper functions need)
			// with other the arguments that are supposed to
			// be passed in to func
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

	// Try to format SQL errors into nice
	// Meteor errors so they can be displayed
	// sensibly on the client.
	if (result instanceof Error) {
		throw new Meteor.Error(
			`SQLstate ${result.code}`,
			`${result.constraint}: ${result.detail}`
		);
	}

	return result;
};

/*
	NOTE
	Wrappers separated into Query and Mutation so
	that we can take advantage of the READ ONLY optimization.
	Arguments to the query and mutation functions are passed
	in as well, but JavaScript lets you get away with not including
	them in the function declaration.
*/

export default class PostgreSQL {
	static async executeQuery(query) {
		return wrapPgFunction(query, true, [...arguments].slice(1));
	}

	static async executeMutation(mutation) {
		return wrapPgFunction(mutation, false, [...arguments].slice(1));
	}
}
