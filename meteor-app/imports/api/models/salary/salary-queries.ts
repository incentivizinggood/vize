import {
	execTransactionRO,
	Transaction,
} from "imports/api/connectors/postgresql";

import {
	SalaryId,
	Company,
	Salary,
	User,
	getUserById,
	getUserPostgresId,
	getCompanyByName,
} from "imports/api/models";

const defaultPageSize = 100;

// Get the salary with a given id.
export async function getSalaryById(id: SalaryId): Promise<Salary> {
	if (Number.isNaN(Number(id))) throw Error("not a valid salary id");

	const transaction: Transaction<Salary> = async client => {
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

	const transaction: Transaction<Salary[]> = async client => {
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
	return getUserById(salary.submittedby);
}

// Get all salaries paid by a given company.
export async function getSalariesByCompany(
	company: Company,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Salary[]> {
	const transaction: Transaction<Salary[]> = async client => {
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
	const transaction: Transaction<number> = async client => {
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
	const transaction: Transaction<Salary[]> = async client => {
		let salaryResults = { rows: [] };

		salaryResults = await client.query(
			"SELECT * FROM salaries OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
		);

		return salaryResults.rows;
	};

	return execTransactionRO(transaction);
}
