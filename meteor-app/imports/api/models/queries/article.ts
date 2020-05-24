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

const attributesArticleLikes = sql.raw(
	["user_id AS userId", "article_slug AS articleSlug"].join(", ")
);

const baseQuery = sql`
	SELECT ${attributes}
	FROM articles
`;

const baseQueryArticleLikes = sql`
	SELECT ${attributesArticleLikes}
	FROM article_likes
`;

export async function getArticleBySlug(slug: string): Promise<Article | null> {
	return simpleQuery1(sql`
		${baseQuery}
		WHERE slug=${slug}
	`);
}

export async function getNumArticleLikes(slug: string): Promise<number> {
	const count = await simpleQuery1<{ count: number }>(sql`
		SELECT count(user_id)
		FROM article_likes
		WHERE article_slug=${slug}
	`);
	return count ? count.count : 0;
}

export async function isArticleLikedByUser(
	slug: string,
	user: User
): Promise<boolean> {
	const isLiked = await simpleQuery1<{ isLiked: boolean }>(sql`
		SELECT exists
		(
			SELECT 1 FROM article_likes
			WHERE article_slug=${slug} AND user_id=${user.userId}
		)
	`);

	return isLiked.exists;
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

export async function searchForArticlesByTopic(
	topicName: string,
	searchText: string,
	pageNumber: number,
	pageSize: number
): Promise<{ nodes: Article[]; totalCount: number }> {
	return paginate<Article>(
		sql`
			${baseQuery}
			WHERE topic_name=${topicName}
			ORDER BY publish_date DESC
		`,
		pageNumber,
		pageSize
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
