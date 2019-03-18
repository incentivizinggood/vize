import * as dataModel from "imports/api/models";

import { ReviewResolvers } from "./resolvers-types";

export const Review: ReviewResolvers.Resolvers = {
	id: (obj, _args, _context, _info) =>
		dataModel.reviewIdToString(obj.reviewId),

	location: (obj, _args, _context, _info) =>
		dataModel.parseLocationString(obj.location),
	wouldRecommendToOtherJobSeekers: (obj, _args, _context, _info) =>
		obj.wouldRecommend,

	starRatings: (obj, _args, _context, _info) => ({
		healthAndSafety: obj.healthAndSafety,
		managerRelationship: obj.managerRelationship,
		workEnvironment: obj.workEnvironment,
		benefits: obj.benefits,
		overallSatisfaction: obj.overallSatisfaction,
	}),

	created: (obj, _args, _context, _info) => obj.dateAdded,

	author: (obj, _args, _context, _info) => dataModel.getAuthorOfReview(obj),

	company: (obj, _args, _context, _info) => dataModel.getCompanyOfReview(obj),

	comments: (obj, args, _context, _info) =>
		dataModel.getCommentsByParent(
			obj,
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	votes: (obj, args, _context, _info) =>
		dataModel.getVotesBySubject(
			obj,
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	currentUserVote: (obj, _args, context, _info) =>
		context.user
			? dataModel.getVoteByAuthorAndSubject(context.user, obj)
			: null,
};
