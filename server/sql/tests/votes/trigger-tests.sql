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
-- should show 2 upvotes and 2 downvotes on both review 1 and comment 1
SELECT * FROM votes;
SELECT reviewid,submittedby,upvotes,downvotes FROM reviews;
SELECT commentid,submittedby,upvotes,downvotes FROM review_comments;

-- these insertions should both fail: duplicate votes
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (99,'review',1,'t');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (99,'comment',1,'t');
-- values should not have changed
SELECT * FROM votes;
SELECT reviewid,submittedby,upvotes,downvotes FROM reviews;
SELECT commentid,submittedby,upvotes,downvotes FROM review_comments;

-- these insertions should both fail: voting on own review/comment
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (0,'review',1,'t');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (0,'comment',1,'t');
-- values should not have changed
SELECT * FROM votes;
SELECT reviewid,submittedby,upvotes,downvotes FROM reviews;
SELECT commentid,submittedby,upvotes,downvotes FROM review_comments;

-- these insertions should both fail: subject doesn't exist
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (99,'review',100,'t');
INSERT INTO votes(submittedBy,voteSubject,refersTo,value) VALUES (99,'comment',100,'t');
-- values should not have changed
SELECT * FROM votes;
SELECT reviewid,submittedby,upvotes,downvotes FROM reviews;
SELECT commentid,submittedby,upvotes,downvotes FROM review_comments;

-- update tests
-- delete tests
