import * as yup from "yup";

import { locationInputSchema } from "./location";

export const createJobAdInputSchema = yup
	.object({
		jobTitle: yup.string().required(),
		locations: yup
			.array()
			.required()
			.min(1)
			.of(locationInputSchema),
		salaryMin: yup.number().required(),
		salaryMax: yup.number().required(),
		salaryType: yup
			.string()
			.oneOf([
				"YEARLY_SALARY",
				"MONTHLY_SALARY",
				"WEEKLY_SALARY",
				"DAILY_SALARY",
				"HOURLY_WAGE",
			])
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
		jobDescription: yup.string().required(),
		responsibilities: yup.string().required(),
		qualifications: yup.string().required(),
	})
	.required();

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
