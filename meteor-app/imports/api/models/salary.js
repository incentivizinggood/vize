// @flow
import {
	execTransactionRO,
	execTransactionRW,
} from "/imports/api/connectors/postgresql.js";
import { SalarySchema } from "/imports/api/data/salaries.js";

import { castToNumberIfDefined } from "/imports/api/models/helpers/postgresql/misc.js";
import type { ID, Location, Company, User } from "/imports/api/models";
import {
	getUserById,
	getUserPostgresId,
	getCompanyByName,
} from "/imports/api/models";

const defaultPageSize = 100;

export type Salary = {
	salaryid: number,
	submittedby: number,
	companyname: string,
	companyid: number | null,
	salarylocation: string,
	jobtitle: string,
	incometype: string,
	incomeamount: number,
	gender: null | "Male" | "Female",
	dateadded: Date,
};

// Get the salary with a given id.
export async function getSalaryById(id: ID): Promise<Salary> {
	if (Number.isNaN(Number(id))) throw Error("not a valid salary id");

	const transaction = async client => {
		let salaryResults = { rows: [] };

		salaryResults = await client.query(
			"SELECT * FROM salaries WHERE salaryid=$1",
			[Number(id)]
		);

		return salaryResults.rows[0];
	};

	return execTransactionRO(transaction);
}

// Get all salaries submitted by a given user.
export async function getSalariesByAuthor(
	user: User,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Salary[]> {
	const authorPostgresId = await getUserPostgresId(user._id);

	const transaction = async client => {
		let salaryResults = { rows: [] };

		salaryResults = await client.query(
			"SELECT * FROM salaries WHERE submittedby=$1 OFFSET $2 LIMIT $3",
			[authorPostgresId, pageNumber * pageSize, pageSize]
		);

		return salaryResults.rows;
	};

	return execTransactionRO(transaction);
}
// Get the user who submitted a given salary.
export async function getAuthorOfSalary(salary: Salary): Promise<User> {
	return getUserById(String(salary.submittedby));
}

// Get all salaries paid by a given company.
export async function getSalariesByCompany(
	company: Company,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Salary[]> {
	const transaction = async client => {
		let salaryResults = { rows: [] };

		salaryResults = await client.query(
			"SELECT * FROM salaries WHERE companyname=$1 OFFSET $2 LIMIT $3",
			[company.name, pageNumber * pageSize, pageSize]
		);

		return salaryResults.rows;
	};

	return execTransactionRO(transaction);
}
// Get the company that paid a given salary.
export async function getCompanyOfSalary(salary: Salary): Promise<Company> {
	return getCompanyByName(salary.companyname);
}

// Count the number of salaries paid by a given company.
export function countSalariesByCompany(company: Company): Promise<number> {
	const transaction = async client => {
		let countResults = { rows: [{ count: undefined }] };

		countResults = await client.query(
			"SELECT * FROM salary_counts WHERE companyname=$1",
			[company.name]
		);

		return countResults.rows[0] === undefined
			? 0
			: Number(countResults.rows[0].count);
	};

	return execTransactionRO(transaction);
}

// Get all of the salaries.
export async function getAllSalaries(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Salary[]> {
	const transaction = async client => {
		let salaryResults = { rows: [] };

		salaryResults = await client.query(
			"SELECT * FROM salaries OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
		);

		return salaryResults.rows;
	};

	return execTransactionRO(transaction);
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
