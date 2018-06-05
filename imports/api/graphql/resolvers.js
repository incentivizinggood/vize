import { Meteor } from "meteor/meteor";

/* eslint-disable no-unused-vars */
export const resolvers = {
	Query: {
		say(root, args, context) {
			return "Hello world.";
		},
		user(root, args, context) {
			return Meteor.users.findOne(args.id);
		},
		currentUser(root, args, context) {
			// The current user is added to the context
			// by the `meteor/apollo` package.
			return context.user;
		},
	},
	User: {
		id: ({ _id }) => _id,
		username: ({ username }) => username,
		role: ({ role }) => role.toUpperCase().replace("-", "_"),
	},
};
