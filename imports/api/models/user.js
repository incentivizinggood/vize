import { Meteor } from "meteor/meteor";

const User = {
	getById(id) {
		return Meteor.users.findOne(id, { fields: Meteor.users.publicFields });
	},
	getByUsername(username) {
		return Meteor.users.findOne(
			{ username },
			{ fields: Meteor.users.publicFields }
		);
	},
	getAll(pageNumber = 0, pageSize = 3) {
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

export default User;
