import sql, { SqlStatement } from "src/utils/sql-template";
import { simpleQuery1, simpleQuery } from "src/connectors/postgresql";

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

/** For use in inputs to PostgreSQL's to_tsquery. */
function escapeTsqueryTerm(term: string): string {
	return `'${term.replace("'", "''")}'`;
}

async function autocompleteSuggestions(
	sourceQuery: SqlStatement,
	columnName: string,
	partialUserInput: string
): Promise<string[]> {
	/**
	 * Words that end before the end of the string.
	 * The user has finished typing these.
	 */
	const finishedWords = partialUserInput.match(/\w+\b(?!$)/g) || [];

	/**
	 * Words that end at the end of the string.
	 * The user may not have finished typing these.
	 */
	const unfinishedWords = partialUserInput.match(/\w+$/g) || [];

	if (finishedWords.length + unfinishedWords.length < 1) {
		// The user has not typed enough to make any suggestions.
		return [];
	}

	const tsquery = [
		...finishedWords.map(escapeTsqueryTerm),
		...unfinishedWords.map(x => escapeTsqueryTerm(x) + ":*"),
	].join(" & ");

	const results = await simpleQuery<any>(sql`
		SELECT
			${sql.raw(columnName)}
		FROM
			(${sourceQuery}) suggestions,
			to_tsquery(${tsquery}) query,
			to_tsvector(${sql.raw(columnName)}) search_vector,
			ts_rank(search_vector, query) rank
		WHERE query @@ search_vector
		-- Sometimes suggestions can have the same rank.
		-- So also order by the suggestions to ensure consistent ordering.
		ORDER BY rank DESC, ${sql.raw(columnName)} ASC
		LIMIT 10;
	`);

	return results.map(x => x[columnName]);
}

/** Get autocomplete suggestions for company names. */
export async function companyNameSuggestions(
	partialCompanyName: string,
	onlyCompaniesWithProfiles?: boolean | null
): Promise<string[]> {
	return autocompleteSuggestions(
		sql`
			SELECT name AS company_name FROM companies
			${
				onlyCompaniesWithProfiles
					? sql``
					: sql.raw(`
			UNION
			SELECT companyname AS company_name FROM jobads
			UNION
			SELECT companyname AS company_name FROM reviews
			UNION
			SELECT companyname AS company_name FROM salaries
							`)
			}
		`,
		"company_name",
		partialCompanyName
	);
}

/** Get autocomplete suggestions for job titles. */
export async function jobTitleSuggestions(
	partialJobTitle: string
): Promise<string[]> {
	return autocompleteSuggestions(
		sql`
			SELECT jobtitle AS job_title FROM jobads
			UNION
			SELECT jobtitle AS job_title FROM reviews
			UNION
			SELECT jobtitle AS job_title FROM salaries
		`,
		"job_title",
		partialJobTitle
	);
}
