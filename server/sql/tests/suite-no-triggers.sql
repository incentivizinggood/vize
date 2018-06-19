-- WARNING You need to disable triggers in order for these tests to work
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-db.sql;
\i ./server/sql/tests/acceptance.sql;
\i ./server/sql/tests/invalid-args.sql;
\i ./server/sql/tests/invalid-regex.sql;
