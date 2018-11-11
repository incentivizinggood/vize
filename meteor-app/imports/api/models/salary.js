// @flow
import type { ID, Location } from "./common.js";
import type { Company } from "./company.js";
import type { User } from "./user.js";
import { getUserById, getUserPostgresId, getCompanyByName } from ".";
import { castToNumberIfDefined } from "./helpers/postgresql/misc.js";

import {
	execTransactionRO,
	execTransactionRW,
} from "../connectors/postgresql.js";
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

function processResultsToSalary({ salary }): Salary {
	return {
		_id: salary.salaryid,
		submittedBy: castToNumberIfDefined(salary.submittedby),
		companyName: salary.companyname,
		companyId: castToNumberIfDefined(salary.companyid),
		location: JSON.parse(salary.salarylocation),
		jobTitle: salary.jobtitle,
		incomeType: salary.incometype,
		incomeAmount: salary.incomeamount,
		gender: salary.gender,
		datePosted: salary.dateadded,
	};
}

function processResultsToSalaries({ salaries }): [Salary] {
	return salaries.map(salary => processResultsToSalary({ salary }));
}

// Get the salary with a given id.
export async function getSalaryById(id: ID): Promise<?Salary> {
	if (Number.isNaN(Number(id))) return undefined;

	const transaction = async client => {
		let salaryResults = { rows: [] };

		salaryResults = await client.query(
			"SELECT * FROM salaries WHERE salaryid=$1",
			[Number(id)]
		);

		return {
			salary: salaryResults.rows[0],
		};
	};

	return execTransactionRO(transaction).then(processResultsToSalary);
}

// Get all salaries submitted by a given user.
export async function getSalariesByAuthor(
	user: User,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[Salary]> {
	const authorPostgresId = await getUserPostgresId(user._id);

	const transaction = async client => {
		let salaryResults = { rows: [] };

		salaryResults = await client.query(
			"SELECT * FROM salaries WHERE submittedby=$1 OFFSET $2 LIMIT $3",
			[authorPostgresId, pageNumber * pageSize, pageSize]
		);

		return {
			salaries: salaryResults.rows,
		};
	};

	return execTransactionRO(transaction).then(processResultsToSalaries);
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
	const transaction = async client => {
		let salaryResults = { rows: [] };

		salaryResults = await client.query(
			"SELECT * FROM salaries WHERE companyname=$1 OFFSET $2 LIMIT $3",
			[company.name, pageNumber * pageSize, pageSize]
		);

		return {
			salaries: salaryResults.rows,
		};
	};

	return execTransactionRO(transaction).then(processResultsToSalaries);
}
// Get the company that paid a given salary.
export async function getCompanyOfSalary(salary: Salary): Promise<Company> {
	return getCompanyByName(salary.companyName);
}

// Count the number of salaries paid by a given company.
export function countSalariesByCompany(company: Company): Promise<?number> {
	const transaction = async client => {
		let countResults = { rows: [{ count: undefined }] };

		countResults = await client.query(
			"SELECT * FROM salary_counts WHERE companyname=$1",
			[company.name]
		);

		return countResults.rows[0] === undefined
			? undefined
			: Number(countResults.rows[0].count);
	};

	return execTransactionRO(transaction);
}

// Get all of the salaries.
export async function getAllSalaries(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[Salary]> {
	const transaction = async client => {
		let salaryResults = { rows: [] };

		salaryResults = await client.query(
			"SELECT * FROM salaries OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
		);

		return {
			salaries: salaryResults.rows,
		};
	};

	return execTransactionRO(transaction).then(processResultsToSalaries);
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
