\! echo "--- TESTING COMPANY-RELATED FUNCTIONALITY *WITHOUT* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-functions.sql;
\i ./server/sql/init/init-tables.sql;
ALTER TABLE reviews DISABLE TRIGGER all;
ALTER TABLE review_locations DISABLE TRIGGER all;
ALTER TABLE review_comments DISABLE TRIGGER all;
\i ./server/sql/tests/companies/acceptance.sql;
\i ./server/sql/tests/companies/invalid-args.sql;
\i ./server/sql/tests/companies/invalid-regex.sql;
ALTER TABLE reviews ENABLE TRIGGER all;
ALTER TABLE review_locations ENABLE TRIGGER all;
ALTER TABLE review_comments ENABLE TRIGGER all;
