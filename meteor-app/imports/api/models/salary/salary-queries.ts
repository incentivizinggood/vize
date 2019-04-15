import sql from "imports/lib/sql-template";
import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import {
	SalaryId,
	Company,
	Salary,
	User,
	getUserById,
	getUserPostgresId,
	getCompanyByName,
} from "imports/api/models";

const attributes = sql.raw(
	[
		'salaryid AS "salaryId"',
		'submittedby AS "submittedBy"',
		'companyname AS "companyName"',
		'companyid AS "companyId"',
		'salarylocation AS "location"',
		'jobtitle AS "jobTitle"',
		'incometype AS "incomeType"',
		'incomeamount AS "incomeAmount"',
		'dateadded AS "dateAdded"',
	].join(", ")
);
const baseQuery = sql`SELECT ${attributes} FROM salaries`;

// Get the salary with a given id.
export async function getSalaryById(id: SalaryId): Promise<Salary | null> {
	if (Number.isNaN(Number(id))) return null;

	return simpleQuery1(
		sql`SELECT * FROM salaries WHERE salaryid=${Number(id)}`
	);
}

// Get all salaries submitted by a given user.
export async function getSalariesByAuthor(
	user: User,
	pageNumber: number,
	pageSize: number
): Promise<Salary[]> {
	const authorPostgresId = await getUserPostgresId(user._id);

	return simpleQuery(sql`
		${baseQuery}
		WHERE submittedby=${authorPostgresId}
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}

// Get the user who submitted a given salary.
export async function getAuthorOfSalary(salary: Salary): Promise<User> {
	return getUserById(salary.submittedBy);
}

// Get all salaries paid by a given company.
export async function getSalariesByCompany(
	company: Company,
	pageNumber: number,
	pageSize: number
): Promise<Salary[]> {
	return simpleQuery(sql`
		${baseQuery}
		WHERE companyname=${company.name}
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
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
		sql`SELECT count FROM salary_counts WHERE companyname=${company.name}`
	);
	return count ? count.count : 0;
}
