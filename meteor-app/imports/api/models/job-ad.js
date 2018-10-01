// @flow
import type { ID, Location, AllModels } from "./common.js";
import type CompanyModel, { Company } from "./company.js";

import PgJobAdFunctions from "./helpers/postgresql/jobads.js";
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

export default class JobAdModel {
	connector: Object;
	companyModel: CompanyModel;

	constructor(connector: Object) {
		this.connector = connector;
	}

	init({ companyModel }: AllModels) {
		this.companyModel = companyModel;
	}

	// Get the job ad with a given id.
	async getJobAdById(id: ID) {
		if (!Number.isNaN(Number(id)))
			return PgJobAdFunctions.processJobAdResults(
				await this.connector.executeQuery(
					PgJobAdFunctions.getJobAdById,
					Number(id)
				)
			);
		return undefined;
	}

	// Get all job ads posted by a given company.
	async getJobAdsByCompany(
		company: Company,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [JobAd] {
		return PgJobAdFunctions.processJobAdResults(
			await this.connector.executeQuery(
				PgJobAdFunctions.getJobAdsByCompany,
				company.name,
				pageNumber * pageSize,
				pageSize
			)
		);
	}
	// Get the company that posted a given review.
	async getCompanyOfJobAd(jobAd: JobAd): Company {
		return this.companyModel.getCompanyByName(jobAd.companyName);
	}

	// Count the number of job ads posted by a given company.
	countJobAdsByCompany(company: Company): number {
		return this.connector.executeQuery(
			PgJobAdFunctions.getJobAdCountForCompany,
			company.name
		);
		// const cursor = this.connector.find({ companyName: company.name });
		//
		// return cursor.count();
	}

	// Get all of the job ads.
	async getAllJobAds(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [JobAd] {
		return PgJobAdFunctions.processJobAdResults(
			await this.connector.executeQuery(
				PgJobAdFunctions.getAllJobAds,
				pageNumber * pageSize,
				pageSize
			)
		);
	}

	isJobAd(obj: any): boolean {
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

	isJobApplication(obj: any): boolean {
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

	async postJobAd(company: Company, jobAdParams: mixed): JobAd {
		throw new Error("Not implemented yet");
	}

	async editJobAd(id: ID, jobAdChanges: mixed): JobAd {
		throw new Error("Not implemented yet");
	}

	async deleteJobAd(id: ID): JobAd {
		throw new Error("Not implemented yet");
	}
}
