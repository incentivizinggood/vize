-- Article Likes Table
-- If a user has liked the article, then the entry will be created in the Table
-- If the user unlikes the article, then the entry will be removed from the Table
DROP TABLE IF EXISTS article_likes CASCADE;
CREATE TABLE article_likes (
	user_id int NOT NULL,
	article_slug text NOT NULL,
	date_added date DEFAULT now(),
	PRIMARY KEY (user_id, article_slug)
);
