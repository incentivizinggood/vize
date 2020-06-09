-- Resource Authors Table
DROP TABLE IF EXISTS resource_authors CASCADE;
CREATE TABLE resource_authors (
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

COMMENT ON COLUMN resource_authors.author_image_url IS
	'This can either be an image of the author or of the company logo';

COMMENT ON COLUMN resource_authors.website_url IS
	'The website URL can reference where people can find more information about the author, the company, or the benefits mentioned in the resource';


-- Resource Topics Table
DROP TABLE IF EXISTS resource_topics CASCADE;
CREATE TABLE resource_topics (
	topic_name text PRIMARY KEY,
	icon_image_URL text NOT NULL
);

COMMENT ON COLUMN resource_topics.topic_name IS
	'The name of the resource topic';

COMMENT ON COLUMN resource_topics.icon_image_URL IS
	'The URL of the icon used for the resource topic';


-- Resources Table
DROP TABLE IF EXISTS resources CASCADE;
CREATE TABLE resources (
	slug text PRIMARY KEY,
	title text NOT NULL,
	subtitle text,
	body text NOT NULL,
	resource_image_url text NOT NULL,
	topic_name text
		REFERENCES resource_topics (topic_name)
			ON UPDATE CASCADE
			ON DELETE SET NULL,
	author_id INTEGER
		REFERENCES resource_authors (author_id)
			ON UPDATE CASCADE
			ON DELETE SET NULL,
	is_highlighted boolean NOT NULL DEFAULT FALSE,
	publish_date timestamp NOT NULL DEFAULT now()
);

COMMENT ON COLUMN resources.slug IS
	'The last part of the URL for viewing the resource';

COMMENT ON COLUMN resources.body IS
	'The body of the resource formatted with Markdown';

COMMENT ON COLUMN resources.resource_image_url IS
	'The image that is displayed in the resource';

COMMENT ON COLUMN resources.topic_name IS
	'The name of the topic (category) that this resource falls under';

COMMENT ON COLUMN resources.publish_date IS
	'The date and time that an resource was or will be published';
