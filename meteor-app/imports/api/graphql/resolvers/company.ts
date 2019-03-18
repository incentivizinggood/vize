import * as dataModel from "imports/api/models";

import { CompanyResolvers } from "./resolvers-types";

export const Company: CompanyResolvers.Resolvers = {
	id: (obj, _args, _context, _info) =>
		dataModel.companyIdToString(obj.companyId),

	locations: (obj, _args, _context, _info) =>
		dataModel.getLocationsByCompany(obj),
	dateJoined: (obj, _args, _context, _info) => obj.dateAdded,

	avgStarRatings: (obj, _args, _context, _info) => {
		if (
			obj.healthAndSafety === null ||
			obj.healthAndSafety === undefined ||
			obj.managerRelationship === null ||
			obj.managerRelationship === undefined ||
			obj.workEnvironment === null ||
			obj.workEnvironment === undefined ||
			obj.benefits === null ||
			obj.benefits === undefined ||
			obj.overallSatisfaction === null ||
			obj.overallSatisfaction === undefined
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
		dataModel.getReviewsByCompany(
			obj,
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	jobAds: (obj, args, _context, _info) =>
		dataModel.getJobAdsByCompany(
			obj,
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	numJobAds: (obj, _args, _context, _info) =>
		dataModel.countJobAdsByCompany(obj),
	salaries: (obj, args, _context, _info) =>
		dataModel.getSalariesByCompany(
			obj,
			args.pageNum || 0,
			args.pageSize || dataModel.defaultPageSize
		),

	numSalaries: (obj, _args, _context, _info) =>
		dataModel.countSalariesByCompany(obj),
};
