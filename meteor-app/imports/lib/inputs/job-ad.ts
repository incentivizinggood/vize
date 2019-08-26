import * as yup from "yup";

import LocationInput from "./location";

type CreateJobAdInput = {
	jobTitle: string;
	locations: LocationInput[];
	pesosPerHour: number;
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
		pesosPerHour: yup
			.number()
			.min(0)
			.required(),
		contractType: yup
			.mixed()
			.oneOf(["FULL_TIME", "PART_TIME", "CONTRACTOR"])
			.required(),
		jobDescription: yup.string().required(),
		responsibilities: yup.string().required(),
		qualifications: yup.string().required(),
	});

	export type ContractType = "FULL_TIME" | "PART_TIME" | "CONTRACTOR";
}

export default CreateJobAdInput;
