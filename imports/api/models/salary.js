// @flow
import type { ID, AllModels } from "./common.js";
import type CompanyModel, { Company } from "./company.js";
import type UserModel, { User } from "./user.js";

import PgSalaryFunctions from "./helpers/postgresql/salaries.js";
import { Salaries } from "../data/salaries.js";

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
	connector: Object;
	companyModel: CompanyModel;
	userModel: UserModel;

	constructor(connector: Object) {
		this.connector = connector;
	}

	init({ userModel, companyModel }: AllModels) {
		this.userModel = userModel;
		this.companyModel = companyModel;
	}

	// Get the salary with a given id.
	async getSalaryById(id: ID): Salary {
		if (!Number.isNaN(Number(id))) {
			return PgSalaryFunctions.processSalaryResults(
				await this.connector.executeQuery(
					PgSalaryFunctions.getSalaryById,
					Number(id)
				)
			);
		}
		return undefined;
	}

	// Get all salaries submitted by a given user.
	async getSalariesByAuthor(
		user: User,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Salary] {
		const authorPostgresId = await this.userModel.getUserPostgresId(
			user._id
		);
		return PgSalaryFunctions.processSalaryResults(
			await this.connector.executeQuery(
				PgSalaryFunctions.getSalariesByAuthor,
				authorPostgresId,
				pageNumber * pageSize,
				pageSize
			)
		);
	}
	// Get the user who submitted a given salary.
	async getAuthorOfSalary(salary: Salary): User {
		return this.userModel.getUserById(String(salary.submittedBy));
	}

	// Get all salaries paid by a given company.
	async getSalariesByCompany(
		company: Company,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Salary] {
		return PgSalaryFunctions.processSalaryResults(
			await this.connector.executeQuery(
				PgSalaryFunctions.getSalariesForCompany,
				company.name,
				pageNumber * pageSize,
				pageSize
			)
		);
	}
	// Get the company that paid a given salary.
	async getCompanyOfSalary(salary: Salary): Company {
		return this.companyModel.getCompanyByName(salary.companyName);
	}

	// Count the number of salaries paid by a given company.
	countSalariesByCompany(company: Company): number {
		return this.connector.executeQuery(
			PgSalaryFunctions.getSalaryCountForCompany,
			company.name
		);
		// const cursor = this.connector.find({ companyName: company.name });
		//
		// return cursor.count();
	}

	// Get all of the salaries.
	async getAllSalaries(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [Salary] {
		return PgSalaryFunctions.processSalaryResults(
			await this.connector.executeQuery(
				PgSalaryFunctions.getAllSalaries,
				pageNumber * pageSize,
				pageSize
			)
		);
	}

	isSalary(obj: any): boolean {
		Salaries.simpleSchema()
			.newContext()
			.validate(obj);
		const context = Salaries.simpleSchema().newContext();
		context.validate(obj);
		return context.isValid();
	}

	async submitSalary(
		user: User,
		company: Company,
		salaryParams: mixed
	): Salary {
		throw new Error("Not implemented yet");
	}

	async editSalary(id: ID, salaryChanges: mixed): Salary {
		throw new Error("Not implemented yet");
	}

	async deleteSalary(id: ID): Salary {
		throw new Error("Not implemented yet");
	}
}
