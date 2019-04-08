import { PoolClient } from "pg";

import { Meteor } from "meteor/meteor";

import {
	Transaction,
	execTransactionRO,
	execTransactionRW,
} from "./postgresql";

/** Legacy API for the postgres connector. */
export class PostgreSQL {
	private static foo = (
		execTransaction: <R>(transaction: Transaction<R>) => Promise<R>
	) => <R, A extends any[]>(
		transaction: (client: PoolClient, ...args: A) => Promise<R>,
		...args: A
	): Promise<R> => {
		try {
			return execTransaction(client => transaction(client, ...args));
		} catch (err) {
			throw new Meteor.Error(
				`SQLstate ${err.code}`,
				`${err.constraint}: ${err.detail}`
			);
		}
	};

	static executeQuery = PostgreSQL.foo(execTransactionRO);

	static executeMutation = PostgreSQL.foo(execTransactionRW);
}
