
-- Add new colunms so that the user data from 
-- MongoDB can be transfered into PostgreSQL.
ALTER TABLE users
ADD COLUMN username text,
ADD COLUMN email_address text,
ADD COLUMN password_hash text;
