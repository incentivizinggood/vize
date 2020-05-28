import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";

import { Company } from "imports/api/models";
import { paginate } from "imports/api/models/misc";

const attributes = sql.raw(
	[
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
	].join(", ")
);

const baseQuery = sql`
	SELECT ${attributes}
	FROM companies NATURAL JOIN company_review_statistics
`;

// Get the company with a given id.
export async function getCompanyById(id: number): Promise<Company | null> {
	return simpleQuery1(sql`${baseQuery} WHERE companyid=${id}`);
}

// Get the company with a given name.
export async function getCompanyByName(name: string): Promise<Company | null> {
	return simpleQuery1(sql`${baseQuery} WHERE name=${name}`);
}

// return all companies whose name
// contains the given search text
export async function searchForCompanies(
	searchText: string,
	pageNumber: number,
	pageSize: number
): Promise<{ nodes: Company[]; totalCount: number }> {
	// TODO: When PostgreSQL is upgraded to version 12 use websearch_to_tsquery instead of plainto_tsquery.
	// websearch_to_tsquery is better, but only available in version 12 and up.
	return paginate<Company>(
		sql`
			${baseQuery}
				JOIN job_post_counts ON companies.name = job_post_counts.companyname
				JOIN salary_counts ON companies.name = salary_counts.companyname
			WHERE
				(
					to_tsvector('spanish', coalesce(name, '')) ||
					to_tsvector('spanish', coalesce(industry, '')) ||
					to_tsvector('spanish', coalesce(descriptionOfCompany, ''))
				) @@ plainto_tsquery('spanish', ${searchText})
			ORDER BY job_post_counts.count*10 + numreviews*1.5 + salary_counts.count DESC
		`,
		pageNumber,
		pageSize
	);
}
