import * as dataModel from "src/models";

import { MutationResolvers } from "generated/graphql-resolvers";

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
			.castVote(context.user, Number(subjectId), isUpvote)
			.then(vote => (vote ? { vote } : null));
	},

	resourceLike: async (
		_obj,
		{ input: { resourceSlug, isResourceLiked } },
		context,
		_info
	) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");

		const resource = await dataModel.resourceLike(
			context.user,
			resourceSlug,
			isResourceLiked
		);

		return { resource };
	},

	createCompany: async (_obj, { input }, context, _info) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");
		const companyId = await dataModel.createCompany(
			input,
			context.user.userId
		);
		const company = await dataModel.getCompanyById(companyId);
		return { company };
	},

	createReview: async (_obj, { input }, context, _info) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");

		const reviewId = await dataModel.createReview(
			input,
			context.user.userId
		);

		const review = await dataModel.getReviewById(reviewId);
		return { review };
	},

	createSalary: async (_obj, { input }, context, _info) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");

		const salaryId = await dataModel.createSalary(
			input,
			context.user.userId
		);
		const salary = await dataModel.getSalaryById(salaryId);
		return { salary };
	},

	createJobAd: async (_obj, { input }, context, _info) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");

		const jobAdId = await dataModel.createJobAd(input, context.user.userId);
		const jobAd = await dataModel.getJobAdById(jobAdId);
		return { jobAd };
	},

	applyToJobAd: async (_obj, { input }, context, _info) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");

		const success = await dataModel.applyToJobAd(input);
		return { success };
	},

	flagReview: async (_obj, { input }, context, _info) => {
		if (!context.user) throw new Error("NOT_LOGGED_IN");

		const success = await dataModel.flagReview(context.user, input);
		return { success };
	},
};
