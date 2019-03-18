import * as dataModel from "imports/api/models";

import { UserResolvers, UserRole } from "./resolvers-types";

const defaultPageSize = 100;

export const User: UserResolvers.Resolvers = {
	id: (obj, _args, _context, _info) => dataModel.userIdToString(obj._id),

	role: (obj, _args, _context, _info) => {
		let role;
		if (obj.role === "worker") {
			role = "WORKER";
		} else if (obj.role === "company-unverified") {
			role = "COMPANY_UNVERIFIED";
		} else if (obj.role === "company") {
			role = "COMPANY";
		} else {
			throw Error("User role is not valid.");
		}
		return role as UserRole;
	},
	created: (obj, _args, _context, _info) => obj.createdAt,

	company: (obj, _args, _context, _info) => dataModel.getCompanyOfUser(obj),

	reviews: (obj, args, _context, _info) =>
		dataModel.getReviewsByAuthor(
			obj,
			args.pageNum || 0,
			args.pageSize || defaultPageSize
		),

	comments: (obj, args, _context, _info) =>
		dataModel.getCommentsByAuthor(
			obj,
			args.pageNum || 0,
			args.pageSize || defaultPageSize
		),

	votes: (obj, args, _context, _info) =>
		dataModel.getVotesByAuthor(
			obj,
			args.pageNum || 0,
			args.pageSize || defaultPageSize
		),
};
