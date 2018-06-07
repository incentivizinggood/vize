import { Companies } from "../data/companies.js";

const defaultPageSize = 100;

const CompanyModel = {
	// Get the company with a given id.
	getById(id) {
		return Companies.findOne(id);
	},

	getByName(name) {
		throw new Error("Not implemented yet");
	},

	// Get all of the companies.
	getAll(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Companies.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	},
};

export default CompanyModel;
