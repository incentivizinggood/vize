import { CompanyId } from "imports/api/models";

export type Company = {
	companyId: CompanyId;
	name: string;
	dateAdded: Date;
	yearEstablished: number;
	industry: string;
	descriptionOfCompany: string;
	numEmployees:
		| null
		| "1 - 50"
		| "51 - 500"
		| "501 - 2000"
		| "2001 - 5000"
		| "5000+";
	contactEmail: string;
	websiteURL: string;
	contactPhoneNumber: string;
	numFlags: number;
	// TODO: Separate the review stats into a separate graphql type so that we
	// do not have to join on every company query.
	numReviews: number;
	avgNumMonthsWorked: number;
	percentRecommended: number;
	healthAndSafety: number;
	managerRelationship: number;
	workEnvironment: number;
	benefits: number;
	overallSatisfaction: number;
};
