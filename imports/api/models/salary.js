const defaultPageSize = 100;

export default class SalaryModel {
	constructor(connector) {
		this.connector = connector;
	}

	init({ userModel, companyModel }) {
		this.userModel = userModel;
		this.companyModel = companyModel;
	}

	// Get the salary with a given id.
	getSalaryById(id) {
		return this.connector.findOne(id);
	}

	// Get all salaries submitted by a given user.
	getSalariesByAuthor(user, pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = this.connector.find(
			{ submittedBy: user._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	}
	// Get the user who submitted a given salary.
	getAuthorOfSalary(salary) {
		return this.userModel.getUserById(salary.submittedBy);
	}

	// Get all salaries paid by a given company.
	getSalariesByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = this.connector.find(
			{ companyName: company.name },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	}
	// Get the company that paid a given salary.
	getCompanyOfSalary(salary) {
		return this.companyModel.getCompanyByName(salary.companyName);
	}

	// Get all of the salaries.
	getAllSalaries(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = this.connector.find(
			{},
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		return cursor.fetch();
	}

	submitSalary(user, company, salaryParams) {
		throw new Error("Not implemented yet");
	}

	editSalary(id, salaryChanges) {
		throw new Error("Not implemented yet");
	}

	deleteSalary(id) {
		throw new Error("Not implemented yet");
	}
}
