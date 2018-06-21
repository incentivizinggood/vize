\! echo "--- TESTING REVIEW-RELATED FUNCTIONALITY *WITHOUT* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-db.sql;
ALTER TABLE reviews DISABLE TRIGGER all;
ALTER TABLE review_locations DISABLE TRIGGER all;
ALTER TABLE review_comments DISABLE TRIGGER all;
\i ./server/sql/tests/reviews/acceptance.sql;
\i ./server/sql/tests/reviews/invalid-args.sql;
\i ./server/sql/tests/reviews/invalid-word-count.sql;
ALTER TABLE reviews ENABLE TRIGGER all;
ALTER TABLE review_locations ENABLE TRIGGER all;
ALTER TABLE review_comments ENABLE TRIGGER all;
