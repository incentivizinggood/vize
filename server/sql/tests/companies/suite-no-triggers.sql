\! echo "--- TESTING COMPANY-RELATED FUNCTIONALITY *WITHOUT* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-db.sql;
START TRANSACTION;
ALTER TABLE companies DISABLE TRIGGER all;
ALTER TABLE company_locations DISABLE TRIGGER all;
\i ./server/sql/tests/companies/acceptance.sql;
\i ./server/sql/tests/companies/invalid-args.sql;
\i ./server/sql/tests/companies/invalid-regex.sql;
ALTER TABLE companies ENABLE TRIGGER all;
ALTER TABLE company_locations ENABLE TRIGGER all;
COMMIT;
