
-- The username is a natural key for users.
ALTER TABLE users ADD CONSTRAINT users_username_key UNIQUE (username);
ALTER TABLE users ALTER COLUMN username SET NOT NULL;

-- If users are allowed to login with their email address it must be unique.
ALTER TABLE users ADD CONSTRAINT users_email_address_key UNIQUE (email_address);
