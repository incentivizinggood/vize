import { JobAds } from "../data/jobads.js";
import CompanyModel from "./company.js";

const defaultPageSize = 100;

const JobAdModel = {
	// Get the job ad with a given id.
	getById(id) {
		return JobAds.findOne(id);
	},

	// Get all job ads posted by a given company.
	getByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = JobAds.find(
			{ companyName: company.name },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	},
	// Get the company that posted a given review.
	getTheCompany(jobAd) {
		return CompanyModel.getByName(jobAd.companyName);
	},

	// Get all of the job ads.
	getAll(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = JobAds.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	},
};

export default JobAdModel;
