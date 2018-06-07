import { Companies } from "../data/companies.js";

const CompanyModel = {
	// Get the company with a given id.
	getById(id) {
		return Companies.findOne(id);
	},

	// Get all of the companies.
	getAll(pageNumber = 0, pageSize = 100) {
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
