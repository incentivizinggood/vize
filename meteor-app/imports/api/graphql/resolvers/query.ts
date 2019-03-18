import * as dataModel from "imports/api/models";

import { QueryResolvers } from "./resolvers-types";

export const Query: QueryResolvers.Resolvers = {
	say: (_obj, _args, _context, _info) => "Hello world.",

	currentUser: (_obj, _args, context, _info) =>
		// The current user is added to the context
		// by the `meteor/apollo` package.
		context.user,

	allComments: (_obj, args, _context, _info) =>
		dataModel.getAllComments(
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	allCompanies: (_obj, args, _context, _info) =>
		dataModel.getAllCompanies(
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	allJobAds: (_obj, args, _context, _info) =>
		dataModel.getAllJobAds(
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	allReviews: (_obj, args, _context, _info) =>
		dataModel.getAllReviews(
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	allSalaries: (_obj, args, _context, _info) =>
		dataModel.getAllSalaries(
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	allUsers: (_obj, args, _context, _info) =>
		dataModel.getAllUsers(
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	allVotes: (_obj, args, _context, _info) =>
		dataModel.getAllVotes(
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	comment: (_obj, args, _context, _info) =>
		dataModel.getCommentById(dataModel.stringToCommentId(args.id)),

	company: (_obj, args, _context, _info) =>
		dataModel.getCompanyById(dataModel.stringToCompanyId(args.id)),

	jobAd: (_obj, args, _context, _info) =>
		dataModel.getJobAdById(dataModel.stringToJobAdId(args.id)),

	review: (_obj, args, _context, _info) =>
		dataModel.getReviewById(dataModel.stringToReviewId(args.id)),

	salary: (_obj, args, _context, _info) =>
		dataModel.getSalaryById(dataModel.stringToSalaryId(args.id)),

	user: (_obj, args, _context, _info) =>
		dataModel.getUserById(dataModel.stringToUserId(args.id)),

	vote: (_obj, args, _context, _info) =>
		dataModel.getVoteById(dataModel.stringToVoteId(args.id)),

	searchCompanies: (_obj, args, _context, _info) =>
		dataModel.searchForCompanies(
			args.searchText || "",
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	wroteAReview: (_obj, _args, context, _info) =>
		dataModel.wroteAReviewStatus(context.user),
};
