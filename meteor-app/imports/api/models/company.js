// @flow
import type { ID, Location } from "./common.js";

import PgCompanyFunctions from "./helpers/postgresql/companies.js";
import PostgreSQL from "../graphql/connectors/postgresql.js";
import { CompanySchema } from "../data/companies.js";

const defaultPageSize = 100;

export type Company = {
	_id: ID,
	name: string,

	contactEmail: string,
	yearEstablished: ?number,
	numEmployees: ?(
		| "1 - 50"
		| "51 - 500"
		| "501 - 2000"
		| "2001 - 5000"
		| "5000+"
	),
	industry: ?string,
	locations: [Location],
	contactPhoneNumber: ?string,
	websiteURL: ?string,
	descriptionOfCompany: ?string,
	dateJoined: ?Date,
	numFlags: ?number,

	healthAndSafety: ?number,
	managerRelationship: ?number,
	workEnvironment: ?number,
	benefits: ?number,
	overallSatisfaction: ?number,

	numReviews: number,
	percentRecommended: ?number,
	avgNumMonthsWorked: ?number,
};

// Get the company with a given id.
export async function getCompanyById(id: ID): Promise<?Company> {
	// id is a string for now, and company id's
	// are integers, so I think this should be fine
	// for now
	if (!Number.isNaN(Number(id)))
		return PgCompanyFunctions.processCompanyResults(
			await PostgreSQL.executeQuery(
				PgCompanyFunctions.getCompanyById,
				Number(id)
			)
		);
	return undefined;
}

// Get the company with a given name.
export async function getCompanyByName(name: string): Promise<Company> {
	return PgCompanyFunctions.processCompanyResults(
		await PostgreSQL.executeQuery(PgCompanyFunctions.getCompanyByName, name)
	);
}

// Get all of the companies.
export async function getAllCompanies(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[Company]> {
	return PgCompanyFunctions.processCompanyResults(
		await PostgreSQL.executeQuery(
			PgCompanyFunctions.getAllCompanies,
			pageNumber * pageSize,
			pageSize
		)
	);
}

// return all companies whose name
// contains the given search text
export async function searchForCompanies(
	searchText: string,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<[Company]> {
	return PgCompanyFunctions.processCompanyResults(
		await PostgreSQL.executeQuery(
			PgCompanyFunctions.companyNameRegexSearch,
			searchText,
			pageNumber * pageSize,
			pageSize
		)
	);
}

export function isCompany(obj: any): boolean {
	// CompanySchema
	// 	.newContext()
	// 	.validate(obj);
	const context = CompanySchema.newContext();
	context.validate(obj);
	return context.isValid();
}

export async function createCompany(companyParams: mixed): Company {
	throw new Error("Not implemented yet");
}

export async function editCompany(id: ID, companyChanges: mixed): Company {
	throw new Error("Not implemented yet");
}

export async function deleteCompany(id: ID): Company {
	throw new Error("Not implemented yet");
}
