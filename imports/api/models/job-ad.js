// @flow
import type { Mongo } from "meteor/mongo";
import type { ID, AllModels } from "./common.js";
import type CompanyModel, { Company } from "./company.js";

const defaultPageSize = 100;

export type JobAd = {
	_id: ID,

	companyName: string,
	companyId: ?string,

	jobTitle: string,
	locations: [string],
	pesosPerHour: string,
	contractType: string,
	jobDescription: string,
	responsibilities: string,
	qualifications: string,
	datePosted: ?Date,
};

export default class JobAdModel {
	connector: Mongo.Collection;
	companyModel: CompanyModel;

	constructor(connector: Mongo.Collection) {
		this.connector = connector;
	}

	init({ companyModel }: AllModels) {
		this.companyModel = companyModel;
	}

	// Get the job ad with a given id.
	getJobAdById(id: ID) {
		return this.connector.findOne(id);
	}

	// Get all job ads posted by a given company.
	getJobAdsByCompany(
		company: Company,
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [JobAd] {
		const cursor = this.connector.find(
			{ companyName: company.name },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	}
	// Get the company that posted a given review.
	getCompanyOfJobAd(jobAd: JobAd): Company {
		return this.companyModel.getCompanyByName(jobAd.companyName);
	}

	// Count the number of job ads posted by a given company.
	countJobAdsByCompany(company: Company): number {
		const cursor = this.connector.find({ companyName: company.name });

		return cursor.count();
	}

	// Get all of the job ads.
	getAllJobAds(
		pageNumber: number = 0,
		pageSize: number = defaultPageSize
	): [JobAd] {
		const cursor = this.connector.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	}

	postJobAd(company: Company, jobAdParams: mixed): JobAd {
		throw new Error("Not implemented yet");
	}

	editJobAd(id: ID, jobAdChanges: mixed): JobAd {
		throw new Error("Not implemented yet");
	}

	deleteJobAd(id: ID): JobAd {
		throw new Error("Not implemented yet");
	}
}
