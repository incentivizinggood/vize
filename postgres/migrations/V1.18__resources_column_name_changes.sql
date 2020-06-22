-- Rename table columns because we are changing the naming of "articles" to "resources"
ALTER TABLE resource_authors
RENAME COLUMN author_id TO resource_id;

ALTER TABLE resource_authors
RENAME COLUMN author_name TO resource_name;

ALTER TABLE resource_authors
RENAME COLUMN author_company_name TO resource_company_name;

ALTER TABLE resource_authors
RENAME COLUMN author_image_url TO resource_image_url;

ALTER TABLE resource_authors
RENAME COLUMN author_bio TO resource_bio;



ALTER TABLE resources
RENAME COLUMN article_image_url TO resource_image_url;

ALTER TABLE resources
RENAME COLUMN author_id TO resource_id;



ALTER TABLE resource_likes
RENAME COLUMN article_slug TO resource_slug;
