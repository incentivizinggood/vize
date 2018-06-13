const defaultPageSize = 100;

export default class JobAdModel {
	constructor(connector) {
		this.connector = connector;
	}

	init({ companyModel }) {
		this.companyModel = companyModel;
	}

	// Get the job ad with a given id.
	getJobAdById(id) {
		return this.connector.findOne(id);
	}

	// Get all job ads posted by a given company.
	getJobAdsByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
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
	getCompanyOfJobAd(jobAd) {
		return this.companyModel.getCompanyByName(jobAd.companyName);
	}

	// Get all of the job ads.
	getAllJobAds(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = this.connector.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	}

	postJobAd(company, jobAdParams) {
		throw new Error("Not implemented yet");
	}

	editJobAd(id, jobAdChanges) {
		throw new Error("Not implemented yet");
	}

	deleteJobAd(id) {
		throw new Error("Not implemented yet");
	}
}
