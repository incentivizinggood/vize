import * as dataModel from "imports/api/models";

import { QueryResolvers } from "imports/gen/graphql-resolvers";

export const Query: QueryResolvers = {
	say: (_obj, _args, _context, _info) => "Hello world.",

	currentUser: (_obj, _args, context, _info) => context.user || null,

	comment: (_obj, args, _context, _info) =>
		dataModel.getCommentById(Number(args.id)),

	company: (_obj, args, _context, _info) =>
		dataModel.getCompanyById(Number(args.id)),

	jobAd: (_obj, args, _context, _info) =>
		dataModel.getJobAdById(Number(args.id)),

	review: (_obj, args, _context, _info) =>
		dataModel.getReviewById(Number(args.id)),

	salary: (_obj, args, _context, _info) =>
		dataModel.getSalaryById(Number(args.id)),

	user: (_obj, args, _context, _info) =>
		dataModel.getUserById(Number(args.id)),

	vote: (_obj, args, _context, _info) =>
		dataModel.getVoteById(dataModel.stringToVoteId(args.id)),

	article: (_obj, args, _context, _info) =>
		dataModel.getArticleBySlug(args.id),

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
