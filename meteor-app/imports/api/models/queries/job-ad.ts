import sql from "imports/lib/sql-template";
import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import { Company, JobAd, getCompanyById } from "imports/api/models";
import { paginate } from "imports/api/models/misc";

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
export async function getJobAdById(id: number): Promise<JobAd | null> {
	return simpleQuery1(sql`${baseQuery} WHERE jobadid=${id}`);
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
		sql`SELECT count FROM job_post_counts WHERE companyname=${company.name}`
	);
	return count ? count.count : 0;
}

// return all job ads
// TODO: add search paramaters
export async function searchForJobAds(
	pageNumber: number,
	pageSize: number
): Promise<{ nodes: JobAd[]; totalCount: number }> {
	return paginate<JobAd>(
		sql`
			${baseQuery}
			ORDER BY jobadid DESC
		`,
		pageNumber,
		pageSize
	);
}
