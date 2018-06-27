\! echo "--- TESTING REVIEW-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-db.sql;

-- test reviews foreign key to companies
-- these should all be fine
START TRANSACTION;
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('a', '1 - 50', 'example@gmail.com', 'https://example.com',0);
INSERT INTO company_locations(companyId,locationName) VALUES (1,'somewhere over the rainbow'),(1,'hello world'),(1,'anotherwhere'),(1,'movin right along');
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('b', '1 - 50', 'example@gmail.com', 'https://example.com',0);
INSERT INTO company_locations(companyId,locationName) VALUES (2,'somewhere over the rainbow'),(2,'hello world'),(2,'anotherwhere'),(2,'movin right along');
INSERT INTO reviews
(submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (0,'a','a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (1,'hello world');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (1,'anotherwhere');
INSERT INTO reviews
(submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (0,'b','a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (2,'somewhere over the rainbow');
COMMIT;

-- this next one should fail, no company 'c'
INSERT INTO reviews
(submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (0,'c','a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');

-- should fail, review has no locations
START TRANSACTION;
INSERT INTO reviews
(submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (0,'b','a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');
COMMIT;

-- should fail, would leave no locations for review
DELETE FROM review_locations WHERE reviewId=1;
-- should succeed, one location left
DELETE FROM review_locations WHERE reviewLocation='hello world';
-- these next two should both fail, as either
-- would remove a review's last location
DELETE FROM review_locations WHERE reviewLocation='somewhere over the rainbow';
UPDATE review_locations SET reviewId=1 WHERE reviewLocation='somewhere over the rainbow';

-- test comments foreign key to reviews
-- should be fine
INSERT INTO review_comments (reviewId,submittedBy,content) VALUES (1,0,'hello world');
-- should fail
INSERT INTO review_comments (reviewId,submittedBy,content) VALUES (3,0,'hello world');
