const { Pool } = require("pg");

const pool = new Pool();

const closeAndExit = function() {
	pool.end();
	process.exit();
};

// process.on("SIGTERM", closeAndExit());
// process.on("SIGINT", closeAndExit());

export default class PostgreSQL {
	static async executeQuery(query) {
		const client = await pool.connect();
		let result = {};
		try {
			await client.query("START TRANSACTION READ ONLY");

			// removes function name from start of args list
			result = await query.apply(
				null,
				[client].concat([...arguments].slice(1))
			);

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return result;
	}

	static async executeMutation(mutation) {
		const client = await pool.connect();
		let result = {};
		try {
			await client.query("START TRANSACTION");

			// removes function name from start of args list
			result = await mutation.apply(
				null,
				[client].concat([...arguments].slice(1))
			);

			await client.query("COMMIT");
		} catch (e) {
			console.log(e);
			await client.query("ROLLBACK");
		} finally {
			await client.release();
		}

		return result;
	}
}
