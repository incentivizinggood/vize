import sql from "imports/lib/sql-template";
import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import { JobAdId, Company, JobAd, getCompanyById } from "imports/api/models";

const attributes = sql.raw(
	[
		'jobadid AS "jobAdId"',
		'companyname AS "companyName"',
		'companyid AS "companyId"',
		'jobtitle AS "jobTitle"',
		'pesosperhour AS "pesosPerHour"',
		'contracttype AS "contractType"',
		'jobdescription AS "jobDescription"',
		"responsibilities",
		"qualifications",
		'dateadded AS "dateAdded"',
	].join(", ")
);
const baseQuery = sql`SELECT ${attributes} FROM jobads`;

// Get the job ad with a given id.
export async function getJobAdById(id: JobAdId): Promise<JobAd | null> {
	if (Number.isNaN(Number(id))) return null;

	return simpleQuery1(sql`${baseQuery} WHERE jobadid=${Number(id)}`);
}

// Get all job ads posted by a given company.
export async function getJobAdsByCompany(
	company: Company,
	pageNumber: number,
	pageSize: number
): Promise<JobAd[]> {
	return simpleQuery(sql`
		${baseQuery}
		WHERE companyname=${company.name}
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}
// Get the company that posted a given review.
export async function getCompanyOfJobAd(jobAd: JobAd): Promise<Company> {
	const company: Company | null = await getCompanyById(jobAd.companyId);

	if (company === null) {
		throw new Error("REFERENCE_ANOMALY");
	}

	return company;
}

// Count the number of job ads posted by a given company.
export async function countJobAdsByCompany(company: Company): Promise<number> {
	const count = await simpleQuery1<{ count: number }>(
		sql`${baseQuery} WHERE companyname=${company.name}`
	);
	return count ? count.count : 0;
}

// Get all of the job ads.
export async function getAllJobAds(
	pageNumber: number,
	pageSize: number
): Promise<JobAd[]> {
	return simpleQuery(
		sql`${baseQuery} OFFSET ${pageNumber * pageSize} LIMIT ${pageSize}`
	);
}
