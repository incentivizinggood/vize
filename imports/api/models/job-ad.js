import { JobAds } from "../data/jobads.js";

const defaultPageSize = 100;

const JobAdModel = {
	// Get the job ad with a given id.
	getById(id) {
		return JobAds.findOne(id);
	},

	getByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
		throw new Error("Not implemented yet");
	},
	getTheCompany(jobAd) {
		throw new Error("Not implemented yet");
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
