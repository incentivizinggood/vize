// @flow
/* eslint-disable no-unused-vars */
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";
import type { ValueNode } from "graphql/language";
import { GraphQLDateTime } from "graphql-iso-date";

import type { Comment, CommentParent } from "../models/comment.js";
import type { Company } from "../models/company.js";
import type { JobAd } from "../models/job-ad.js";
import type { Review } from "../models/review.js";
import type { User } from "../models/user.js";
import type { Salary } from "../models/salary.js";
import type { Vote, VoteSubject } from "../models/vote.js";
import type { ID } from "../models/common.js";
import type { Resolvers } from "./graphqlgen.js";

import * as dataModel from "../models";

export type Context = {
	user: User,
};

// A helper function that produces simple resolvers.
function p(path: string): ({ [path: string]: any }, {}, Context) => any {
	return (obj: { [path: string]: any }, args: {}, context: Context): any =>
		obj[path];
}

const resolvers: Resolvers = {
	Query: {
		say(obj, args, context) {
			return "Hello world.";
		},
		currentUser(obj, args, context) {
			// The current user is added to the context
			// by the `meteor/apollo` package.
			return context.user;
		},

		allComments(obj, args, context) {
			return dataModel.getAllComments(args.pageNum, args.pageSize);
		},
		allCompanies(obj, args, context) {
			return dataModel.getAllCompanies(args.pageNum, args.pageSize);
		},
		allJobAds(obj, args, context) {
			return dataModel.getAllJobAds(args.pageNum, args.pageSize);
		},
		allReviews(obj, args, context) {
			return dataModel.getAllReviews(args.pageNum, args.pageSize);
		},
		allSalaries(obj, args, context) {
			return dataModel.getAllSalaries(args.pageNum, args.pageSize);
		},
		allUsers(obj, args, context): [User] {
			return dataModel.getAllUsers(args.pageNum, args.pageSize);
		},
		allVotes(obj, args, context) {
			return dataModel.getAllVotes(args.pageNum, args.pageSize);
		},

		comment(obj, args, context) {
			return dataModel.getCommentById(args.id);
		},
		company(obj, args, context) {
			return dataModel.getCompanyById(args.id);
		},
		jobAd(obj, args, context) {
			return dataModel.getJobAdById(args.id);
		},
		review(obj, args, context) {
			return dataModel.getReviewById(args.id);
		},
		salary(obj, args, context) {
			return dataModel.getSalaryById(args.id);
		},
		user(obj, args, context) {
			return dataModel.getUserById(args.id);
		},
		vote(obj, args, context) {
			return dataModel.getVoteById(args.id);
		},

		searchCompanies(obj, args, context) {
			return dataModel.searchForCompanies(
				args.searchText,
				args.pageNum,
				args.pageSize
			);
		},
	},

	CommentParent: {
		__resolveType(obj, context, info) {
			// Test for the existance of fields unique to each type.
			if (dataModel.isComment(obj)) {
				return "Comment";
			}

			if (dataModel.isReview(obj)) {
				return "Review";
			}

			// It should be imposible to get here.
			// TODO throw a more informative error message.
			return null;
		},
	},

	Comment: {
		id: p("_id"),

		created: p("datePosted"),

		author: (obj, args, context) => dataModel.getAuthorOfComment(obj),
		parent: (obj, args, context) => dataModel.getParentOfComment(obj),
		children: (obj, args, context) =>
			dataModel.getCommentsByParent(obj, args.pageNum, args.pageSize),
		votes: (obj, args, context) =>
			dataModel.getVotesBySubject(obj, args.pageNum, args.pageSize),
	},

	Company: {
		id: p("_id"),

		avgStarRatings: ({
			healthAndSafety,
			managerRelationship,
			workEnvironment,
			benefits,
			overallSatisfaction,
		}) => ({
			healthAndSafety,
			managerRelationship,
			workEnvironment,
			benefits,
			overallSatisfaction,
		}),

		reviews: (obj, args, context) =>
			dataModel.getReviewsByCompany(obj, args.pageNum, args.pageSize),
		jobAds: (obj, args, context) =>
			dataModel.getJobAdsByCompany(obj, args.pageNum, args.pageSize),
		numJobAds: (obj, args, context) => dataModel.countJobAdsByCompany(obj),
		salaries: (obj, args, context) =>
			dataModel.getSalariesByCompany(obj, args.pageNum, args.pageSize),
		numSalaries: (obj, args, context) =>
			dataModel.countSalariesByCompany(obj),
	},

	JobAd: {
		id: p("_id"),

		created: p("datePosted"),

		company: (obj, args, context) => dataModel.getCompanyOfJobAd(obj),
	},

	Review: {
		id: p("_id"),

		title: p("reviewTitle"),
		starRatings: ({
			healthAndSafety,
			managerRelationship,
			workEnvironment,
			benefits,
			overallSatisfaction,
		}) => ({
			healthAndSafety,
			managerRelationship,
			workEnvironment,
			benefits,
			overallSatisfaction,
		}),
		created: p("datePosted"),

		author: (obj, args, context) => dataModel.getAuthorOfReview(obj),
		company: (obj, args, context) => dataModel.getCompanyOfReview(obj),
		comments: (obj, args, context) =>
			dataModel.getCommentsByParent(obj, args.pageNum, args.pageSize),
		votes: (obj, args, context) =>
			dataModel.getVotesBySubject(obj, args.pageNum, args.pageSize),
		currentUserVote: (obj, args, context) =>
			context.user
				? dataModel.getVoteByAuthorAndSubject(context.user, obj)
				: null,
	},

	Salary: {
		id: p("_id"),

		created: p("datePosted"),

		author: (obj, args, context) => dataModel.getAuthorOfSalary(obj),
		company: (obj, args, context) => dataModel.getCompanyOfSalary(obj),
	},

	User: {
		id: p("_id"),

		role: ({ role }) => role.toUpperCase().replace("-", "_"),
		created: p("createdAt"),

		company: (obj, args, context) => dataModel.getCompanyOfUser(obj),
		reviews: (obj, args, context) =>
			dataModel.getReviewsByAuthor(obj, args.pageNum, args.pageSize),
		comments: (obj, args, context) =>
			dataModel.getCommentsByAuthor(obj, args.pageNum, args.pageSize),
		votes: (obj, args, context) =>
			dataModel.getVotesByAuthor(obj, args.pageNum, args.pageSize),
	},

	VoteSubject: {
		__resolveType(obj, context, info) {
			// Test for the existance of fields unique to each type.
			if (dataModel.isComment(obj)) {
				return "Comment";
			}

			if (dataModel.isReview(obj)) {
				return "Review";
			}

			// It should be imposible to get here.
			// TODO throw a more informative error message.
			return null;
		},
	},

	Vote: {
		id: p("_id"),

		isUpvote: p("value"),

		author: (obj, args, context) => dataModel.getAuthorOfVote(obj),
		subject: (obj, args, context) => dataModel.getSubjectOfVote(obj),
	},

	DateTime: GraphQLDateTime,
};

export default resolvers;
