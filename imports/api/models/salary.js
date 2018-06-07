import { Salaries } from "../data/reviews.js";

const defaultPageSize = 100;

const SalaryModel = {
	// Get the salary with a given id.
	getById(id) {
		return Salaries.findOne(id);
	},

	getByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
		throw new Error("Not implemented yet");
	},
	getTheAuthor(salary) {
		throw new Error("Not implemented yet");
	},

	getByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
		throw new Error("Not implemented yet");
	},
	getTheCompany(salary) {
		throw new Error("Not implemented yet");
	},

	// Get all of the salaries.
	getAll(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Salaries.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	},
};

export default SalaryModel;
