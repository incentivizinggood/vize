import sql from "imports/lib/sql-template";
import { simpleQuery1 } from "imports/api/connectors/postgresql";

import { Article } from "imports/api/models";

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

/*
Not supporting this yet. This is still in the minimum viable product stage.

export async function getAllArticles(
	pageNumber: number,
	pageSize: number
): Promise<Article[]> {
	return simpleQuery(sql`
		${baseQuery}
		OFFSET ${pageNumber * pageSize}
		LIMIT ${pageSize}
	`);
}
*/
