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
import type { ID, AllModels } from "../models/common.js";

type Context = {
	user?: User,
} & AllModels;

type PgnArgs = {
	pageNum?: number,
	pageSize?: number,
};

type IdArg = { id: ID };

// A helper function that produces simple resolvers.
function p(path: string): ({ [path: string]: any }, {}, Context) => any {
	return (obj: { [path: string]: any }, args: {}, context: Context): any =>
		obj[path];
}

export default {
	Query: {
		say(obj: {}, args: {}, context: Context) {
			return "Hello world.";
		},
		currentUser(obj: {}, args: {}, context: Context) {
			// The current user is added to the context
			// by the `meteor/apollo` package.
			return context.user;
		},

		allComments(obj: {}, args: PgnArgs, context: Context) {
			return context.commentModel.getAllComments(
				args.pageNum,
				args.pageSize
			);
		},
		allCompanies(obj: {}, args: PgnArgs, context: Context) {
			return context.companyModel.getAllCompanies(
				args.pageNum,
				args.pageSize
			);
		},
		allJobAds(obj: {}, args: PgnArgs, context: Context) {
			return context.jobAdModel.getAllJobAds(args.pageNum, args.pageSize);
		},
		allReviews(obj: {}, args: PgnArgs, context: Context) {
			return context.reviewModel.getAllReviews(
				args.pageNum,
				args.pageSize
			);
		},
		allSalaries(obj: {}, args: PgnArgs, context: Context) {
			return context.salaryModel.getAllSalaries(
				args.pageNum,
				args.pageSize
			);
		},
		allUsers(obj: {}, args: PgnArgs, context: Context) {
			return context.userModel.getAllUsers(args.pageNum, args.pageSize);
		},
		allVotes(obj: {}, args: PgnArgs, context: Context) {
			return context.voteModel.getAllVotes(args.pageNum, args.pageSize);
		},

		comment(obj: {}, args: IdArg, context: Context) {
			return context.commentModel.getCommentById(args.id);
		},
		company(obj: {}, args: IdArg, context: Context) {
			return context.companyModel.getCompanyById(args.id);
		},
		jobAd(obj: {}, args: IdArg, context: Context) {
			return context.jobAdModel.getJobAdById(args.id);
		},
		review(obj: {}, args: IdArg, context: Context) {
			return context.reviewModel.getReviewById(args.id);
		},
		salary(obj: {}, args: IdArg, context: Context) {
			return context.salaryModel.getSalaryById(args.id);
		},
		user(obj: {}, args: IdArg, context: Context) {
			return context.userModel.getUserById(args.id);
		},
		vote(obj: {}, args: IdArg, context: Context) {
			return context.voteModel.getVoteById(args.id);
		},

		searchCompanies(
			obj: {},
			args: { searchText: string } & PgnArgs,
			context: Context
		) {
			return context.companyModel.searchForCompanies(
				args.searchText,
				args.pageNum,
				args.pageSize
			);
		},
	},

	CommentParent: {
		__resolveType(obj: CommentParent, context: Context, info: mixed) {
			// Test for the existance of fields unique to each type.
			if (context.commentModel.isComment(obj)) {
				return "Comment";
			}

			if (context.reviewModel.isReview(obj)) {
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

		author: (obj: Comment, args: {}, context: Context) =>
			context.commentModel.getAuthorOfComment(obj),
		parent: (obj: Comment, args: {}, context: Context) =>
			context.commentModel.getParentOfComment(obj),
		children: (obj: Comment, args: PgnArgs, context: Context) =>
			context.commentModel.getCommentsByParent(
				obj,
				args.pageNum,
				args.pageSize
			),
		votes: (obj: Comment, args: PgnArgs, context: Context) =>
			context.voteModel.getVotesBySubject(
				obj,
				args.pageNum,
				args.pageSize
			),
	},

	Company: {
		id: p("_id"),

		avgStarRatings: ({
			healthAndSafety,
			managerRelationship,
			workEnvironment,
			benefits,
			overallSatisfaction,
		}: Company) => ({
			healthAndSafety,
			managerRelationship,
			workEnvironment,
			benefits,
			overallSatisfaction,
		}),

		reviews: (obj: Company, args: PgnArgs, context: Context) =>
			context.reviewModel.getReviewsByCompany(
				obj,
				args.pageNum,
				args.pageSize
			),
		jobAds: (obj: Company, args: PgnArgs, context: Context): [JobAd] =>
			context.jobAdModel.getJobAdsByCompany(
				obj,
				args.pageNum,
				args.pageSize
			),
		numJobAds: (obj: Company, args: PgnArgs, context: Context): number =>
			context.jobAdModel.countJobAdsByCompany(obj),
		salaries: (obj: Company, args: PgnArgs, context: Context) =>
			context.salaryModel.getSalariesByCompany(
				obj,
				args.pageNum,
				args.pageSize
			),
		numSalaries: (obj: Company, args: PgnArgs, context: Context): number =>
			context.salaryModel.countSalariesByCompany(obj),
	},

	JobAd: {
		id: p("_id"),

		created: p("datePosted"),

		company: (obj: JobAd, args: {}, context: Context) =>
			context.jobAdModel.getCompanyOfJobAd(obj),
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
		}: Review) => ({
			healthAndSafety,
			managerRelationship,
			workEnvironment,
			benefits,
			overallSatisfaction,
		}),
		created: p("datePosted"),

		author: (obj: Review, args: {}, context: Context) =>
			context.reviewModel.getAuthorOfReview(obj),
		company: (obj: Review, args: {}, context: Context) =>
			context.reviewModel.getCompanyOfReview(obj),
		comments: (obj: Review, args: PgnArgs, context: Context) =>
			context.commentModel.getCommentsByParent(
				obj,
				args.pageNum,
				args.pageSize
			),
		votes: (obj: Review, args: PgnArgs, context: Context) =>
			context.voteModel.getVotesBySubject(
				obj,
				args.pageNum,
				args.pageSize
			),
		currentUserVote: (obj: Review, args: {}, context: Context) =>
			context.user
				? context.voteModel.getVoteByAuthorAndSubject(context.user, obj)
				: null,
	},

	Salary: {
		id: p("_id"),

		created: p("datePosted"),

		author: (obj: Salary, args: {}, context: Context) =>
			context.salaryModel.getAuthorOfSalary(obj),
		company: (obj: Salary, args: {}, context: Context) =>
			context.salaryModel.getCompanyOfSalary(obj),
	},

	User: {
		id: p("_id"),

		role: ({ role }: User) => role.toUpperCase().replace("-", "_"),
		created: p("createdAt"),

		company: (obj: User, args: {}, context: Context) =>
			context.userModel.getCompanyOfUser(obj),
		reviews: (obj: User, args: PgnArgs, context: Context) =>
			context.reviewModel.getReviewsByAuthor(
				obj,
				args.pageNum,
				args.pageSize
			),
		comments: (obj: User, args: PgnArgs, context: Context) =>
			context.commentModel.getCommentsByAuthor(
				obj,
				args.pageNum,
				args.pageSize
			),
		votes: (obj: User, args: PgnArgs, context: Context) =>
			context.voteModel.getVotesByAuthor(
				obj,
				args.pageNum,
				args.pageSize
			),
	},

	VoteSubject: {
		__resolveType(obj: VoteSubject, context: Context, info: mixed) {
			// Test for the existance of fields unique to each type.
			if (context.commentModel.isComment(obj)) {
				return "Comment";
			}

			if (context.reviewModel.isReview(obj)) {
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

		author: (obj: Vote, args: {}, context: Context) =>
			context.voteModel.getAuthorOfVote(obj),
		subject: (obj: Vote, args: {}, context: Context) =>
			context.voteModel.getSubjectOfVote(obj),
	},

	DateTime: GraphQLDateTime,
};
