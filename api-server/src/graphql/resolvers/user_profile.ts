import * as dataModel from "src/models";

import { UserProfileResolvers } from "generated/graphql-resolvers";

export const User: UserProfileResolvers = {
	id: (obj, _args, _context, _info) => String(obj.userId),

	email: (obj, _args, _context, _info) => {
		return dataModel.getUserById(obj.userId).email_address;
	},
};
