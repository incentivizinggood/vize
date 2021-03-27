import * as dataModel from "src/models";

import { QueryResolvers } from "generated/graphql-resolvers";

export const Query: QueryResolvers = {
	say: (_obj, _args, _context, _info) => "Hello world.",

	currentUser: (_obj, _args, context, _info) => context.user || null,

	comment: (_obj, args, _context, _info) =>
		dataModel.getCommentById(Number(args.id)),

	company: (_obj, args, _context, _info) =>
		dataModel.getCompanyById(Number(args.id)),

	jobAd: (_obj, args, _context, _info) =>
		dataModel.getJobAdById(Number(args.id)),

	jobApplication: (_obj, args, context, _info) => {
		console.log("con", context);
		if (!context.user || context.user.role !== "company")
			throw new Error("Only companies can access this information.");

		dataModel.getJobApplicationById(
			Number(args.id),
			context.user.companyId
		);
	},

	review: (_obj, args, _context, _info) =>
		dataModel.getReviewById(Number(args.id)),

	salary: (_obj, args, _context, _info) =>
		dataModel.getSalaryById(Number(args.id)),

	user: (_obj, args, _context, _info) =>
		dataModel.getUserById(Number(args.id)),

	vote: (_obj, args, _context, _info) =>
		dataModel.getVoteById(dataModel.stringToVoteId(args.id)),

	resource: (_obj, args, _context, _info) =>
		dataModel.getResourceBySlug(args.id),

	resourceAuthor: (_obj, args, _context, _info) =>
		dataModel.getResourceAuthorById(Number(args.id)),

	resourceTopics: (_obj, args, _context, _info) =>
		dataModel.getResourceTopics(args.audienceType),

	highlightedResources: (_obj, args, _context, _info) =>
		dataModel.getHighlightedResources(args.audienceType),

	searchResourcesByTopic: (_obj, args, _context, _info) =>
		dataModel.searchForResourcesByTopic(
			args.id,
			args.searchText,
			args.pageNum,
			args.pageSize,
			args.audienceType
		),

	searchRecentResources: (_obj, args, _context, _info) =>
		dataModel.searchForRecentResources(
			args.searchText,
			args.pageNum,
			args.pageSize,
			args.audienceType
		),

	searchCompanies: (_obj, args, _context, _info) =>
		dataModel.searchForCompanies(
			args.searchText,
			args.pageNum,
			args.pageSize
		),

	companyNameSuggestions: (_obj, args, _context, _info) =>
		dataModel.companyNameSuggestions(
			args.partialCompanyName,
			args.onlyCompaniesWithProfiles
		),

	searchJobAds: (_obj, args, _context, _info) =>
		dataModel.searchForJobAds(args.pageNum, args.pageSize),

	wroteAReview: (_obj, _args, context, _info) => {
		// Error in English: Not Logged In
		if (!context.user)
			throw new Error("Tienes que iniciar una sesión o registrarte");

		return dataModel.wroteAReviewStatus(context.user);
	},
};
