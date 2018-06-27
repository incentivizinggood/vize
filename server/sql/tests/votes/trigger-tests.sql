\! echo "--- TESTING VOTE-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"

-- run this series commands, and see if
-- the output of the SELECT queries looks correct
-- start with simple, familiar setup script
\i ./server/sql/tests/reviews/trigger-tests.sql;

-- these insertions should all go through
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (99,1,'t');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (99,1,'t');
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (100,1,'f');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (100,1,'t');
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (101,1,'t');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (101,1,'f');
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (102,1,'f');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (102,1,'f');
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (103,2,'f');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (103,1,'t');

-- these insertions should both fail: duplicate votes
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (99,1,'t');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (99,1,'t');

-- these insertions should both fail: voting on own review/comment
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (0,1,'t');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (0,1,'t');

-- these insertions should both fail: subject doesn't exist
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (99,100,'t');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (99,100,'t');
