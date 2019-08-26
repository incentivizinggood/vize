import { Meteor } from "meteor/meteor";

import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";

import { UserId, Company, User, getCompanyById } from "imports/api/models";

// Get the user with a given id.
export async function getUserById(id: UserId): Promise<User> {
	return Meteor.users.findOne(getUserMongoId(id), {
		fields: Meteor.users.publicFields,
	});
}

// Get the user with a given username.
export function getUserByUsername(username: string): User {
	return Meteor.users.findOne(
		{ username },
		{ fields: Meteor.users.publicFields }
	);
}

// Get all users administering a given company.
export function getUsersByCompany(
	company: Company,
	pageNumber: number,
	pageSize: number
): User[] {
	const cursor = Meteor.users.find(
		{ companyId: company.companyId },
		{
			skip: pageNumber * pageSize,
			limit: pageSize,
		}
	);

	return cursor.fetch();
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
