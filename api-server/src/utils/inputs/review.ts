import * as yup from "yup";

import { LocationInput, locationInputSchema } from "./location";

export type ContractType =
	| "FULL_TIME"
	| "PART_TIME"
	| "INTERNSHIP"
	| "TEMPORARY"
	| "CONTRACTOR";

export type EmploymentStatus = "FORMER" | "CURRENT";

export type CreateReviewInput = {
	companyName: string;
	reviewTitle: string;
	location: LocationInput;
	jobTitle: string;
	numberOfMonthsWorked: number;
	contractType: ContractType;
	employmentStatus: EmploymentStatus;
	pros: string;
	cons: string;
	wouldRecommendToOtherJobSeekers: boolean;
	healthAndSafety: number;
	managerRelationship: number;
	workEnvironment: number;
	benefits: number;
	overallSatisfaction: number;
	additionalComments?: string | null;
	referredBy?: string | null;
};

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
