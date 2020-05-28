
-- When a user logs in with facebook, they will not have a username.
ALTER TABLE users ALTER COLUMN username DROP NOT NULL;

ALTER TABLE users ADD COLUMN facebook_id text UNIQUE;
COMMENT ON COLUMN users.facebook_id IS 'Used with Facebook''s OAuth. This is spesific to our app and cannot be used elsewhere.';