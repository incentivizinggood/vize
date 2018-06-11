const defaultPageSize = 100;

export default class CompanyModel {
	constructor(connector) {
		this.connector = connector;
	}

	init({}) {
		// This does not need any refrences to other models.
	}

	// Get the company with a given id.
	getById(id) {
		return this.connector.findOne(id);
	}

	// Get the company with a given name.
	getByName(name) {
		return this.connector.findOne({ name });
	}

	// Get all of the companies.
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

	createCompany(companyParams) {
		throw new Error("Not implemented yet");
	}

	editCompany(id, companyChanges) {
		throw new Error("Not implemented yet");
	}

	deleteCompany(id) {
		throw new Error("Not implemented yet");
	}
}
