// @flow

import type { PoolClient } from "pg";
import PostgreSQL from "../graphql/connectors/postgresql.js";

export function execTransactionRO<R>(
	transaction: PoolClient => Promise<R>
): Promise<R> {
	return PostgreSQL.executeQuery(transaction);
}

export function execTransactionRW<R>(
	transaction: PoolClient => Promise<R>
): Promise<R> {
	return PostgreSQL.executeMutation(transaction);
}
