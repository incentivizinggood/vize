import { Meteor } from "meteor/meteor";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

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

	CommentParent: {
		__resolveType(obj, context, info) {
			/* if (obj.wingspan) {
				return "Airplane";
			}

			if (obj.licensePlate) {
				return "Car";
			} */

			return null;
		},
	},

	Comment: {
		id: ({ _id }) => _id,

		content: () => null, // TODO
		created: () => null, // TODO

		author: () => null, // TODO
		parent: () => null, // TODO
		children: () => null, // TODO
	},

	Company: {
		id: ({ _id }) => _id,

		reviews: () => null, // TODO
		jobAds: () => null, // TODO
	},

	JobAd: {
		id: ({ _id }) => _id,

		created: () => null, // TODO

		company: () => null, // TODO
	},

	Review: {
		id: ({ _id }) => _id,

		created: () => null, // TODO

		author: () => null, // TODO
		company: () => null, // TODO
		comments: () => null, // TODO
	},

	Salary: {
		id: ({ _id }) => _id,

		created: () => null, // TODO

		author: () => null, // TODO
		company: () => null, // TODO
	},

	User: {
		id: ({ _id }) => _id,
		username: ({ username }) => username,

		role: ({ role }) => role.toUpperCase().replace("-", "_"),
		created: ({ createdAt }) => createdAt,

		company: ({ companyId }) =>
			companyId ? Companies.findOne(companyId) : null,
		reviews({ _id, role }) {
			if (role !== "worker") return null;
			return Reviews.find({ submittedBy: _id }).fetch();
		},
		comments: ({ username }) => Comments.find({ username }).fetch(),
		votes: ({ _id }) => Votes.find({ submittedBy: _id }),
	},

	VoteSubject: {
		__resolveType(obj, context, info) {
			/* if (obj.wingspan) {
				return "Airplane";
			}

			if (obj.licensePlate) {
				return "Car";
			} */

			return null;
		},
	},

	Vote: {
		id: ({ _id }) => _id,

		isUpvote: () => null, // TODO

		author: () => null, // TODO
		subject: () => null, // TODO
	},

	Date: new GraphQLScalarType({
		name: "Date",
		description: "Date custom scalar type",
		parseValue(value) {
			return new Date(value); // value from the client
		},
		serialize(value) {
			return value.getTime(); // value sent to the client
		},
		parseLiteral(ast) {
			if (ast.kind === Kind.INT) {
				return parseInt(ast.value, 10); // ast value is always in string format
			}
			return null;
		},
	}),
};
