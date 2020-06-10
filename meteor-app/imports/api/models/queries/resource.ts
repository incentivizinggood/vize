import sql from "imports/lib/sql-template";
import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import { Resource, paginate } from "imports/api/models";

const attributes = sql.raw(
	[
		"slug",
		"title",
		"subtitle",
		"body",
		'resource_image_url AS "resourceImageURL"',
		'topic_name AS "topicName"',
		'author_id AS "authorId"',
		'is_highlighted AS "isHighlighted"',
		'publish_date AS "publishDate"',
	].join(", ")
);

const attributesResourceLikes = sql.raw(
	["user_id AS userId", "resource_slug AS resourceSlug"].join(", ")
);

const baseQuery = sql`
	SELECT ${attributes}
	FROM resources
`;

const baseQueryResourceLikes = sql`
	SELECT ${attributesResourceLikes}
	FROM resource_likes
`;

export async function getResourceBySlug(
	slug: string
): Promise<Resource | null> {
	return simpleQuery1(sql`
		${baseQuery}
		WHERE slug=${slug}
	`);
}

export async function getNumResourceLikes(slug: string): Promise<number> {
	const count = await simpleQuery1<{ count: number }>(sql`
		SELECT count(user_id)
		FROM resource_likes
		WHERE resource_slug=${slug}
	`);
	return count ? count.count : 0;
}

export async function isResourceLikedByUser(
	slug: string,
	user: User
): Promise<boolean> {
	const isLiked = await simpleQuery1<{ isLiked: boolean }>(sql`
		SELECT exists
		(
			SELECT 1 FROM resource_likes
			WHERE resource_slug=${slug} AND user_id=${user.userId}
		)
	`);

	return isLiked.exists;
}

export async function getHighlightedResources(): Promise<Resource[] | null> {
	return simpleQuery<Resource>(
		sql`
			${baseQuery}
			WHERE is_highlighted=TRUE
			ORDER BY publish_date DESC
			LIMIT 4
		`
	);
}

export async function searchForResourcesByTopic(
	topicName: string,
	searchText: string,
	pageNumber: number,
	pageSize: number
): Promise<{ nodes: Resource[]; totalCount: number }> {
	return paginate<Resource>(
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
 * to list all resources on the index page.
 */
export async function searchForRecentResources(
	searchText: string,
	pageNumber: number,
	pageSize: number
): Promise<{ nodes: Resource[]; totalCount: number }> {
	return paginate<Resource>(
		sql`
			${baseQuery}
			ORDER BY publish_date DESC
		`,
		pageNumber,
		pageSize
	);
}