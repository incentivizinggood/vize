import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";

import { Article, paginate } from "imports/api/models";

const attributes = sql.raw(
	["slug", "title", "body", 'publish_date AS "publishDate"'].join(", ")
);

const baseQuery = sql`
	SELECT ${attributes}
	FROM articles
`;

export async function getArticleBySlug(slug: string): Promise<Article | null> {
	return simpleQuery1(sql`
		${baseQuery}
		WHERE slug=${slug}
	`);
}

/**
 * This is not yet an actual search. It is only implemented
 * to list all articles on the index page.
 */
export async function searchForArticles(
	searchText: string,
	pageNumber: number,
	pageSize: number
): Promise<{ nodes: Article[]; totalCount: number }> {
	return paginate<Article>(
		sql`
			${baseQuery}
			ORDER BY publish_date DESC
		`,
		pageNumber,
		pageSize
	);
}
