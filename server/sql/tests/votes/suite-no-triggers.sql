\! echo "--- TESTING VOTE-RELATED FUNCTIONALITY *WITHOUT* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-db.sql;
ALTER TABLE review_votes DISABLE TRIGGER all;
ALTER TABLE comment_votes DISABLE TRIGGER all;
\i ./server/sql/tests/votes/acceptance.sql;
\i ./server/sql/tests/votes/invalid-args.sql;
ALTER TABLE review_votes ENABLE TRIGGER all;
ALTER TABLE comment_votes ENABLE TRIGGER all;
