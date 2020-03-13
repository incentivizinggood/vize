import * as yup from "yup";

import LocationInput from "./location";

type CreateJobAdInput = {
	jobTitle: string;
	locations: LocationInput[];
	pesosPerHour: string;
	contractType: CreateJobAdInput.ContractType;
	jobDescription: string;
	responsibilities: string;
	qualifications: string;
};

namespace CreateJobAdInput {
	export const schema = yup.object({
		jobTitle: yup.string().required(),
		locations: yup
			.array()
			.required()
			.min(1)
			.of(LocationInput.schema),
		pesosPerHour: yup.string().required(),
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
		jobDescription: yup.string().required(),
		responsibilities: yup.string().required(),
		qualifications: yup.string().required(),
	});

	export type ContractType =
		| "FULL_TIME"
		| "PART_TIME"
		| "INTERNSHIP"
		| "TEMPORARY"
		| "CONTRACTOR";
}

type CreateApplyToJobAdInput = {
	jobAdId: string;
	fullName: string;
	email: string;
	phoneNumber: string;
	coverLetter?: string | null;
};

namespace CreateApplyToJobAdInput {
	export const schema = yup.object({
		jobAdId: yup.string().required(),
		fullName: yup.string().required(),
		email: yup
			.string()
			.email()
			.required(),
		phoneNumber: yup.string().required(),
		coverLetter: yup.string(),
	});
}

export { CreateJobAdInput, CreateApplyToJobAdInput };
