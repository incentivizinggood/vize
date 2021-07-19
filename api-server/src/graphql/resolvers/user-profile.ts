import * as dataModel from "src/models";

import { UserProfileResolvers } from "generated/graphql-resolvers";

export const UserProfile: UserProfileResolvers = {
	id: (obj, _args, _context, _info) => String(obj.userId),

	email: async (_obj, _args, context, _info) => {
		//prettier-ignore
		if (context.user?.userId == null) {
			return null;
		}
		const user = await dataModel.getUserById(context.user?.userId);

		if (user == null) {
			return null;
		}

		return user.emailAddress;
	},
};
