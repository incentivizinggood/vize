import sql from "src/utils/sql-template";
import { simpleQuery, simpleQuery1 } from "src/connectors/postgresql";

import {
	Company,
	Salary,
	User,
	getUserById,
	getCompanyByName,
} from "src/models";

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
export async function getSalaryById(id: number): Promise<Salary | null> {
	return simpleQuery1(sql`${baseQuery} WHERE salaryid=${id}`);
}

// Get all salaries submitted by a given user.
export async function getSalariesByAuthor(
	user: User,
	pageNumber: number,
	pageSize: number
): Promise<Salary[]> {
	return simpleQuery(sql`
		${baseQuery}
		WHERE submittedby=${user.userId}
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}

// Get the user who submitted a given salary.
export async function getAuthorOfSalary(salary: Salary): Promise<User> {
	const user = await getUserById(salary.submittedBy);

	if (user === null) {
		throw new Error("REFERENCE_ANOMALY");
	}

	return user;
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
export async function getCompanyOfSalary(
	salary: Salary
): Promise<Company | null> {
	return getCompanyByName(salary.companyName);
}

// Count the number of salaries paid by a given company.
export async function countSalariesByCompany(
	company: Company
): Promise<number> {
	const count = await simpleQuery1<{ count: number }>(
		sql`SELECT COUNT(*) AS count FROM salaries WHERE companyname = ${company.name}`
	);
	return count ? count.count : 0;
}
