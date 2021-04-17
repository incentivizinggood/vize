import * as dataModel from "src/models";

import { MutationResolvers } from "generated/graphql-resolvers";

export const Mutation: MutationResolvers = {
	claimWroteAReview: (_obj, args, context, _info) => {
		// Error in English: Not Logged In
		if (!context.user)
			throw new Error("Tienes que iniciar una sesión o registrarte");

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
		// Error in English: Not Logged In
		if (!context.user)
			throw new Error("Tienes que iniciar una sesión o registrarte");

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
		// Error in English: Not Logged In
		if (!context.user)
			throw new Error("Tienes que iniciar una sesión o registrarte");

		const resource = await dataModel.resourceLike(
			context.user,
			resourceSlug,
			isResourceLiked
		);

		return { resource };
	},

	createCompany: async (_obj, { input }, context, _info) => {
		// Error in English: Not Logged In
		if (!context.user)
			throw new Error("Tienes que iniciar una sesión o registrarte");
		const companyId = await dataModel.createCompany(
			input,
			context.user.userId
		);
		const company = await dataModel.getCompanyById(companyId);
		return { company };
	},

	createUserProfile: async (_obj, { input }, context, _info) => {
		// Error in English: Not Logged In
		console.log("were in here", input);
		if (!context.user)
			throw new Error("Tienes que iniciar una sesión o registrarte");
		const success = await dataModel.createUserProfile(
			input,
			context.user.userId
		);
		return { success };
	},

	createReview: async (_obj, { input }, context, _info) => {
		// Error in English: Not Logged In
		if (!context.user)
			throw new Error("Tienes que iniciar una sesión o registrarte");

		const reviewId = await dataModel.createReview(
			input,
			context.user.userId
		);

		const review = await dataModel.getReviewById(reviewId);
		return { review };
	},

	createSalary: async (
		_obj,
		{ input: { incomeType, gender, ...input } },
		context,
		_info
	) => {
		// Error in English: Not Logged In
		if (!context.user)
			throw new Error("Tienes que iniciar una sesión o registrarte");

		const salaryId = await dataModel.createSalary(
			{
				// TODO: change the database so that we do not need to convert these.
				incomeType:
					incomeType === "YEARLY_SALARY"
						? "Yearly Salary"
						: incomeType === "MONTHLY_SALARY"
						? "Monthly Salary"
						: incomeType === "WEEKLY_SALARY"
						? "Weekly Salary"
						: incomeType === "DAILY_SALARY"
						? "Daily Salary"
						: "Hourly Wage",
				gender:
					gender === "MALE"
						? "Male"
						: gender === "FEMALE"
						? "Female"
						: undefined,
				...input,
			},
			context.user.userId
		);
		const salary = await dataModel.getSalaryById(salaryId);
		return { salary };
	},

	createJobAd: async (_obj, { input }, context, _info) => {
		// Error in English: Not Logged In
		if (!context.user)
			throw new Error("Tienes que iniciar una sesión o registrarte");

		const jobAdId = await dataModel.createJobAd(input, context.user.userId);
		const jobAd = await dataModel.getJobAdById(jobAdId);
		return { jobAd };
	},

	applyToJobAd: async (_obj, { input }, context, _info) => {
		// Error in English: Not Logged In
		if (!context.user)
			throw new Error("Tienes que iniciar una sesión o registrarte");

		const success = await dataModel.applyToJobAd(input);
		return { success };
	},

	flagReview: async (_obj, { input }, context, _info) => {
		// Error in English: Not Logged In
		if (!context.user)
			throw new Error("Tienes que iniciar una sesión o registrarte");

		const success = await dataModel.flagReview(context.user, input);
		return { success };
	},
};
