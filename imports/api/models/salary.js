import { Salaries } from "../data/reviews.js";
import UserModel from "./user.js";
import CompanyModel from "./company.js";

const defaultPageSize = 100;

const SalaryModel = {
	// Get the salary with a given id.
	getById(id) {
		return Salaries.findOne(id);
	},

	// Get all salaries submitted by a given user.
	getByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Salaries.find(
			{ submittedBy: user._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	},
	// Get the user who submitted a given salary.
	getTheAuthor(salary) {
		return UserModel.getById(salary.submittedBy);
	},

	// Get all salaries paid by a given company.
	getByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Salaries.find(
			{ companyName: company.name },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	},
	// Get the company that paid a given salary.
	getTheCompany(salary) {
		return CompanyModel.getByName(salary.companyName);
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
