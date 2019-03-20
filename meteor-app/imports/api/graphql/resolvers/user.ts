import * as dataModel from "imports/api/models";

import { UserResolvers } from "./resolvers-types";

export const User: UserResolvers = {
	id: (obj, _args, _context, _info) => dataModel.userIdToString(obj._id),

	role: (obj, _args, _context, _info) => {
		if (obj.role === "worker") {
			return "WORKER";
		} else if (obj.role === "company-unverified") {
			return "COMPANY_UNVERIFIED";
		} else if (obj.role === "company") {
			return "COMPANY";
		} else {
			throw Error("User role is not valid.");
		}
	},

	created: (obj, _args, _context, _info) => obj.createdAt,

	company: (obj, _args, _context, _info) => dataModel.getCompanyOfUser(obj),

	reviews: (obj, args, _context, _info) =>
		dataModel.getReviewsByAuthor(obj, args.pageNum, args.pageSize),

	comments: (obj, args, _context, _info) =>
		dataModel.getCommentsByAuthor(obj, args.pageNum, args.pageSize),

	votes: (obj, args, _context, _info) =>
		dataModel.getVotesByAuthor(obj, args.pageNum, args.pageSize),
};
