import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import { JobAdId, Company, JobAd, getCompanyByName } from "imports/api/models";

const defaultPageSize = 100;

// Get the job ad with a given id.
export async function getJobAdById(id: JobAdId): Promise<JobAd | null> {
	if (Number.isNaN(Number(id))) return null;

	return simpleQuery1("SELECT * FROM jobads WHERE jobadid=$1", Number(id));
}

// Get all job ads posted by a given company.
export async function getJobAdsByCompany(
	company: Company,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<JobAd[]> {
	return simpleQuery(
		"SELECT * FROM jobads WHERE companyname=$1 OFFSET $2 LIMIT $3",
		company.name,
		pageNumber * pageSize,
		pageSize
	);
}
// Get the company that posted a given review.
export async function getCompanyOfJobAd(jobAd: JobAd): Promise<Company> {
	return getCompanyByName(jobAd.companyname || "");
}

// Count the number of job ads posted by a given company.
export async function countJobAdsByCompany(company: Company): Promise<number> {
	const count = await simpleQuery1<{ count: number }>(
		"SELECT * FROM job_post_counts WHERE companyname=$1",
		company.name
	);
	return count ? count.count : 0;
}

// Get all of the job ads.
export async function getAllJobAds(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<JobAd[]> {
	return simpleQuery(
		"SELECT * FROM jobads OFFSET $1 LIMIT $2",
		pageNumber * pageSize,
		pageSize
	);
}
