import * as dataModel from "imports/api/models";

import { MutationResolvers } from "./resolvers-types";

export const Mutation: MutationResolvers = {
	claimWroteAReview: (_obj, args, context, _info) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");

		return dataModel.claimWroteAReview(
			context.user,
			args.phoneNumber,
			args.paymentMethod
		);
	},
};
