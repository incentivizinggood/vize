
-- Rename tables because we are changing the naming of "articles" to "resources"
ALTER TABLE article_authors RENAME TO resource_authors;
ALTER TABLE article_topics RENAME TO resource_topics;
ALTER TABLE articles RENAME TO resources;
ALTER TABLE article_likes RENAME TO resource_likes;
