// @flow
import type { Mongo } from "meteor/mongo";
import type { ID, AllModels } from "./common.js";
import type CompanyModel, { Company } from "./company.js";
import type UserModel, { User } from "./user.js";

const defaultPageSize = 100;

export type Salary = {
	_id: ID,
	submittedBy: ID,
	companyName: string,
	companyId: ?ID,
	jobTitle: string,
	incomeType: string,
	incomeAmount: number,
	datePosted: ?Date,
};

export default class SalaryModel {
	connector: Mongo.Collection;
	companyModel: CompanyModel;
	userModel: UserModel;

	constructor(connector: Mongo.Collection) {
		this.connector = connector;
	}

	init({ userModel, companyModel }: AllModels) {
		this.userModel = userModel;
		this.companyModel = companyModel;
	}

	// Get the salary with a given id.
	getSalaryById(id: ID): Salary {
		return this.connector.findOne(id);
	}

	// Get all salaries submitted by a given user.
	getSalariesByAuthor(
		user: User,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Salary] {
		const cursor = this.connector.find(
			{ submittedBy: user._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	}
	// Get the user who submitted a given salary.
	getAuthorOfSalary(salary: Salary): User {
		return this.userModel.getUserById(salary.submittedBy);
	}

	// Get all salaries paid by a given company.
	getSalariesByCompany(
		company: Company,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Salary] {
		const cursor = this.connector.find(
			{ companyName: company.name },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	}
	// Get the company that paid a given salary.
	getCompanyOfSalary(salary: Salary): Company {
		return this.companyModel.getCompanyByName(salary.companyName);
	}

	// Get all of the salaries.
	getAllSalaries(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Salary] {
		const cursor = this.connector.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	}

	submitSalary(user: User, company: Company, salaryParams: mixed): Salary {
		throw new Error("Not implemented yet");
	}

	editSalary(id: ID, salaryChanges: mixed): Salary {
		throw new Error("Not implemented yet");
	}

	deleteSalary(id: ID): Salary {
		throw new Error("Not implemented yet");
	}
}
