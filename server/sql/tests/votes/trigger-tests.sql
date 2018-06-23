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
-- review 1: +2,-2
-- review 2: -1
-- comment 1: +3,-2
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

-- delete tests
DELETE FROM votes WHERE submittedBy=99 OR submittedBy=102;
-- should show 6 votes remaining
-- review 1: +1,-1
-- review 2: -1
-- comment 1: +2,-1
SELECT * FROM votes;
SELECT reviewid,submittedby,upvotes,downvotes FROM reviews;
SELECT commentid,submittedby,upvotes,downvotes FROM review_comments;

-- update tests
-- "Operation not permitted"
UPDATE votes SET submittedby=900 WHERE submittedby=100;
UPDATE votes SET votesubject='review' WHERE votesubject='comment' AND submittedby=103;
UPDATE votes SET votesubject='comment' WHERE votesubject='review' AND submittedby=103;
UPDATE votes SET refersto=2 WHERE votesubject='review' AND refersto=1;
-- values should be unchaged
SELECT * FROM votes;
SELECT reviewid,submittedby,upvotes,downvotes FROM reviews;
SELECT commentid,submittedby,upvotes,downvotes FROM review_comments;
-- nothing should happen, values unchanged
UPDATE votes SET value='t' WHERE value='t';
UPDATE votes SET value='f' WHERE value='f';
SELECT * FROM votes;
SELECT reviewid,submittedby,upvotes,downvotes FROM reviews;
SELECT commentid,submittedby,upvotes,downvotes FROM review_comments;
-- review 1: +2
-- review 2: +1
-- comment 1: +3
UPDATE votes SET value='t' WHERE value='f';
SELECT * FROM votes;
SELECT reviewid,submittedby,upvotes,downvotes FROM reviews;
SELECT commentid,submittedby,upvotes,downvotes FROM review_comments;
-- review 1: -2
-- review 2: -1
-- comment 1: -3
UPDATE votes SET value='f' WHERE value='t';
SELECT * FROM votes;
SELECT reviewid,submittedby,upvotes,downvotes FROM reviews;
SELECT commentid,submittedby,upvotes,downvotes FROM review_comments;
