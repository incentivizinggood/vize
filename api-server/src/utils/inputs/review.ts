import * as yup from "yup";

import { locationInputSchema } from "./location";

export const starRatingSchema = yup
	.number()
	.integer()
	.min(0)
	.max(5)
	.required();

export const createReviewInputSchema = yup
	.object({
		companyName: yup.string().required(),
		reviewTitle: yup.string().required(),
		location: locationInputSchema,
		jobTitle: yup.string().required(),
		numberOfMonthsWorked: yup
			.number()
			.min(0)
			.required(),
		contractType: yup
			.string()
			.oneOf([
				"FULL_TIME",
				"PART_TIME",
				"INTERNSHIP",
				"TEMPORARY",
				"CONTRACTOR",
			])
			.required(),
		employmentStatus: yup
			.string()
			.oneOf(["FORMER", "CURRENT"])
			.required(),
		pros: yup.string().required(),
		cons: yup.string().required(),
		wouldRecommendToOtherJobSeekers: yup.boolean().required(),
		healthAndSafety: starRatingSchema,
		managerRelationship: starRatingSchema,
		workEnvironment: starRatingSchema,
		benefits: starRatingSchema,
		overallSatisfaction: starRatingSchema,
		additionalComments: yup.string(),
		referredBy: yup.string(),
	})
	.required();
