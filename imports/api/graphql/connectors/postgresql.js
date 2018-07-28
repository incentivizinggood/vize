const { Pool } = require("pg");

/* ----------------------------
	SETUP
 ------------------------------ */

const pool = new Pool();

const closeAndExit = function() {
	pool.end(status => {
		console.log(`goodbye: ${status}`);
		process.exit(1);
	});
};

process.on("exit", closeAndExit);
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
	static cleanup() {
		closeAndExit();
	}

	static async executeQuery(query) {
		return wrapPgFunction(query, true, [...arguments].slice(1));
	}

	static async executeMutation(mutation) {
		return wrapPgFunction(mutation, false, [...arguments].slice(1));
	}
}
