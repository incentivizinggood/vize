// This file is the PostgreSQL connector. It handles connecting to the database
// and provides some database related utility functions.

import { Pool, PoolClient, QueryConfig } from "pg";
import { SqlStatement } from "imports/lib/sql-template";

const pool = new Pool();

/**
 * Preform a graceful shutdown.
 * @todo Move this code to a central location that handles the application lifycycle.
 */
function shutdown() {
	console.info(
		"Gracefuly shuting down connection pool.",
		new Date().toISOString()
	);
	pool.end(() => {
		console.log("Connection pool has ended.");
	});
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

// Transactions are functions that take a database connection and use it to run
// queries on the database. If any extra arguments are needed by the
// transaction, the transaction code should be curried so that these arguments
// and the connection can be passed separately. (Curry in the mathematical
// sence, not the food)
export type Transaction<R> = (query: PoolClient) => Promise<R>;

const execTransaction = (readOnly: boolean) => async <R>(
	transaction: Transaction<R>
): Promise<R> => {
	const client = await pool.connect();
	try {
		await client.query(
			readOnly ? "START TRANSACTION READ ONLY" : "START TRANSACTION"
		);

		const result = await transaction(client);

		await client.query("COMMIT");

		return result;
	} catch (err) {
		await client.query("ROLLBACK");
		throw err;
	} finally {
		await client.release();
	}
};

// Execute a read-only transaction on the database.
export const execTransactionRO = execTransaction(true);

// Execute a transaction on the database with write permission. If the
// transaction does not need write permission, use execTransactionRO instead. It
// has better preformance and is safer than execTransactionRW.
export const execTransactionRW = execTransaction(false);

export async function simpleQuery<R>(query: QueryConfig): Promise<R[]> {
	const { rows } = await pool.query(query);
	return rows;
}

export async function simpleQuery1<R>(query: QueryConfig): Promise<R | null> {
	const { rows } = await pool.query(query);
	if (rows.length === 0) return null;
	if (rows.length > 1)
		console.warn(
			"The query",
			query,
			"resulted in",
			rows.length,
			"records but we were only expexting one."
		);
	return rows[0];
}

// Test the connection to the database by querying the current time.
// Run this on server startup to catch errors sooner.
export function testConnection() {
	pool.query("SELECT NOW() as now")
		.then(res => {
			console.log("PostgreSQL connection test succeded.");
			console.log(
				`"SELECT NOW() as now" -> ${JSON.stringify(res.rows[0])}`
			);
		})
		.catch(e => {
			console.error("PostgreSQL connection test failed.");
			console.error(e.stack);
		});
}
