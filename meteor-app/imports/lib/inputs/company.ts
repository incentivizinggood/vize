import LocationInput from "./location";

type CompanyInput = {
	name: string;
	yearEstablished: number;
	industry: string;
	descriptionOfCompany: string;
	numEmployees?: CompanyInput.NumEmployees;

	contactEmail: string;
	websiteURL: string;
	contactPhoneNumber: string;
	locations: LocationInput;
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
