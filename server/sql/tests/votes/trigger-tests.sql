\! echo "--- TESTING VOTE-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"

-- run this series commands, and see if
-- the output of the SELECT queries looks correct
-- start with simple, familiar setup script
\i ./server/sql/tests/reviews/trigger-tests.sql;

-- these should both be rejected
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (0,'review',1,'t');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (0,'comment',1,'t');
