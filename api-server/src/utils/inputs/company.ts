import * as yup from "yup";

import LocationInput from "./location";

type CreateCompanyInput = {
	name: string;
	contactEmail: string;
	yearEstablished?: number | null;
	numEmployees?: CreateCompanyInput.NumEmployees | null;
	industry?: string | null;
	locations: LocationInput[];
	contactPhoneNumber?: string | null;
	websiteURL?: string | null;
	descriptionOfCompany?: string | null;
};

namespace CreateCompanyInput {
	export const schema = yup
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
				.of(LocationInput.schema),
			contactPhoneNumber: yup.string(),
			websiteURL: yup.string().url(),
			descriptionOfCompany: yup.string(),
		})
		.required();

	export type NumEmployees =
		| "1 - 50"
		| "51 - 500"
		| "501 - 2000"
		| "2001 - 5000"
		| "5000+";

	export enum NumEmployeesE {
		Tiny = "1 - 50",
		Small = "51 - 500",
		Medium = "501 - 2000",
		Large = "2001 - 5000",
		Huge = "5000+",
	}
}

export default CreateCompanyInput;
