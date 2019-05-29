import * as dataModel from "imports/api/models";

import { QueryResolvers } from "./resolvers-types";

export const Query: QueryResolvers = {
	say: (_obj, _args, _context, _info) => "Hello world.",

	currentUser: (_obj, _args, context, _info) => context.user || null,

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
			args.searchText,
			args.pageNum,
			args.pageSize
		),

	searchJobAds: (_obj, args, _context, _info) =>
		dataModel.searchForJobAds(args.pageNum, args.pageSize),

	wroteAReview: (_obj, _args, context, _info) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");

		return dataModel.wroteAReviewStatus(context.user);
	},
};
