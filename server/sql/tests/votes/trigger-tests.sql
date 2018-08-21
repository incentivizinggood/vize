\! echo "--- TESTING VOTE-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"

-- run this series commands, and see if
-- the output of the SELECT queries looks correct
-- start with simple, familiar setup script
\i ./server/sql/tests/reviews/trigger-tests.sql;

INSERT INTO users (role) VALUES ('worker'),('worker'),('worker'),('worker'),('worker');
INSERT INTO reviews
(submittedBy,companyName,reviewlocation,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (3,'a','a','a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');
INSERT INTO review_comments (submittedBy,reviewId,content) VALUES (3,1,'hello world');

-- these insertions should all go through
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (1,1,'t');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (1,1,'t');
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (2,1,'f');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (2,1,'t');
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (3,1,'t');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (3,1,'f');
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (4,1,'f');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (4,1,'f');
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (5,2,'f');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (5,1,'t');

-- these insertions should both fail: duplicate votes
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (1,1,'t');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (1,1,'t');

-- these insertions should both fail: voting on own review/comment
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (3,4,'t');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (3,3,'t');

-- these insertions should both fail: subject doesn't exist
INSERT INTO review_votes(submittedBy,refersTo,value) VALUES (1,100,'t');
INSERT INTO comment_votes(submittedBy,refersTo,value) VALUES (1,100,'t');
