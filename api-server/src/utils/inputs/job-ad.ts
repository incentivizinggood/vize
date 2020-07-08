import * as yup from "yup";

import { LocationInput, locationInputSchema } from "./location";

export type ContractType =
	| "FULL_TIME"
	| "PART_TIME"
	| "INTERNSHIP"
	| "TEMPORARY"
	| "CONTRACTOR";

export type CreateJobAdInput = {
	jobTitle: string;
	locations: LocationInput[];
	pesosPerHour: string;
	contractType: ContractType;
	jobDescription: string;
	responsibilities: string;
	qualifications: string;
};

export const createJobAdInputSchema = yup
	.object({
		jobTitle: yup.string().required(),
		locations: yup
			.array()
			.required()
			.min(1)
			.of(locationInputSchema),
		pesosPerHour: yup.string().required(),
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
		jobDescription: yup.string().required(),
		responsibilities: yup.string().required(),
		qualifications: yup.string().required(),
	})
	.required();

export type CreateApplyToJobAdInput = {
	jobAdId: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	coverLetter?: string | null;
};

export const createApplyToJobAdInputSchema = yup
	.object({
		jobAdId: yup.string().required(),
		fullName: yup.string().required(),
		email: yup
			.string()
			.email()
			.required(),
		phoneNumber: yup.string().required(),
		coverLetter: yup.string(),
	})
	.required();
