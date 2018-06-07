import { Meteor } from "meteor/meteor";

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

	getByCompany(company, pageNumber = 0, pageSize = defaultPageSize) {
		throw new Error("Not implemented yet");
	},
	getTheCompany(user) {
		throw new Error("Not implemented yet");
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
