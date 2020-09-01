import * as yup from "yup";

export const locationInputSchema = yup
	.object({
		city: yup.string().required(),
		address: yup.string().required(),
		industrialHub: yup.string(),
	})
	.required();

// The actual creation of locations is done by the objects that use them.
// For now this file only holds the input schema.
