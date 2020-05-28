import sql from "imports/lib/sql-template";
import { simpleQuery, simpleQuery1 } from "imports/api/connectors/postgresql";

import { ArticleTopic } from "imports/api/models";

const attributes = sql.raw(
	['topic_name AS "topicName"', 'icon_image_url AS "iconImageURL"'].join(", ")
);

const baseQuery = sql`
	SELECT ${attributes} FROM article_topics
`;

export async function getArticleTopic(
	topicName: string
): Promise<ArticleTopic | null> {
	return simpleQuery1(
		sql`
			${baseQuery}
			WHERE topic_name=${topicName}
		`
	);
}

export async function getArticleTopics(): Promise<ArticleTopic[]> {
	return simpleQuery(
		sql`
			${baseQuery}
			ORDER BY topic_name ASC
		`
	);
}
