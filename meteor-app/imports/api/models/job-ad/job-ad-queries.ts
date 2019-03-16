import {
	execTransactionRO,
	Transaction,
} from "imports/api/connectors/postgresql";

import { JobAdId, Company, JobAd, getCompanyByName } from "imports/api/models";

const defaultPageSize = 100;

// Get the job ad with a given id.
export async function getJobAdById(id: JobAdId): Promise<JobAd> {
	if (Number.isNaN(Number(id))) throw Error("not a valid job ad id");

	const transaction: Transaction<JobAd> = async client => {
		let jobAdResults = { rows: [] };

		jobAdResults = await client.query(
			"SELECT * FROM jobads WHERE jobadid=$1",
			[Number(id)]
		);

		return jobAdResults.rows[0];
	};

	return execTransactionRO(transaction);
}

// Get all job ads posted by a given company.
export async function getJobAdsByCompany(
	company: Company,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<JobAd[]> {
	const transaction: Transaction<JobAd[]> = async client => {
		let jobAdResults = { rows: [] };

		jobAdResults = await client.query(
			"SELECT * FROM jobads WHERE companyname=$1 OFFSET $2 LIMIT $3",
			[company.name, pageNumber * pageSize, pageSize]
		);

		return jobAdResults.rows;
	};

	return execTransactionRO(transaction);
}
// Get the company that posted a given review.
export async function getCompanyOfJobAd(jobAd: JobAd): Promise<Company> {
	return getCompanyByName(jobAd.companyname || "");
}

// Count the number of job ads posted by a given company.
export function countJobAdsByCompany(company: Company): Promise<number> {
	const transaction: Transaction<number> = async client => {
		let countResults = { rows: [{ count: undefined }] };

		countResults = await client.query(
			"SELECT * FROM job_post_counts WHERE companyname=$1",
			[company.name]
		);

		return countResults.rows[0] === undefined
			? 0
			: Number(countResults.rows[0].count);
	};

	return execTransactionRO(transaction);
}

// Get all of the job ads.
export async function getAllJobAds(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<JobAd[]> {
	const transaction: Transaction<JobAd[]> = async client => {
		let jobAdResults = { rows: [] };

		jobAdResults = await client.query(
			"SELECT * FROM jobads OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
		);

		return jobAdResults.rows;
	};

	return execTransactionRO(transaction);
}
