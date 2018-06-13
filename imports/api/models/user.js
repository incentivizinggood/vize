// @flow
import type { Mongo } from "meteor/mongo";
import type { ID, AllModels } from "./common.js";
import type CompanyModel, { Company } from "./company.js";

const defaultPageSize = 100;

export type User = {
	_id: ID,
	username: string,
	createdAt: Date,
	role: "worker" | "company-unverified" | "company",
	companyId: ?ID,
};

export default class UserModel {
	connector: Mongo.Collection;
	companyModel: CompanyModel;
	constructor(connector: Mongo.Collection) {
		this.connector = connector;
	}

	init({ companyModel }: AllModels) {
		this.companyModel = companyModel;
	}

	// Get the user with a given id.
	getUserById(id: ID): User {
		return this.connector.findOne(id, {
			fields: this.connector.publicFields,
		});
	}

	// Get the user with a given username.
	getUserByUsername(username: string): User {
		return this.connector.findOne(
			{ username },
			{ fields: this.connector.publicFields }
		);
	}

	// Get all users administering a given company.
	getUsersByCompany(
		company: Company,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [User] {
		const cursor = this.connector.find(
			{ companyId: company._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	}
	// Get the company administered by a given user.
	getCompanyOfUser(user: User): ?Company {
		if (user.companyId) {
			return this.companyModel.getCompanyById(user.companyId);
		}
		return null;
	}

	// Get all of the users.
	getAllUsers(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [User] {
		const cursor = this.connector.find(
			{},
			{
				fields: this.connector.publicFields,
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		// This result is paginated.
		// You could determine if this is not the last page with:
		// cursor.count(false) > (pageNumber + 1) * pageSize
		return cursor.fetch();
	}

	createUser(userParams): User {
		throw new Error("Not implemented yet");
	}

	editUser(id: ID, userChanges): User {
		throw new Error("Not implemented yet");
	}

	deleteUser(id: ID): User {
		throw new Error("Not implemented yet");
	}
}
