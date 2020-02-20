
-- Remove the users' id for MongoDB because it is no longer used.
ALTER TABLE users
DROP COLUMN userMongoId;
