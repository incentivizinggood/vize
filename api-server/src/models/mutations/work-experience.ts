import * as yup from "yup";

export const workExperienceInputSchema = yup
	.object({
		jobTitle: yup.string().required(),
		companyName: yup.string().required(),
		city: yup.string().required(),
		startDateMonth: yup.string().required(),
		startDateYear: yup.number().required(),
		endDateMonth: yup.string(),
		endDateYear: yup.number(),
		experienceDescription: yup.string().required(),
	})
	.required();

// The actual creation of work experience is done by the objects that use them (user profile).
// For now this file only holds the input schema.
