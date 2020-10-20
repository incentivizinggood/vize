import sql, { SqlStatement } from "src/utils/sql-template";
import { simpleQuery } from "src/connectors/postgresql";

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
