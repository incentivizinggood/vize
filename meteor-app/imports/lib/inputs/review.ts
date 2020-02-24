import * as yup from "yup";

import LocationInput from "./location";

type CreateReviewInput = {
	companyName: string;
	reviewTitle: string;
	location: LocationInput;
	jobTitle: string;
	numberOfMonthsWorked: number;
	contractType: CreateReviewInput.ContractType;
	pros: string;
	cons: string;
	wouldRecommendToOtherJobSeekers: boolean;
	healthAndSafety: number;
	managerRelationship: number;
	workEnvironment: number;
	benefits: number;
	overallSatisfaction: number;
	additionalComments?: string | null;
};

namespace CreateReviewInput {
	const starRatingSchema = yup
		.number()
		.integer()
		.min(0)
		.max(5)
		.required();

	export const schema = yup.object({
		companyName: yup.string().required(),
		reviewTitle: yup.string().required(),
		location: LocationInput.schema,
		jobTitle: yup.string().required(),
		numberOfMonthsWorked: yup
			.number()
			.min(0)
			.required(),
		contractType: yup
			.mixed()
			.oneOf([
				"FULL_TIME",
				"PART_TIME",
				"INTERNSHIP",
				"TEMPORARY",
				"CONTRACTOR",
			])
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
	});

	export type ContractType =
		| "FULL_TIME"
		| "PART_TIME"
		| "INTERNSHIP"
		| "TEMPORARY"
		| "CONTRACTOR";
}

export default CreateReviewInput;
