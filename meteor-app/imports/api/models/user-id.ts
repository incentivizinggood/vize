import { execTransactionRO } from "imports/api/connectors/postgresql";

import { MongoId, PgId } from ".";

export type UserMId = MongoId;
export type UserPId = PgId;
export type UserId = UserMId | UserPId;

export function userIdToString(id: UserMId): string {
	return id;
}

export function stringToUserId(id: string): UserMId {
	return id;
}

// Get the integer ID of a user's PostgreSQL entry
export async function getUserPostgresId(id: UserId): Promise<UserPId> {
	if (typeof id === "number") {
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
	return pgUserResults.user.userid;
}

// Get the string ID of a user's MongoDB document
export async function getUserMongoId(id: UserId): Promise<UserMId> {
	if (typeof id === "string") {
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
