\! echo "--- TESTING VOTE-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"

-- run this series commands, and see if
-- the output of the SELECT queries looks correct
-- start with simple, familiar setup script
\i ./server/sql/tests/reviews/trigger-tests.sql;

-- these insertions should all go through
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (99,'review',1,'t');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (99,'comment',1,'t');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (100,'review',1,'f');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (100,'comment',1,'t');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (101,'review',1,'t');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (101,'comment',1,'f');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (102,'review',1,'f');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (102,'comment',1,'f');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (103,'review',2,'f');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (103,'comment',1,'t');

-- these insertions should both fail: duplicate votes
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (99,'review',1,'t');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (99,'comment',1,'t');

-- these insertions should both fail: voting on own review/comment
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (0,'review',1,'t');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (0,'comment',1,'t');

-- these insertions should both fail: subject doesn't exist
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (99,'review',100,'t');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (99,'comment',100,'t');
