// @flow
import type { ID, Location } from "./common.js";
import type CompanyModel, { Company } from "./company.js";
import type UserModel, { User } from "./user.js";

import PgSalaryFunctions from "./helpers/postgresql/salaries.js";
import type PostgreSQL from "../graphql/connectors/postgresql.js";
import { SalarySchema } from "../data/salaries.js";

const defaultPageSize = 100;

export type Salary = {
	_id: ID,
	submittedBy: ID,
	companyName: string,
	location: Location,
	companyId: ?ID,
	jobTitle: string,
	incomeType: string,
	incomeAmount: number,
	datePosted: ?Date,
};

const salaryModel = (dataModel, postgreSQL: PostgreSQL) => ({
	// Get the salary with a given id.
	async getSalaryById(id: ID): Promise<?Salary> {
		if (!Number.isNaN(Number(id))) {
			return PgSalaryFunctions.processSalaryResults(
				await postgreSQL.executeQuery(
					PgSalaryFunctions.getSalaryById,
					Number(id)
				)
			);
		}
		return undefined;
	},

	// Get all salaries submitted by a given user.
	async getSalariesByAuthor(
		user: User,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): Promise<[Salary]> {
		const authorPostgresId = await dataModel.getUserPostgresId(user._id);
		return PgSalaryFunctions.processSalaryResults(
			await postgreSQL.executeQuery(
				PgSalaryFunctions.getSalariesByAuthor,
				authorPostgresId,
				pageNumber * pageSize,
				pageSize
			)
		);
	},
	// Get the user who submitted a given salary.
	async getAuthorOfSalary(salary: Salary): Promise<User> {
		return dataModel.getUserById(String(salary.submittedBy));
	},

	// Get all salaries paid by a given company.
	async getSalariesByCompany(
		company: Company,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): Promise<[Salary]> {
		return PgSalaryFunctions.processSalaryResults(
			await postgreSQL.executeQuery(
				PgSalaryFunctions.getSalariesForCompany,
				company.name,
				pageNumber * pageSize,
				pageSize
			)
		);
	},
	// Get the company that paid a given salary.
	async getCompanyOfSalary(salary: Salary): Promise<Company> {
		return dataModel.getCompanyByName(salary.companyName);
	},

	// Count the number of salaries paid by a given company.
	countSalariesByCompany(company: Company): number {
		return postgreSQL.executeQuery(
			PgSalaryFunctions.getSalaryCountForCompany,
			company.name
		);
		// const cursor = postgreSQL.find({ companyName: company.name });
		//
		// return cursor.count();
	},

	// Get all of the salaries.
	async getAllSalaries(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): Promise<[Salary]> {
		return PgSalaryFunctions.processSalaryResults(
			await postgreSQL.executeQuery(
				PgSalaryFunctions.getAllSalaries,
				pageNumber * pageSize,
				pageSize
			)
		);
	},

	isSalary(obj: any): boolean {
		// SalarySchema
		// 	.newContext()
		// 	.validate(obj);
		const context = SalarySchema.newContext();
		context.validate(obj, {
			extendedCustomContext: {
				isNotASubmission: true,
			},
		});

		return context.isValid();
	},

	async submitSalary(
		user: User,
		company: Company,
		salaryParams: mixed
	): Salary {
		throw new Error("Not implemented yet");
	},

	async editSalary(id: ID, salaryChanges: mixed): Salary {
		throw new Error("Not implemented yet");
	},

	async deleteSalary(id: ID): Salary {
		throw new Error("Not implemented yet");
	},
});

export default salaryModel;
