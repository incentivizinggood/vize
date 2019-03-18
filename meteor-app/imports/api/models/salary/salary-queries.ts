import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import {
	SalaryId,
	Company,
	Salary,
	User,
	getUserById,
	getUserPostgresId,
	getCompanyByName,
	defaultPageSize,
} from "imports/api/models";

const attributes = [
	'salaryid AS "salaryId"',
	'submittedby AS "submittedBy"',
	'companyname AS "companyName"',
	'companyid AS "companyId"',
	'salarylocation AS "location"',
	'jobtitle AS "jobTitle"',
	'incometype AS "incomeType"',
	'incomeamount AS "incomeAmount"',
	'dateadded AS "dateAdded"',
];
const baseQuery = `SELECT ${attributes.join(", ")} FROM salaries`;

// Get the salary with a given id.
export async function getSalaryById(id: SalaryId): Promise<Salary | null> {
	if (Number.isNaN(Number(id))) return null;

	return simpleQuery1("SELECT * FROM salaries WHERE salaryid=$1", Number(id));
}

// Get all salaries submitted by a given user.
export async function getSalariesByAuthor(
	user: User,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Salary[]> {
	const authorPostgresId = await getUserPostgresId(user._id);

	return simpleQuery(
		`${baseQuery} WHERE submittedby=$1 OFFSET $2 LIMIT $3`,
		authorPostgresId,
		pageNumber * pageSize,
		pageSize
	);
}

// Get the user who submitted a given salary.
export async function getAuthorOfSalary(salary: Salary): Promise<User> {
	return getUserById(salary.submittedBy);
}

// Get all salaries paid by a given company.
export async function getSalariesByCompany(
	company: Company,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Salary[]> {
	return simpleQuery(
		`${baseQuery} WHERE companyname=$1 OFFSET $2 LIMIT $3`,
		company.name,
		pageNumber * pageSize,
		pageSize
	);
}

// Get the company that paid a given salary.
export async function getCompanyOfSalary(salary: Salary): Promise<Company> {
	const company: Company | null = await getCompanyByName(salary.companyName);

	if (company === null) {
		throw new Error("REFERENCE_ANOMALY");
	}

	return company;
}

// Count the number of salaries paid by a given company.
export async function countSalariesByCompany(
	company: Company
): Promise<number> {
	const count = await simpleQuery1<{ count: number }>(
		"SELECT count FROM salary_counts WHERE companyname=$1",
		company.name
	);
	return count ? count.count : 0;
}

// Get all of the salaries.
export async function getAllSalaries(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Salary[]> {
	return simpleQuery(
		`${baseQuery} OFFSET $1 LIMIT $2`,
		pageNumber * pageSize,
		pageSize
	);
}
