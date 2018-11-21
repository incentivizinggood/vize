// @flow
import {
	execTransactionRO,
	execTransactionRW,
} from "/imports/api/connectors/postgresql.js";
import { JobAdSchema, JobApplicationSchema } from "/imports/api/data/jobads.js";

import { castToNumberIfDefined } from "/imports/api/models/helpers/postgresql/misc.js";
import type { ID, Location, Company } from "/imports/api/models";
import { getCompanyByName } from "/imports/api/models";

const defaultPageSize = 100;

export type JobAd = {
	jobadid: number,

	companyname: string | null,
	companyid: string,

	jobtitle: string,
	pesosperhour: string,
	contracttype: string,
	jobdescription: string,
	responsibilities: string,
	qualifications: string,
	dateadded: Date,
};

// Get the job ad with a given id.
export async function getJobAdById(id: ID): Promise<JobAd> {
	if (Number.isNaN(Number(id))) throw Error("not a valid job ad id");

	const transaction = async client => {
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
	const transaction = async client => {
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
	const transaction = async client => {
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
	const transaction = async client => {
		let jobAdResults = { rows: [] };

		jobAdResults = await client.query(
			"SELECT * FROM jobads OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
		);

		return jobAdResults.rows;
	};

	return execTransactionRO(transaction);
}

export function isJobAd(obj: any): boolean {
	// JobAdSchema
	// 	.newContext()
	// 	.validate(obj);
	const context = JobAdSchema.newContext();
	context.validate(obj, {
		extendedCustomContext: {
			isNotASubmission: true,
		},
	});
	return context.isValid();
}

export function isJobApplication(obj: any): boolean {
	// there's a strong chance that this validation
	// code is broken, but I'm not sure how to go about
	// fixing it because I don't know how/where it will be used
	// return JobApplicationSchema
	// 	.newContext()
	// 	.validate(obj)
	// 	.isValid();

	// here's something that's more likely to work
	const context = JobApplicationSchema.newContext();
	context.validate(obj);
	return context.isValid();
}

export async function postJobAd(company: Company, jobAdParams: mixed): JobAd {
	throw new Error("Not implemented yet");
}

export async function editJobAd(id: ID, jobAdChanges: mixed): JobAd {
	throw new Error("Not implemented yet");
}

export async function deleteJobAd(id: ID): JobAd {
	throw new Error("Not implemented yet");
}
