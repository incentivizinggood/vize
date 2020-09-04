import * as dataModel from "src/models";

import { CompanyResolvers } from "generated/graphql-resolvers";

export const Company: CompanyResolvers = {
	id: (obj, _args, _context, _info) => String(obj.companyId),

	locations: (obj, _args, _context, _info) =>
		dataModel.getLocationsByCompany(obj),
	dateJoined: (obj, _args, _context, _info) => obj.dateAdded,

	avgStarRatings: (obj, _args, _context, _info) => {
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

	reviews: (obj, args, _context, _info) =>
		dataModel.getReviewsByCompany(obj, args.pageNum, args.pageSize),

	numReviews: (obj, _args, _context, _info) => obj.numReviews || 0,

	jobAds: (obj, args, _context, _info) =>
		dataModel.getJobAdsByCompany(obj, args.pageNum, args.pageSize),

	numJobAds: (obj, _args, _context, _info) =>
		dataModel.countJobAdsByCompany(obj),

	salaries: (obj, args, _context, _info) =>
		dataModel.getSalariesByCompany(obj, args.pageNum, args.pageSize),

	numSalaries: (obj, _args, _context, _info) =>
		dataModel.countSalariesByCompany(obj),

	salaryStats: (obj, _args, _context, _info) =>
		dataModel.getSalaryStatsByCompanyName(obj.name),
};
