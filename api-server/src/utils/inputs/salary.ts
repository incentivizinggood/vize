import * as yup from "yup";

import { LocationInput, locationInputSchema } from "./location";

export type CreateSalaryInput = {
	companyName: string;
	location: LocationInput;
	jobTitle: string;
	incomeType:
		| "YEARLY_SALARY"
		| "MONTHLY_SALARY"
		| "WEEKLY_SALARY"
		| "DAILY_SALARY"
		| "HOURLY_WAGE";
	incomeAmount: number;
	gender?: "MALE" | "FEMALE";
};

export const createSalaryInputSchema = yup
	.object({
		companyName: yup.string().required(),
		location: locationInputSchema,
		jobTitle: yup.string().required(),
		incomeType: yup
			.string()
			.oneOf([
				"YEARLY_SALARY",
				"MONTHLY_SALARY",
				"WEEKLY_SALARY",
				"DAILY_SALARY",
				"HOURLY_WAGE",
			])
			.required(),
		incomeAmount: yup
			.number()
			.min(0)
			.required(),
		gender: yup.string().oneOf(["MALE", "FEMALE"]),
	})
	.required();
