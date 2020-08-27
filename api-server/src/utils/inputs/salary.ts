import * as yup from "yup";

import { locationInputSchema } from "./location";

export const createSalaryInputSchema = yup
	.object({
		companyName: yup.string().required(),
		location: locationInputSchema,
		jobTitle: yup.string().required(),
		incomeType: yup
			.string()
			.oneOf([
				"Yearly Salary",
				"Monthly Salary",
				"Weekly Salary",
				"Daily Salary",
				"Hourly Wage",
			])
			.required(),
		incomeAmount: yup
			.number()
			.min(0)
			.required(),
		gender: yup.string().oneOf(["Male", "Female"]),
	})
	.required();
