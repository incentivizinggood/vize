import { Salaries } from "../data/reviews.js";

const SalaryModel = {
	// Get the salary with a given id.
	getById(id) {
		return Salaries.findOne(id);
	},

	// Get all of the salaries.
	getAll(pageNumber = 0, pageSize = 100) {
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
