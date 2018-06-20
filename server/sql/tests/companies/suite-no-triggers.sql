\! echo "--- TESTING COMPANY-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-functions.sql;
\i ./server/sql/init/init-tables.sql;
\i ./server/sql/tests/companies/acceptance.sql;
\i ./server/sql/tests/companies/invalid-args.sql;
\i ./server/sql/tests/companies/invalid-regex.sql;
