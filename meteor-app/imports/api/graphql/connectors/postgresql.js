import { Meteor } from "meteor/meteor";

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
		throw new Meteor.Error(
			`SQLstate ${result.code}`,
			`${result.constraint}: ${result.detail}`
		);
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
