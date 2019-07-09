import * as dataModel from "imports/api/models";

import { MutationResolvers } from "imports/gen/graphql-resolvers";

export const Mutation: MutationResolvers = {
	claimWroteAReview: (_obj, args, context, _info) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");

		return dataModel.claimWroteAReview(
			context.user,
			args.phoneNumber,
			args.paymentMethod,
			args.howYouHeardAboutUs
		);
	},

	castVote: (
		_obj,
		{ input: { subjectId, isUpvote = null } },
		context,
		_info
	) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");

		return dataModel
			.castVote(
				context.user,
				dataModel.stringToReviewId(subjectId),
				isUpvote
			)
			.then(vote => (vote ? { vote } : null));
	},
};
