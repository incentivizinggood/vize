\! echo "--- TESTING REVIEW-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"
\i ./server/sql/tests/wipedb.sql;
\i ./server/sql/init/init-db.sql;
-- test reviews foreign key to companies

-- test reviews geq_one_locations

-- test review_locations not_last_location

-- test comments foreign key to reviews
