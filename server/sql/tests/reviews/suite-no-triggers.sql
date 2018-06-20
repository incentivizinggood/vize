\! echo "--- TESTING REVIEW-RELATED FUNCTIONALITY *WITHOUT* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-functions.sql;
\i ./server/sql/init/init-tables.sql;
ALTER TABLE companies DISABLE TRIGGER all;
ALTER TABLE company_locations DISABLE TRIGGER all;
\i ./server/sql/tests/reviews/acceptance.sql;
\i ./server/sql/tests/reviews/invalid-args.sql;
\i ./server/sql/tests/reviews/invalid-word-count.sql;
ALTER TABLE companies ENABLE TRIGGER all;
ALTER TABLE company_locations ENABLE TRIGGER all;
