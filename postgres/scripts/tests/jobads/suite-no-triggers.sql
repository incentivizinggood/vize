\! echo "--- TESTING JOBAD-RELATED FUNCTIONALITY *WITHOUT* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-db.sql;
ALTER TABLE jobads DISABLE TRIGGER all;
ALTER TABLE job_locations DISABLE TRIGGER all;
\i ./server/sql/tests/jobads/acceptance.sql;
\i ./server/sql/tests/jobads/invalid-args.sql;
\i ./server/sql/tests/jobads/invalid-regex.sql;
ALTER TABLE jobads ENABLE TRIGGER all;
ALTER TABLE job_locations ENABLE TRIGGER all;
