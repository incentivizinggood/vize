// This file is for all of the model code that
// didn't make sense to put into the other files.

import sql, { SqlStatement } from "src/utils/sql-template";
import { simpleQuery } from "src/connectors/postgresql";

/**
 * Convert a simple query to a paginated one.
 * @param originalQuery The query to wrap.
 * @param pageNumber The number (index) of the page to return. The first page is 0.
 * @param pageSize The number of nodes on each page.
 * @return One page of results and the total number of results that the originalQuery returns.
 */
export async function paginate<NodeT extends Record<string, unknown>>(
	originalQuery: SqlStatement,
	pageNumber: number,
	pageSize: number
): Promise<{ nodes: NodeT[]; totalCount: number }> {
	return simpleQuery<NodeT & { totalCount: number }>(
		sql`
			SELECT *, COUNT(*) OVER() AS "totalCount"
			FROM (${originalQuery}) AS unpaged_results
			OFFSET ${pageNumber * pageSize}
			LIMIT ${pageSize}
		`
	).then(results => ({
		// Remove the totalCount column because it is not part of the nodes.
		nodes: results.map(
			({ totalCount: _totalCount, ...rest }) => (rest as unknown) as NodeT
		),
		// Extract the totalCount from the results.
		// If there are no results, it's 0.
		totalCount: results.length === 0 ? 0 : results[0].totalCount,
	}));
}
