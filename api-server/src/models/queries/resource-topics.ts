import sql from "src/utils/sql-template";
import { simpleQuery, simpleQuery1 } from "src/connectors/postgresql";

import { ResourceTopic } from "src/models";

const attributes = sql.raw(
	['topic_name AS "topicName"', 'icon_image_url AS "iconImageURL"'].join(", ")
);

const baseQuery = sql`
	SELECT ${attributes} FROM resource_topics
`;

export async function getResourceTopic(
	topicName: string
): Promise<ResourceTopic | null> {
	return simpleQuery1(
		sql`
			${baseQuery}
			WHERE topic_name=${topicName}
		`
	);
}

export async function getResourceTopics(): Promise<ResourceTopic[]> {
	return simpleQuery(
		sql`
			${baseQuery}
			ORDER BY topic_name ASC
		`
	);
}