-- Article Authors Table
DROP TABLE IF EXISTS article_authors CASCADE;
CREATE TABLE article_authors (
	author_id serial PRIMARY KEY,
	author_name VARCHAR(40),
	author_company_name VARCHAR(40),
	author_image_url text,
	author_bio text,
	contact_phone_number VARCHAR(16),
	contact_email text,
	website_url text,
	location text
);

COMMENT ON COLUMN article_authors.author_image_url IS
	'This can either be an image of the author or of the company logo';

COMMENT ON COLUMN article_authors.website_url IS
	'The website URL can reference where people can find more information about the author, the company, or the benefits mentioned in the article';


-- Articles Table
DROP TABLE IF EXISTS articles CASCADE;
CREATE TABLE articles (
	slug text PRIMARY KEY,
	title text NOT NULL,
	subtitle text,
	body text NOT NULL,
	article_image_url text NOT NULL,
	topic_name text
		UNIQUE
		REFERENCES article_topics (topic_name)
			ON UPDATE CASCADE
			ON DELETE SET NULL,
	author_id INTEGER
		UNIQUE
		REFERENCES article_authors (author_id)
			ON UPDATE CASCADE
			ON DELETE SET NULL,
	is_highlighted boolean NOT NULL DEFAULT FALSE,
	publish_date timestamp NOT NULL DEFAULT now()
);

COMMENT ON COLUMN articles.slug IS
	'The last part of the URL for viewing the article';

COMMENT ON COLUMN articles.body IS
	'The body of the article formatted with Markdown';

COMMENT ON COLUMN articles.article_image_url IS
	'The image that is displayed in the article';

COMMENT ON COLUMN articles.topic_name IS
	'The name of the topic (category) that this article falls under';

COMMENT ON COLUMN articles.publish_date IS
	'The date and time that an article was or will be published';


-- Article Topics Table
DROP TABLE IF EXISTS article_topics CASCADE;
CREATE TABLE article_topics (
	topic_name text PRIMARY KEY,
	icon_image_URL text NOT NULL
);

COMMENT ON COLUMN article_topics.topic_name IS
	'The name of the article topic';

COMMENT ON COLUMN article_topics.icon_image_URL IS
	'The URL of the icon used for the article topic';
