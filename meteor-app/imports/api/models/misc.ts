// This file is for all of the model code that
// didn't make sence to put into the other files.

import sql, { SqlStatement } from "imports/lib/sql-template";
import { simpleQuery } from "imports/api/connectors/postgresql";

export type MongoId = string;
export type PgId = number;

export type StarRatings = {
	healthAndSafety: number;
	managerRelationship: number;
	workEnvironment: number;
	benefits: number;
	overallSatisfaction: number;
};

/** A way of getting nominal type checking in Typescript */
export type Branded<T, B> = T & { __brand: B };

/**
 * Convert a simple query to a paginated one.
 * @param originalQuery The query to wrap.
 * @param pageNumber The number (index) of the page to return. The first page is 0.
 * @param pageSize The number of nodes on each page.
 * @return One page of results and the total number of results that the originalQuery returns.
 */
export async function paginate<NodeT extends {}>(
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
			({ totalCount, ...rest }) => (rest as unknown) as NodeT
		),
		// Extract the totalCount from the results.
		// If there are no results, it's 0.
		totalCount: results.length === 0 ? 0 : results[0].totalCount,
	}));
}
