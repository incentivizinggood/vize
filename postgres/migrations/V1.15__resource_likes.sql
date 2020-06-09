-- Resource Likes Table
-- If a user has liked the resource, then the entry will be created in the Table
-- If the user unlikes the resource, then the entry will be removed from the Table
DROP TABLE IF EXISTS resource_likes CASCADE;
CREATE TABLE resource_likes (
	user_id int NOT NULL,
	resource_slug text NOT NULL,
	date_added date DEFAULT now(),
	PRIMARY KEY (user_id, resource_slug)
);
