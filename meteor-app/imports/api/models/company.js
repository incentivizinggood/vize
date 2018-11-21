// @flow
import { CompanySchema } from "/imports/api/data/companies.js";

import type { CompanyId } from ".";

type CompanyData = {
	companyid: CompanyId,
	name: string,
	dateadded: Date,
	yearestablished: number,
	industry: string,
	descriptionofcompany: string,
	numemployees:
		| null
		| "1 - 50"
		| "51 - 500"
		| "501 - 2000"
		| "2001 - 5000"
		| "5000+",
	contactemail: string,
	websiteurl: string,
	contactphonenumber: string,
	numflags: number,
};

// TODO: separate the review stats into a separate  graphql type so that we do
// not have to do this weird joining.
type ReviewStatsData = {
	name: string,
	numreviews: number,
	avgnummonthsworked: number,
	percentrecommended: number,
	healthandsafety: number,
	managerrelationship: number,
	workenvironment: number,
	benefits: number,
	overallsatisfaction: number,
};

export type Company = CompanyData & ReviewStatsData;

// Determine if obj is a valid company. This is used for both data
// validation/sanity checking and to discriminate between other types in unions.
export function isCompany(obj: any): boolean {
	// CompanySchema
	// 	.newContext()
	// 	.validate(obj);
	const context = CompanySchema.newContext();
	context.validate(obj);
	return context.isValid();
}
