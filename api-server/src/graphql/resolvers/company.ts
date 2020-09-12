import * as dataModel from "src/models";

import { CompanyResolvers } from "generated/graphql-resolvers";

export const Company: CompanyResolvers = {
	id: (obj, _args, _context, _info) => String(obj.companyId),

	locations: (obj, _args, _context, _info) =>
		dataModel.getLocationsByCompany(obj),

	dateJoined: (obj, _args, _context, _info) => obj.dateAdded,

	reviews: (obj, args, _context, _info) =>
		dataModel.getReviewsByCompany(obj, args.pageNum, args.pageSize),

	numReviews: (obj, _args, _context, _info) =>
		dataModel.countReviewsByCompany(obj),

	jobAds: (obj, args, _context, _info) =>
		dataModel.getJobAdsByCompany(obj, args.pageNum, args.pageSize),

	numJobAds: (obj, _args, _context, _info) =>
		dataModel.countJobAdsByCompany(obj),

	salaries: (obj, args, _context, _info) =>
		dataModel.getSalariesByCompany(obj, args.pageNum, args.pageSize),

	numSalaries: (obj, _args, _context, _info) =>
		dataModel.countSalariesByCompany(obj),

	reviewStats: async (obj, _args, _context, _info) => {
		const reviewStats = await dataModel.getReviewStatsByCompanyName(
			obj.name
		);
		console.log({ reviewStats });
		return reviewStats;
	},

	salaryStats: (obj, _args, _context, _info) =>
		dataModel.getSalaryStatsByCompanyName(obj.name),
};
