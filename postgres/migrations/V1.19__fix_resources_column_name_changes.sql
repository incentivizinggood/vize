-- Named coulmns incorrectly and accientally deployed to staging instead of testing first
ALTER TABLE resource_authors
RENAME COLUMN resource_id TO author_id;

ALTER TABLE resource_authors
RENAME COLUMN resource_name TO author_name;

ALTER TABLE resource_authors
RENAME COLUMN resource_company_name TO author_company_name;

ALTER TABLE resource_authors
RENAME COLUMN resource_image_url TO author_image_url;

ALTER TABLE resource_authors
RENAME COLUMN resource_bio TO author_bio;



ALTER TABLE resources
RENAME COLUMN resource_id TO author_id;
