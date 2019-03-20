import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import { JobAdId, Company, JobAd, getCompanyById } from "imports/api/models";

const attributes = [
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
];
const baseQuery = `SELECT ${attributes.join(", ")} FROM jobads`;

// Get the job ad with a given id.
export async function getJobAdById(id: JobAdId): Promise<JobAd | null> {
	if (Number.isNaN(Number(id))) return null;

	return simpleQuery1(`${baseQuery} WHERE jobadid=$1`, Number(id));
}

// Get all job ads posted by a given company.
export async function getJobAdsByCompany(
	company: Company,
	pageNumber: number,
	pageSize: number
): Promise<JobAd[]> {
	return simpleQuery(
		`${baseQuery} WHERE companyname=$1 OFFSET $2 LIMIT $3`,
		company.name,
		pageNumber * pageSize,
		pageSize
	);
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
		`${baseQuery} WHERE companyname=$1`,
		company.name
	);
	return count ? count.count : 0;
}

// Get all of the job ads.
export async function getAllJobAds(
	pageNumber: number,
	pageSize: number
): Promise<JobAd[]> {
	return simpleQuery(
		`${baseQuery} OFFSET $1 LIMIT $2`,
		pageNumber * pageSize,
		pageSize
	);
}
