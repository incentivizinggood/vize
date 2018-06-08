const defaultPageSize = 100;

export default class UserModel {
	constructor(connector) {
		this.connector = connector;
	}

	init({ companyModel, userModel }) {
		this.userModel = userModel;
		this.companyModel = companyModel;
	}

	// Get the user with a given id.
	getById(id) {
		return this.connector.findOne(id, {
			fields: this.connector.publicFields,
		});
	}

	// Get the user with a given username.
	getByUsername(username) {
		return this.connector.findOne(
			{ username },
			{ fields: this.connector.publicFields }
		);
	}

	// Get all users administering a given company.
	getByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = this.connector.find(
			{ companyId: company._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	}
	// Get the company administered by a given user.
	getTheCompany(user) {
		return this.companyModel.getByName(user.companyName);
	}

	// Get all of the users.
	getAll(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = this.connector.find(
			{},
			{
				fields: this.connector.publicFields,
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		// This result is paginated.
		// You could determine if this is not the last page with:
		// cursor.count(false) > (pageNumber + 1) * pageSize
		return cursor.fetch();
	}
}
