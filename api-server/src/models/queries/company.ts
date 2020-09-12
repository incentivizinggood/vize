import sql from "src/utils/sql-template";
import { simpleQuery1 } from "src/connectors/postgresql";

import { Company } from "src/models";
import { paginate } from "src/models/misc";

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
	].join(", ")
);

const baseQuery = sql`
	SELECT ${attributes}
	FROM companies
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
	const jobAdCounts = sql`
			select
				companyname,
				count(*) as total
			from jobads j
			group by companyname
		`;
	const reviewCounts = sql`
			select
				companyname,
				count(*) as total
			from reviews r
			group by companyname
		`;
	const salaryCounts = sql`
			select
				companyname,
				count(*) as total
			from salaries s
			group by companyname
		`;

	// TODO: When PostgreSQL is upgraded to version 12 use websearch_to_tsquery instead of plainto_tsquery.
	// websearch_to_tsquery is better, but only available in version 12 and up.
	return paginate<Company>(
		sql`
			${baseQuery}
			left join (${jobAdCounts}) jc on jc.companyname = companies.name
			left join (${reviewCounts}) rc on rc.companyname = companies.name
			left join (${salaryCounts}) sc on sc.companyname = companies.name
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
			ORDER BY (
					coalesce(jc.total, 0) * 10 +
					coalesce(rc.total, 0) * 1.5 +
					coalesce(sc.total, 0)
				) desc
		`,
		pageNumber,
		pageSize
	);
}
