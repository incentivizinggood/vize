// @flow
import type { ID, Location } from "./common.js";
import type { Company } from "./company.js";

import { getCompanyByName } from ".";

import PgJobAdFunctions from "./helpers/postgresql/jobads.js";
import PostgreSQL from "../graphql/connectors/postgresql.js";
import { JobAdSchema, JobApplicationSchema } from "../data/jobads.js";

const defaultPageSize = 100;

export type JobAd = {
	_id: ID,

	companyName: string,
	companyId: ?string,

	jobTitle: string,
	locations: [Location],
	pesosPerHour: string,
	contractType: string,
	jobDescription: string,
	responsibilities: string,
	qualifications: string,
	datePosted: ?Date,
};

// Get the job ad with a given id.
export async function getJobAdById(id: ID) {
	if (!Number.isNaN(Number(id)))
		return PgJobAdFunctions.processJobAdResults(
			await PostgreSQL.executeQuery(
				PgJobAdFunctions.getJobAdById,
				Number(id)
			)
		);
	return undefined;
}

// Get all job ads posted by a given company.
export async function getJobAdsByCompany(
	company: Company,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[JobAd]> {
	return PgJobAdFunctions.processJobAdResults(
		await PostgreSQL.executeQuery(
			PgJobAdFunctions.getJobAdsByCompany,
			company.name,
			pageNumber * pageSize,
			pageSize
		)
	);
}
// Get the company that posted a given review.
export async function getCompanyOfJobAd(jobAd: JobAd): Promise<Company> {
	return getCompanyByName(jobAd.companyName);
}

// Count the number of job ads posted by a given company.
export function countJobAdsByCompany(company: Company): number {
	return PostgreSQL.executeQuery(
		PgJobAdFunctions.getJobAdCountForCompany,
		company.name
	);
	// const cursor = PostgreSQL.find({ companyName: company.name });
	//
	// return cursor.count();
}

// Get all of the job ads.
export async function getAllJobAds(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[JobAd]> {
	return PgJobAdFunctions.processJobAdResults(
		await PostgreSQL.executeQuery(
			PgJobAdFunctions.getAllJobAds,
			pageNumber * pageSize,
			pageSize
		)
	);
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
