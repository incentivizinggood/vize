import * as yup from "yup";

export const locationInputSchema = yup
	.object({
		city: yup.string().required(),
		address: yup.string().required(),
		industrialHub: yup.string(),
	})
	.required();
