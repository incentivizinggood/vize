import sql from "src/utils/sql-template";
import { simpleQuery1, simpleQuery } from "src/connectors/postgresql";

import { Company, User, getCompanyById } from "src/models";

export const attributes = sql.raw(
	[
		'userid AS "userId"',
		"username",
		'email_address AS "emailAddress"',
		'password_hash AS "passwordHash"',
		'facebook_id AS "facebookId"',
		"role",
		'companyid AS "companyId"',
	].join(", ")
);
const baseQuery = sql`SELECT ${attributes} FROM users`;

// Get the user with a given id.
export async function getUserById(id: number): Promise<User | null> {
	return simpleQuery1<User>(sql`
		${baseQuery}
		WHERE userid=${id}
	`);
}

// Get the user with a given username.
export async function getUserByUsername(
	username: string
): Promise<User | null> {
	return simpleQuery1<User>(sql`
		${baseQuery}
		WHERE username=${username}
	`);
}

// Get all users administering a given company.
export async function getUsersByCompany(
	company: Company,
	pageNumber: number,
	pageSize: number
): Promise<User[]> {
	return simpleQuery<User>(sql`
		${baseQuery}
		WHERE companyid=${company.companyId}
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}

// Get the company administered by a given user.
export async function getCompanyOfUser(user: User): Promise<Company | null> {
	if (user.companyId) {
		return getCompanyById(user.companyId);
	}
	return null;
}
