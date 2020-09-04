import sql from "src/utils/sql-template";
import { simpleQuery1 } from "src/connectors/postgresql";

import { Company } from "src/models";
import { paginate } from "src/models/misc";

const companyReviewStatistics = sql`
SELECT
    companyname AS name,
    count(*) AS numreviews,
    avg(nummonthsworked) AS avgnummonthsworked,
    avg(wouldrecommend::integer) AS percentrecommended,
    avg(healthandsafety) AS healthandsafety,
    avg(managerrelationship) AS managerrelationship,
    avg(workenvironment) AS workenvironment,
    avg(benefits) AS benefits,
    avg(overallsatisfaction) AS overallsatisfaction
FROM reviews
GROUP BY companyname
`;

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
	FROM companies NATURAL LEFT JOIN (${companyReviewStatistics}) rs
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
			${
				searchText
					? sql`
			WHERE
				(
					to_tsvector('spanish', coalesce(name, '')) ||
					to_tsvector('spanish', coalesce(industry, '')) ||
					to_tsvector('spanish', coalesce(descriptionOfCompany, ''))
				) @@ plainto_tsquery('spanish', ${searchText})`
					: sql``
			}
			ORDER BY
				(
					select count(*)
					from jobads
					where jobads.companyname = companies.name
				) * 10 + (
					select count(*)
					from reviews
					where reviews.companyname = companies.name
				) * 1.5 + (
					select count(*)
					from salaries
					where salaries.companyname = companies.name
				)
				desc
		`,
		pageNumber,
		pageSize
	);
}
