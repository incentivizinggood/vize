CREATE TABLE article_topics (
	topic_name text PRIMARY KEY,
	icon_image_URL text NOT NULL
);

COMMENT ON COLUMN article_topics.topic_name IS
	'The name of the article topic';

COMMENT ON COLUMN article_topics.icon_image_URL IS
	'The URL of the icon used for the article topic';
