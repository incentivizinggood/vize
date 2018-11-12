// @flow
/* eslint-disable no-unused-vars */

import { GraphQLDateTime } from "graphql-iso-date";

import type { User } from "../models";
import {
	Resolvers,
	Comment_defaultResolvers,
	Company_defaultResolvers,
	JobAd_defaultResolvers,
	Review_defaultResolvers,
	Salary_defaultResolvers,
	User_defaultResolvers,
	Vote_defaultResolvers,
	Location_defaultResolvers,
	StarRatings_defaultResolvers,
} from "./graphqlgen.js";

import * as dataModel from "../models";

export type Context = {
	user: User,
};

const resolvers: Resolvers = {
	Query: {
		say: (obj, args, context, info) => "Hello world.",

		currentUser: (obj, args, context, info) =>
			// The current user is added to the context
			// by the `meteor/apollo` package.
			context.user,

		allComments: (obj, args, context, info) =>
			dataModel.getAllComments(args.pageNum, args.pageSize),

		allCompanies: (obj, args, context, info) =>
			dataModel.getAllCompanies(args.pageNum, args.pageSize),

		allJobAds: (obj, args, context, info) =>
			dataModel.getAllJobAds(args.pageNum, args.pageSize),

		allReviews: (obj, args, context, info) =>
			dataModel.getAllReviews(args.pageNum, args.pageSize),

		allSalaries: (obj, args, context, info) =>
			dataModel.getAllSalaries(args.pageNum, args.pageSize),

		allUsers: (obj, args, context, info) =>
			dataModel.getAllUsers(args.pageNum, args.pageSize),

		allVotes: (obj, args, context, info) =>
			dataModel.getAllVotes(args.pageNum, args.pageSize),

		comment: (obj, args, context, info) =>
			dataModel.getCommentById(args.id),

		company: (obj, args, context, info) =>
			dataModel.getCompanyById(args.id),

		jobAd: (obj, args, context, info) => dataModel.getJobAdById(args.id),

		review: (obj, args, context, info) => dataModel.getReviewById(args.id),

		salary: (obj, args, context, info) => dataModel.getSalaryById(args.id),

		user: (obj, args, context, info) => dataModel.getUserById(args.id),

		vote: (obj, args, context, info) => dataModel.getVoteById(args.id),

		searchCompanies: (obj, args, context, info) =>
			dataModel.searchForCompanies(
				args.searchText,
				args.pageNum,
				args.pageSize
			),
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
		...Comment_defaultResolvers,

		id: (obj, args, context, info) => obj._id,

		created: (obj, args, context, info) => obj.datePosted,

		author: (obj, args, context, info) => dataModel.getAuthorOfComment(obj),

		parent: (obj, args, context, info) => dataModel.getParentOfComment(obj),

		children: (obj, args, context, info) =>
			dataModel.getCommentsByParent(obj, args.pageNum, args.pageSize),

		votes: (obj, args, context, info) =>
			dataModel.getVotesBySubject(obj, args.pageNum, args.pageSize),
	},

	Company: {
		...Company_defaultResolvers,

		id: (obj, args, context, info) => obj._id,

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

		reviews: (obj, args, context, info) =>
			dataModel.getReviewsByCompany(obj, args.pageNum, args.pageSize),

		jobAds: (obj, args, context, info) =>
			dataModel.getJobAdsByCompany(obj, args.pageNum, args.pageSize),

		numJobAds: (obj, args, context, info) =>
			dataModel.countJobAdsByCompany(obj),
		salaries: (obj, args, context, info) =>
			dataModel.getSalariesByCompany(obj, args.pageNum, args.pageSize),

		numSalaries: (obj, args, context, info) =>
			dataModel.countSalariesByCompany(obj),
	},

	JobAd: {
		...JobAd_defaultResolvers,

		id: (obj, args, context, info) => obj._id,

		created: (obj, args, context, info) => obj.datePosted,

		company: (obj, args, context, info) => dataModel.getCompanyOfJobAd(obj),
	},

	Review: {
		...Review_defaultResolvers,

		id: (obj, args, context, info) => obj._id,

		title: (obj, args, context, info) => obj.reviewTitle,

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

		created: (obj, args, context, info) => obj.datePosted,

		author: (obj, args, context, info) => dataModel.getAuthorOfReview(obj),

		company: (obj, args, context, info) =>
			dataModel.getCompanyOfReview(obj),

		comments: (obj, args, context, info) =>
			dataModel.getCommentsByParent(obj, args.pageNum, args.pageSize),

		votes: (obj, args, context, info) =>
			dataModel.getVotesBySubject(obj, args.pageNum, args.pageSize),

		currentUserVote: (obj, args, context, info) =>
			context.user
				? dataModel.getVoteByAuthorAndSubject(context.user, obj)
				: null,
	},

	Salary: {
		...Salary_defaultResolvers,

		id: (obj, args, context, info) => obj._id,

		created: (obj, args, context, info) => obj.datePosted,

		author: (obj, args, context, info) => dataModel.getAuthorOfSalary(obj),

		company: (obj, args, context, info) =>
			dataModel.getCompanyOfSalary(obj),
	},

	User: {
		...User_defaultResolvers,

		id: (obj, args, context, info) => obj._id,

		role: ({ role }) => role.toUpperCase().replace("-", "_"),

		created: (obj, args, context, info) => obj.createdAt,

		company: (obj, args, context, info) => dataModel.getCompanyOfUser(obj),

		reviews: (obj, args, context, info) =>
			dataModel.getReviewsByAuthor(obj, args.pageNum, args.pageSize),

		comments: (obj, args, context, info) =>
			dataModel.getCommentsByAuthor(obj, args.pageNum, args.pageSize),

		votes: (obj, args, context, info) =>
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
		...Vote_defaultResolvers,

		id: (obj, args, context, info) =>
			JSON.stringify({
				submittedBy: obj.submittedBy,
				subjectType: obj.subjectType,
				refersTo: obj.refersTo,
			}),

		isUpvote: (obj, args, context, info) => obj.value,

		author: (obj, args, context, info) => dataModel.getAuthorOfVote(obj),

		subject: (obj, args, context, info) => dataModel.getSubjectOfVote(obj),
	},

	Location: {
		...Location_defaultResolvers,
	},

	StarRatings: {
		...StarRatings_defaultResolvers,
	},

	DateTime: GraphQLDateTime,
};

export default resolvers;
