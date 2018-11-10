// @flow
import type { Mongo } from "meteor/mongo";
import type { ID } from "./common.js";
import type CompanyModel, { Company } from "./company.js";

import PgUserFunctions from "./helpers/postgresql/users.js";
import type PostgreSQL from "../graphql/connectors/postgresql.js";

const defaultPageSize = 100;

export type User = {
	_id: ID,
	username: string,
	createdAt: Date,
	role: "worker" | "company-unverified" | "company",
	companyId: ?ID,
};

const userModel = (dataModel, postgreSQL: PostgreSQL, meteorUsers) => ({
	// Get the user with a given id.
	async getUserById(id: ID): Promise<User> {
		// assumes that valid Mongo ID's
		// are not valid Numbers
		if (!Number.isNaN(Number(id))) {
			const pgUser = await postgreSQL.executeQuery(
				PgUserFunctions.getUserById,
				Number(id)
			);
			id = pgUser.user.usermongoid;
		}
		return meteorUsers.findOne(id, {
			fields: meteorUsers.publicFields,
		});
	},

	// Get the user with a given username.
	getUserByUsername(username: string): User {
		return meteorUsers.findOne(
			{ username },
			{ fields: meteorUsers.publicFields }
		);
	},

	// Get the integer ID of a user's PostgreSQL entry
	async getUserPostgresId(id: ID): Promise<number> {
		const pgUserResults = await postgreSQL.executeQuery(
			PgUserFunctions.getUserById,
			id
		);
		return pgUserResults.user.userid;
	},

	// Get all users administering a given company.
	getUsersByCompany(
		company: Company,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [User] {
		const cursor = meteorUsers.find(
			{ companyId: company._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	},

	// Get the company administered by a given user.
	getCompanyOfUser(user: User): ?Promise<?Company> {
		if (user.companyId) {
			return postgreSQL.getCompanyById(user.companyId);
		}
		return null;
	},

	// Get all of the users.
	getAllUsers(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [User] {
		const cursor = meteorUsers.find(
			{},
			{
				fields: meteorUsers.publicFields,
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		// This result is paginated.
		// You could determine if this is not the last page with:
		// cursor.count(false) > (pageNumber + 1) * pageSize
		return cursor.fetch();
	},

	createUser(userParams: mixed): User {
		throw new Error("Not implemented yet");
	},

	editUser(id: ID, userChanges: mixed): User {
		throw new Error("Not implemented yet");
	},

	deleteUser(id: ID): User {
		throw new Error("Not implemented yet");
	},
});

export default userModel;
