import * as dataModel from "src/models";

import { ReviewResolvers } from "generated/graphql-resolvers";

export const Review: ReviewResolvers = {
	id: (obj, _args, _context, _info) => String(obj.reviewId),

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

	company: (obj, _args, _context, _info) => dataModel.getCompanyOfReview(obj),

	comments: (obj, args, _context, _info) =>
		dataModel.getCommentsByParent(obj, args.pageNum, args.pageSize),

	currentUserVote: async (obj, _args, context, _info) => {
		if (!context.user) {
			return null;
		}

		// Users cannot vote on their own reviews.
		// Return null to help signify this.
		if (context.user.userId === obj.submittedBy) {
			return null;
		}

		return dataModel.getVoteByAuthorAndSubject(context.user, obj);
	},
};
