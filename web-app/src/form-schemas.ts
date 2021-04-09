import * as yup from "yup";

/*
 * These are schemas for validating user input on the client side.
 */

export const username = yup
	.string()
	.trim()
	.min(1)
	.max(32);

export const password = yup
	.string()
	.min(1)
	.max(256);

export const companyName = yup
	.string()
	.trim()
	.min(1)
	.max(100);

export const locationSchema = yup.object().shape({
	city: yup
		.string()
		.max(300)
		.required("Se requiere la ciudad"),
	address: yup
		.string()
		.max(300)
		.required("Se requiere la dirección"),
	industrialHub: yup.string().max(300),
});

export const workExperienceSchema = yup.object().shape({
	jobTitle: yup.string().required(),
	companyName: yup.string().required(),
	city: yup.string().required(),
	startDateMonth: yup.string().required(),
	startDateYear: yup.number().required(),
	endDateMonth: yup.string(),
	endDateYear: yup.number(),
	description: yup.string().required(),
});
