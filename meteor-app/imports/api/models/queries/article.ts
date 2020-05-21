import sql from "imports/lib/sql-template";
import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import { Article, paginate } from "imports/api/models";

const attributes = sql.raw(
	[
		"slug",
		"title",
		"subtitle",
		"body",
		'article_image_url AS "articleImageURL"',
		'topic_name AS "topicName"',
		'author_id AS "authorId"',
		'is_highlighted AS "isHighlighted"',
		'publish_date AS "publishDate"',
	].join(", ")
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

export async function getHighlightedArticles(): Promise<Article[] | null> {
	return simpleQuery<Article>(
		sql`
			${baseQuery}
			WHERE is_highlighted=TRUE
			ORDER BY publish_date DESC
			LIMIT 4
		`
	);
}

/**
 * This is not yet an actual search. It is only implemented
 * to list all articles on the index page.
 */
export async function searchForRecentArticles(
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