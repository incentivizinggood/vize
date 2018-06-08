import { Meteor } from "meteor/meteor";
import CompanyModel from "./company.js";

const defaultPageSize = 100;

const UserModel = {
	// Get the user with a given id.
	getById(id) {
		return Meteor.users.findOne(id, { fields: Meteor.users.publicFields });
	},

	// Get the user with a given username.
	getByUsername(username) {
		return Meteor.users.findOne(
			{ username },
			{ fields: Meteor.users.publicFields }
		);
	},

	// Get all users administering a given company.
	getByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Meteor.users.find(
			{ companyId: company._id },
			{
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);

		return cursor.fetch();
	},
	// Get the company administered by a given user.
	getTheCompany(user) {
		return CompanyModel.getByName(user.companyName);
	},

	// Get all of the users.
	getAll(pageNumber = 0, pageSize = defaultPageSize) {
		const cursor = Meteor.users.find(
			{},
			{
				fields: Meteor.users.publicFields,
				skip: pageNumber * pageSize,
				limit: pageSize,
			}
		);
		// This result is paginated.
		// You could determine if this is not the last page with:
		// cursor.count(false) > (pageNumber + 1) * pageSize
		return cursor.fetch();
	},
};

export default UserModel;
