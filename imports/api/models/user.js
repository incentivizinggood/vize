const defaultPageSize = 100;

export default class UserModel {
	constructor(connector) {
		this.connector = connector;
	}

	init({ companyModel }) {
		this.companyModel = companyModel;
	}

	// Get the user with a given id.
	getUserById(id) {
		return this.connector.findOne(id, {
			fields: this.connector.publicFields,
		});
	}

	// Get the user with a given username.
	getUserByUsername(username) {
		return this.connector.findOne(
			{ username },
			{ fields: this.connector.publicFields }
		);
	}

	// Get all users administering a given company.
	getUsersByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
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
	getCompanyOfUser(user) {
		return this.companyModel.getCompanyByName(user.companyName);
	}

	// Get all of the users.
	getAllUsers(pageNumber = 0, pageSize = defaultPageSize) {
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

	createUser(userParams) {
		throw new Error("Not implemented yet");
	}

	editUser(id, userChanges) {
		throw new Error("Not implemented yet");
	}

	deleteUser(id) {
		throw new Error("Not implemented yet");
	}
}
