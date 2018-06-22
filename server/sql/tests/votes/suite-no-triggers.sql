\! echo "--- TESTING VOTE-RELATED FUNCTIONALITY *WITHOUT* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-db.sql;
ALTER TABLE votes DISABLE TRIGGER all;
\i ./server/sql/tests/votes/acceptance.sql;
\i ./server/sql/tests/votes/invalid-args.sql;
ALTER TABLE votes ENABLE TRIGGER all;
