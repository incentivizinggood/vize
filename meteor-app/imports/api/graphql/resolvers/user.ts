import * as dataModel from "imports/api/models";

import { UserResolvers } from "imports/gen/graphql-resolvers";

export const User: UserResolvers = {
	id: (obj, _args, _context, _info) => obj._id,

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
};
