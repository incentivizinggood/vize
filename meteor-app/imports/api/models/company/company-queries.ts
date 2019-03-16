import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import { CompanyId, Company } from "imports/api/models";

const defaultPageSize = 100;

const attributes = [
	'companyid AS "companyId"',
	"name",
	'dateadded AS "dateAdded"',
	'yearestablished AS "yearEstablished"',
	"industry",
	'descriptionofcompany AS "descriptionOfCompany"',
	'numemployees AS "numEmployees"',
	'contactemail AS "contactEmail"',
	'websiteurl AS "websiteURL"',
	'contactphonenumber AS "contactPhoneNumber"',
	'numflags AS "numFlags"',
	'numreviews AS "numReviews"',
	'avgnummonthsworked AS "avgNumMonthsWorked"',
	'percentrecommended AS "percentRecommended"',
	'healthandsafety AS "healthAndSafety"',
	'managerrelationship AS "managerRelationship"',
	'workenvironment AS "workEnvironment"',
	"benefits",
	'overallsatisfaction AS "overallSatisfaction"',
];
const baseQuery = `SELECT ${attributes.join(
	", "
)} FROM companies NATURAL JOIN company_review_statistics`;

// Get the company with a given id.
export async function getCompanyById(id: CompanyId): Promise<Company | null> {
	// id is a string for now, and company id's
	// are integers, so I think this should be fine
	// for now
	if (Number.isNaN(Number(id))) throw Error("not a valid company id");

	return simpleQuery1(`${baseQuery} WHERE companyid=$1`, Number(id));
}

// Get the company with a given name.
export async function getCompanyByName(name: string): Promise<Company | null> {
	return simpleQuery1(`${baseQuery} WHERE name=$1`, name);
}

// Get all of the companies.
export async function getAllCompanies(
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Company[]> {
	return simpleQuery(
		`${baseQuery} OFFSET $1 LIMIT $2`,
		pageNumber * pageSize,
		pageSize
	);
}

// return all companies whose name
// contains the given search text
export async function searchForCompanies(
	searchText: string,
	pageNumber: number = 0,
	pageSize: number = defaultPageSize
): Promise<Company[]> {
	return simpleQuery(
		`${baseQuery} WHERE name LIKE $1 OFFSET $2 LIMIT $3`,
		"%" + searchText + "%",
		pageNumber * pageSize,
		pageSize
	);
}
