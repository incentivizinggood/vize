import * as dataModel from "imports/api/models";

import { MutationResolvers } from "imports/gen/graphql-resolvers";

export const Mutation: MutationResolvers = {
	claimWroteAReview: (_obj, args, context, _info) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");

		return dataModel.claimWroteAReview(
			context.user,
			args.phoneNumber,
			args.paymentMethod
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

	createCompany: async (_obj, { input }, context, _info) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");
		const companyId = await dataModel.createCompany(
			input,
			await dataModel.getUserPostgresId(context.user._id)
		);
		const company = await dataModel.getCompanyById(companyId);
		return { company };
	},

	createReview: async (_obj, { input }, context, _info) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");
		const reviewId = await dataModel.createReview(
			input,
			await dataModel.getUserPostgresId(context.user._id)
		);
		const review = await dataModel.getReviewById(reviewId);
		return { review };
	},
};
