// @flow
import { Meteor } from "meteor/meteor";
import type { ID } from "./common.js";
import type { Company } from "./company.js";

import PgUserFunctions from "./helpers/postgresql/users.js";
import PostgreSQL from "../graphql/connectors/postgresql.js";

const defaultPageSize = 100;

export type User = {
	_id: ID,
	username: string,
	createdAt: Date,
	role: "worker" | "company-unverified" | "company",
	companyId: ?ID,
};

// Get the user with a given id.
export async function getUserById(id: ID): Promise<User> {
	// assumes that valid Mongo ID's
	// are not valid Numbers
	if (!Number.isNaN(Number(id))) {
		const pgUser = await PostgreSQL.executeQuery(
			PgUserFunctions.getUserById,
			Number(id)
		);
		id = pgUser.user.usermongoid;
	}
	return Meteor.users.findOne(id, {
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

// Get the integer ID of a user's PostgreSQL entry
export async function getUserPostgresId(id: ID): Promise<number> {
	const pgUserResults = await PostgreSQL.executeQuery(
		PgUserFunctions.getUserById,
		id
	);
	return pgUserResults.user.userid;
}

// Get all users administering a given company.
export function getUsersByCompany(
	company: Company,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): [User] {
	const cursor = Meteor.users.find(
		{ companyId: company._id },
		{
			skip: pageNumber * pageSize,
			limit: pageSize,
		}
	);

	return cursor.fetch();
}

// Get the company administered by a given user.
export function getCompanyOfUser(user: User): ?Promise<?Company> {
	if (user.companyId) {
		return PostgreSQL.getCompanyById(user.companyId);
	}
	return null;
}

// Get all of the users.
export function getAllUsers(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): [User] {
	const cursor = Meteor.users.find(
		{},
		{
			fields: Meteor.users.publicFields,
			skip: pageNumber * pageSize,
			limit: pageSize,
		}
	);
	// This result is paginated.
	// You could determine if this is not the last page with:
	// cursor.count(false) > (pageNumber + 1) * pageSize
	return cursor.fetch();
}

export function createUser(userParams: mixed): User {
	throw new Error("Not implemented yet");
}

export function editUser(id: ID, userChanges: mixed): User {
	throw new Error("Not implemented yet");
}

export function deleteUser(id: ID): User {
	throw new Error("Not implemented yet");
}
