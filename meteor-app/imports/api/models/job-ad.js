// @flow
import type { ID, Location } from "./common.js";
import type { Company } from "./company.js";

import { getCompanyByName } from ".";

import { castToNumberIfDefined } from "./helpers/postgresql/misc.js";

import {
	execTransactionRO,
	execTransactionRW,
} from "../connectors/postgresql.js";
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

function processResultsToJobAd({ jobad, locations }): JobAd {
	return {
		_id: jobad.jobadid,
		companyName: jobad.companyname,
		companyId: castToNumberIfDefined(jobad.companyid),
		jobTitle: jobad.jobtitle,
		locations: locations.map(loc => JSON.parse(loc.joblocation)),
		pesosPerHour: jobad.pesosperhour,
		contractType: jobad.contracttype,
		jobDescription: jobad.jobdescription,
		responsibilities: jobad.responsibilities,
		qualifications: jobad.qualifications,
		datePosted: jobad.dateadded,
	};
}

function processResultsToJobAds({ jobads, locations }): JobAd[] {
	return jobads.map(jobad =>
		processResultsToJobAd({
			jobad,
			locations: locations[String(jobad.jobadid)],
		})
	);
}

// Get the job ad with a given id.
export async function getJobAdById(id: ID): Promise<JobAd> {
	if (Number.isNaN(Number(id))) throw Error("not a valid job ad id");

	const transaction = async client => {
		let jobAdResults = { rows: [] };
		let locationResults = { rows: [] };

		jobAdResults = await client.query(
			"SELECT * FROM jobads WHERE jobadid=$1",
			[Number(id)]
		);

		locationResults = await client.query(
			"SELECT * FROM job_locations WHERE jobadid=$1",
			[Number(id)]
		);

		return {
			jobad: jobAdResults.rows[0],
			locations: locationResults.rows,
		};
	};

	return execTransactionRO(transaction).then(processResultsToJobAd);
}

// Get all job ads posted by a given company.
export async function getJobAdsByCompany(
	company: Company,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<JobAd[]> {
	const transaction = async client => {
		let jobAdResults = { rows: [] };
		let locationResults = {};

		jobAdResults = await client.query(
			"SELECT * FROM jobads WHERE companyname=$1 OFFSET $2 LIMIT $3",
			[company.name, pageNumber * pageSize, pageSize]
		);

		for (let jobad of jobAdResults.rows) {
			let locations = await client.query(
				"SELECT * FROM job_locations WHERE jobadid=$1",
				[jobad.jobadid]
			);
			locationResults[jobad.jobadid] = locations.rows;
		}

		return {
			jobads: jobAdResults.rows,
			locations: locationResults,
		};
	};

	return execTransactionRO(transaction).then(processResultsToJobAds);
}
// Get the company that posted a given review.
export async function getCompanyOfJobAd(jobAd: JobAd): Promise<Company> {
	return getCompanyByName(jobAd.companyName);
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
		let locationResults = {};

		jobAdResults = await client.query(
			"SELECT * FROM jobads OFFSET $1 LIMIT $2",
			[pageNumber * pageSize, pageSize]
		);

		for (let jobad of jobAdResults.rows) {
			let locations = await client.query(
				"SELECT * FROM job_locations WHERE jobadid=$1",
				[jobad.jobadid]
			);
			locationResults[jobad.jobadid] = locations.rows;
		}

		return {
			jobads: jobAdResults.rows,
			locations: locationResults,
		};
	};

	return execTransactionRO(transaction).then(processResultsToJobAds);
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
