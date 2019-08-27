import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";
import { withMongoDB } from "imports/api/connectors/mongodb";

import { UserId, Company, User, getCompanyById } from "imports/api/models";

// Get the user with a given id.
export async function getUserById(id: UserId): Promise<User | null> {
	const userMongoId = await getUserMongoId(id);
	return withMongoDB(db =>
		db.collection<User>("users").findOne({ _id: userMongoId })
	);
}

// Get the user with a given username.
export async function getUserByUsername(
	username: string
): Promise<User | null> {
	return withMongoDB(db =>
		db.collection<User>("users").findOne({ username })
	);
}

// Get all users administering a given company.
export async function getUsersByCompany(
	company: Company,
	pageNumber: number,
	pageSize: number
): Promise<User[]> {
	return withMongoDB(db => {
		const cursor = db
			.collection<User>("users")
			.find({ companyId: company.companyId });

		return cursor.toArray();
	});
}

// Get the company administered by a given user.
export async function getCompanyOfUser(user: User): Promise<Company | null> {
	if (user.companyId) {
		return getCompanyById(user.companyId);
	}
	return null;
}

// Get the integer ID of a user's PostgreSQL entry
export async function getUserPostgresId(id: UserId): Promise<number> {
	if (typeof id === "number") {
		// The given id is a number.
		// Assume it is already a PostgreSQL id.
		return id;
	}

	return simpleQuery1<{ userid: number }>(
		sql`SELECT userid FROM users WHERE usermongoid=${id}`
	).then(x => {
		if (x === null) throw new Error("Could not find user with id.");
		return x.userid;
	});
}

// Get the string ID of a user's MongoDB document
export async function getUserMongoId(id: UserId): Promise<string> {
	if (typeof id === "string") {
		// The given id is a string.
		// Assume it is already a MongoDB id.
		return id;
	}

	return simpleQuery1<{ usermongoid: string }>(
		sql`SELECT usermongoid FROM users WHERE userid=${id}`
	).then(x => {
		if (x === null) throw new Error("Could not find user with id.");
		return x.usermongoid;
	});
}
