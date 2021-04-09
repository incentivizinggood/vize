import * as dataModel from "src/models";

import { UserProfileResolvers } from "generated/graphql-resolvers";

export const User: UserProfileResolvers = {
	id: (obj, _args, _context, _info) => String(obj.userId),

	email: (obj, _args, _context, _info) => {
		const user = dataModel.getUserById(obj.userId);

		if (user == null) {
			throw Error("User does not exist.");
		}

		return null;
	},
};
