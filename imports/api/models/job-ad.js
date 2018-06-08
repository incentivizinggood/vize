const defaultPageSize = 100;

export default class JobAdModel {
	constructor(connector) {
		this.connector = connector;
	}

	init({ companyModel }) {
		this.companyModel = companyModel;
	}

	// Get the job ad with a given id.
	getById(id) {
		return this.connector.findOne(id);
	}

	// Get all job ads posted by a given company.
	getByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
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
	getTheCompany(jobAd) {
		return this.companyModel.getByName(jobAd.companyName);
	}

	// Get all of the job ads.
	getAll(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = this.connector.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	}
}
