import { Meteor } from "meteor/meteor";

import { Comments } from "../data/comments.js";
import { Companies } from "../data/companies.js";
import { JobAds } from "../data/jobads.js";
import { Reviews } from "../data/reviews.js";
import { Salaries } from "../data/salaries.js";
import { Votes } from "../data/votes.js";

/* eslint-disable no-unused-vars */
export const resolvers = {
	Query: {
		say(root, args, context) {
			return "Hello world.";
		},
		currentUser(root, args, context) {
			// The current user is added to the context
			// by the `meteor/apollo` package.
			return context.user;
		},

		comment(root, args, context) {
			return Comments.findOne(args.id);
		},
		company(root, args, context) {
			return Companies.findOne(args.id);
		},
		jobAd(root, args, context) {
			return JobAds.findOne(args.id);
		},
		review(root, args, context) {
			return Reviews.findOne(args.id);
		},
		salary(root, args, context) {
			return Salaries.findOne(args.id);
		},
		user(root, args, context) {
			return Meteor.users.findOne(args.id);
		},
		vote(root, args, context) {
			return Votes.findOne(args.id);
		},
	},

	User: {
		id: ({ _id }) => _id,
		username: ({ username }) => username,
		role: ({ role }) => role.toUpperCase().replace("-", "_"),
	},
};
