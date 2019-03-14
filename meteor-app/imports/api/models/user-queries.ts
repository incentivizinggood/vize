import { Meteor } from "meteor/meteor";

import { execTransactionRO } from "/imports/api/connectors/postgresql";

import { UserId, Company, User, getCompanyById, getUserMongoId } from ".";

const defaultPageSize = 100;

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
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): User[] {
	const cursor = Meteor.users.find(
		{ companyId: company.companyid },
		{
			skip: pageNumber * pageSize,
			limit: pageSize,
		}
	);

	return cursor.fetch();
}

// Get the company administered by a given user.
export function getCompanyOfUser(user: User): Promise<Company> | null {
	if (user.companyId) {
		return getCompanyById(user.companyId);
	}
	return null;
}

// Get all of the users.
export function getAllUsers(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): User[] {
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
