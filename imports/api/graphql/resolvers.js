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

		allComments(root, args, context) {
			return Comments.find({}).fetch();
		},
		allCompanies(root, args, context) {
			return Companies.find({}).fetch();
		},
		allJobAds(root, args, context) {
			return JobAds.find({}).fetch();
		},
		allReviews(root, args, context) {
			return Reviews.find({}).fetch();
		},
		allSalaries(root, args, context) {
			return Salaries.find({}).fetch();
		},
		allUsers(root, args, context) {
			return Meteor.users.find({}).fetch();
		},
		allVotes(root, args, context) {
			return Votes.find({}).fetch();
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
			// Test for the existance of fields unique to each type.
			if (obj.content) {
				return "Comment";
			}

			if (obj.companyName) {
				return "Review";
			}

			// It should be imposible to get here.
			// TODO throw a more informative error message.
			return null;
		},
	},

	Comment: {
		id: ({ _id }) => _id,

		content: ({ content }) => content,
		created: ({ datePosted }) => datePosted,

		author: ({ username }) => Meteor.users.findOne({ username }),
		parent: () => null, // TODO
		children: () => null, // TODO
	},

	Company: {
		id: ({ _id }) => _id,

		reviews: ({ name }) => Reviews.find({ companyName: name }).fetch(),
		jobAds: ({ name }) => JobAds.find({ companyName: name }).fetch(),
	},

	JobAd: {
		id: ({ _id }) => _id,

		created: ({ datePosted }) => datePosted,

		company: ({ companyName }) => Companies.findOne({ name: companyName }),
	},

	Review: {
		id: ({ _id }) => _id,

		created: ({ datePosted }) => datePosted,

		author: ({ submittedBy }) => Meteor.users.findOne(submittedBy),
		company: ({ companyName }) => Companies.findOne({ name: companyName }),
		comments: () => [], // TODO
	},

	Salary: {
		id: ({ _id }) => _id,

		created: ({ datePosted }) => datePosted,

		author: ({ submittedBy }) => Meteor.users.findOne(submittedBy),
		company: ({ companyName }) => Companies.findOne({ name: companyName }),
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
			// Test for the existance of fields unique to each type.
			if (obj.content) {
				return "Comment";
			}

			if (obj.companyName) {
				return "Review";
			}

			// It should be imposible to get here.
			// TODO throw a more informative error message.
			return null;
		},
	},

	Vote: {
		id: ({ _id }) => _id,

		isUpvote: ({ value }) => value,

		author: ({ submittedBy }) => Meteor.users.findOne(submittedBy),
		subject({ voteSubject, references }) {
			if (voteSubject === "review") return Reviews.findOne(references);

			// It should be imposible to get here.
			// TODO throw a more informative error message.
			return null;
		},
	},

	Date: new GraphQLScalarType({
		name: "Date",
		description:
			"JavaScript Date serialized as milliseconds since midnight January 1, 1970 UTC.",
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
