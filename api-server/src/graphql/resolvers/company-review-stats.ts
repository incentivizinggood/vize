import { CompanyReviewStatsResolvers } from "generated/graphql-resolvers";

export const CompanyReviewStats: CompanyReviewStatsResolvers = {
	avgStarRatings: (obj, _args, _context, _info) => {
		console.log({ obj });
		if (
			obj.healthAndSafety === null ||
			obj.managerRelationship === null ||
			obj.workEnvironment === null ||
			obj.benefits === null ||
			obj.overallSatisfaction === null
		) {
			return null;
		} else {
			return {
				healthAndSafety: obj.healthAndSafety,
				managerRelationship: obj.managerRelationship,
				workEnvironment: obj.workEnvironment,
				benefits: obj.benefits,
				overallSatisfaction: obj.overallSatisfaction,
			};
		}
	},
};
