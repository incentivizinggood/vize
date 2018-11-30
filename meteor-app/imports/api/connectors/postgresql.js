// @flow
// TODO: Merge /imports/api/graphql/connectors/postgresql.js into this file.

// This file is the PostgreSQL connector. It handles connecting to the database
// and provides some database related utility functions.

import type { PoolClient } from "pg";
import PostgreSQL from "../graphql/connectors/postgresql.js";

// Transactions are functions that take a database connection and use it to run
// queries on the database. If any extra arguments are needed by the
// transaction, the transaction code should be curried so that these arguments
// and the connection can be passed separately. (Curry in the mathematical
// sence, not the food)
export type Transaction<R> = PoolClient => Promise<R>;

// Execute a read-only transaction on the database.
export function execTransactionRO<R>(transaction: Transaction<R>): Promise<R> {
	return PostgreSQL.executeQuery(transaction);
}

// Execute a transaction on the database with write permission. If the
// transaction does not need write permission, use execTransactionRO instead. It
// has better preformance and is safer than execTransactionRW.
export function execTransactionRW<R>(transaction: Transaction<R>): Promise<R> {
	return PostgreSQL.executeMutation(transaction);
}
