import { JobAds } from "../data/jobads.js";

const JobAdModel = {
	// Get the job ad with a given id.
	getById(id) {
		return JobAds.findOne(id);
	},

	// Get all of the job ads.
	getAll(pageNumber = 0, pageSize = 100) {
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
