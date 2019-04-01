import * as yup from "yup";

import LocationInput from "./location";

type CompanyInput = {
	name: string;
	contactEmail: string;
	yearEstablished?: number;
	numEmployees?: CompanyInput.NumEmployees;
	industry?: string;
	locations: LocationInput[];
	contactPhoneNumber?: string;
	websiteURL?: string;
	descriptionOfCompany?: string;
};

namespace CompanyInput {
	export const schema = yup.object().shape({
		name: yup.string().required(),
		contactEmail: yup
			.string()
			.email()
			.required(),
		yearEstablished: yup.number(),
		numEmployees: yup
			.mixed()
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
	});

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

export default CompanyInput;
