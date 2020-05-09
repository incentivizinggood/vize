CREATE TABLE articles (
	slug text PRIMARY KEY,
	title text NOT NULL,
	body text NOT NULL,
	publish_date timestamp NOT NULL DEFAULT now()
);

COMMENT ON COLUMN articles.slug IS
	'The last part of the URL for viewing the article';

COMMENT ON COLUMN articles.body IS
	'The body of the article formatted with Markdown';

COMMENT ON COLUMN articles.publish_date IS
	'The date and time that an article was or will be published';
