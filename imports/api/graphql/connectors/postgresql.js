const { Pool } = require("pg");

const pool = new Pool();

const closeAndExit = function() {
	pool.end();
	process.exit();
};

// process.on("SIGTERM", closeAndExit());
// process.on("SIGINT", closeAndExit());

const wrapPgFunction = async function(func, readOnly) {
	const client = await pool.connect();
	let result = {};
	try {
		if (readOnly) await client.query("START TRANSACTION READ ONLY");
		else await client.query("START TRANSACTION");

		// removes function name  and readOnly flag
		// from start of args list
		result = await query.apply(
			null,
			[client].concat([...arguments].slice(2))
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
		return wrapPgFunction(query, true);
	}

	static async executeMutation(mutation) {
		return wrapPgFunction(mutation, false);
	}
}
