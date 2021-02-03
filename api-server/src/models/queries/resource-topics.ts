import sql from "src/utils/sql-template";
import { simpleQuery, simpleQuery1 } from "src/connectors/postgresql";

import { ResourceTopic } from "src/models";

const attributes = sql.raw(
	[
		'topic_name AS "topicName"', 
		'icon_image_url AS "iconImageURL"',
		'audience_type AS "audienceType"'
	].join(", ")
);

const baseQuery = sql`
	SELECT ${attributes} FROM resource_topics
`;

export async function getResourceTopic(
	topicName: string,
	audienceType: string
): Promise<ResourceTopic | null> {
	return simpleQuery1(
		sql`
			${baseQuery}
			WHERE topic_name=${topicName} AND (audience_type=${audienceType} OR audience_type='ALL')
		`
	);
}

export async function getResourceTopics(
	audienceType: string
): Promise<ResourceTopic[]> {
	return simpleQuery(
		sql`
			${baseQuery}
			WHERE audience_type=${audienceType} OR audience_type='ALL'
			ORDER BY topic_name ASC
		`
	);
}
