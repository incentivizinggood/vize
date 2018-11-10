// @flow
import type { ID, Location } from "./common.js";
import type { Company } from "./company.js";
import type { User } from "./user.js";
import { getUserById, getUserPostgresId, getCompanyByName } from ".";

import PgSalaryFunctions from "./helpers/postgresql/salaries.js";
import PostgreSQL from "../graphql/connectors/postgresql.js";
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

// Get the salary with a given id.
export async function getSalaryById(id: ID): Promise<?Salary> {
	if (!Number.isNaN(Number(id))) {
		return PgSalaryFunctions.processSalaryResults(
			await PostgreSQL.executeQuery(
				PgSalaryFunctions.getSalaryById,
				Number(id)
			)
		);
	}
	return undefined;
}

// Get all salaries submitted by a given user.
export async function getSalariesByAuthor(
	user: User,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[Salary]> {
	const authorPostgresId = await getUserPostgresId(user._id);
	return PgSalaryFunctions.processSalaryResults(
		await PostgreSQL.executeQuery(
			PgSalaryFunctions.getSalariesByAuthor,
			authorPostgresId,
			pageNumber * pageSize,
			pageSize
		)
	);
}
// Get the user who submitted a given salary.
export async function getAuthorOfSalary(salary: Salary): Promise<User> {
	return getUserById(String(salary.submittedBy));
}

// Get all salaries paid by a given company.
export async function getSalariesByCompany(
	company: Company,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[Salary]> {
	return PgSalaryFunctions.processSalaryResults(
		await PostgreSQL.executeQuery(
			PgSalaryFunctions.getSalariesForCompany,
			company.name,
			pageNumber * pageSize,
			pageSize
		)
	);
}
// Get the company that paid a given salary.
export async function getCompanyOfSalary(salary: Salary): Promise<Company> {
	return getCompanyByName(salary.companyName);
}

// Count the number of salaries paid by a given company.
export function countSalariesByCompany(company: Company): number {
	return PostgreSQL.executeQuery(
		PgSalaryFunctions.getSalaryCountForCompany,
		company.name
	);
	// const cursor = PostgreSQL.find({ companyName: company.name });
	//
	// return cursor.count();
}

// Get all of the salaries.
export async function getAllSalaries(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[Salary]> {
	return PgSalaryFunctions.processSalaryResults(
		await PostgreSQL.executeQuery(
			PgSalaryFunctions.getAllSalaries,
			pageNumber * pageSize,
			pageSize
		)
	);
}

export function isSalary(obj: any): boolean {
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
}

export async function submitSalary(
	user: User,
	company: Company,
	salaryParams: mixed
): Salary {
	throw new Error("Not implemented yet");
}

export async function editSalary(id: ID, salaryChanges: mixed): Salary {
	throw new Error("Not implemented yet");
}

export async function deleteSalary(id: ID): Salary {
	throw new Error("Not implemented yet");
}
