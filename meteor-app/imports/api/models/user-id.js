// @flow

import { execTransactionRO } from "/imports/api/connectors/postgresql.js";

import type { MongoId, PgId } from ".";

export opaque type UserMId = MongoId;
export opaque type UserPId = PgId;
export type UserId = UserMId | UserPId;

export function userIdToString(id: UserMId): string {
	return id;
}

export function stringToUserId(id: string): UserMId {
	return id;
}

// Get the integer ID of a user's PostgreSQL entry
export async function getUserPostgresId(id: UserId): Promise<UserPId> {
	if (typeof id === "number" || id instanceof Number) {
		// The given id is a number.
		// Assume it is already a PostgreSQL id.
		return id;
	}

	const transaction = async client => {
		let userResult = { rows: [] };

		userResult = await client.query(
			"SELECT * FROM users WHERE usermongoid=$1",
			[id]
		);

		return {
			user: userResult.rows[0],
		};
	};

	const pgUserResults = await execTransactionRO(transaction);
	// Gonna say for now that -1 is the "error code" for "no such user"
	return pgUserResults.user ? pgUserResults.userid : -1;
}

// Get the string ID of a user's MongoDB document
export async function getUserMongoId(id: UserId): Promise<UserMId> {
	if (typeof id === "string" || id instanceof String) {
		// The given id is a string.
		// Assume it is already a MongoDB id.
		return id;
	}

	const transaction = async client => {
		let userResult = { rows: [] };

		userResult = await client.query("SELECT * FROM users WHERE userid=$1", [
			Number(id),
		]);

		return {
			user: userResult.rows[0],
		};
	};

	const pgUserResults = await execTransactionRO(transaction);
	return pgUserResults.user.usermongoid;
}
