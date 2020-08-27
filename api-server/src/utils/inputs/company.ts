import * as yup from "yup";

import { locationInputSchema } from "./location";

export const createCompanyInputSchema = yup
	.object({
		name: yup.string().required(),
		contactEmail: yup
			.string()
			.email()
			.required(),
		yearEstablished: yup.number(),
		numEmployees: yup
			.string()
			.oneOf([
				"1 - 50",
				"51 - 500",
				"501 - 2000",
				"2001 - 5000",
				"5000+",
			]),
		industry: yup.string(),
		locations: yup
			.array()
			.required()
			.min(1)
			.of(locationInputSchema),
		contactPhoneNumber: yup.string(),
		websiteURL: yup.string().url(),
		descriptionOfCompany: yup.string(),
	})
	.required();
