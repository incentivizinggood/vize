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
(companyName,reviewlocation,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES ('a','a','a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');
INSERT INTO reviews
(companyname,reviewlocation,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES ('b','a','a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');
COMMIT;

-- this next one should NOT fail,
-- it is an exception case where name
-- is provided but no company with that
-- name is in the database
INSERT INTO reviews
(companyname,reviewlocation,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES ('c','a','a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');

-- test comments foreign key to reviews
-- should be fine
INSERT INTO review_comments (reviewId,content) VALUES (1,'hello world');
-- should fail
INSERT INTO review_comments (reviewId,content) VALUES (4,'hello world');
