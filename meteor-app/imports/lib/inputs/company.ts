import LocationInput from "./location";

type CompanyInput = {
	name: string;
	contactEmail: string;
	yearEstablished?: number;
	numEmployees?: CompanyInput.NumEmployees;
	industry?: string;
	locations: [LocationInput];
	contactPhoneNumber?: string;
	websiteURL?: string;
	descriptionOfCompany?: string;
};

declare namespace CompanyInput {
	const schema = 0;

	type NumEmployees =
		| "1 - 50"
		| "51 - 500"
		| "501 - 2000"
		| "2001 - 5000"
		| "5000+";
}

export default CompanyInput;
