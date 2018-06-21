\! echo "--- TESTING REVIEW-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"
\i ./server/sql/tests/wipedb.sql;
\i ./server/sql/init/init-db.sql;
-- test reviews foreign key to companies
-- this one should be totally fine
START TRANSACTION;
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('a', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);
INSERT INTO company_locations(companyName,locationName) VALUES ('a','somewhere over the rainbow'),('a','hello world'),('a','anotherwhere'),('a','movin right along');
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
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (1,'somewhere over the rainbow');
COMMIT;
-- this next one should fail, no company 'b'
INSERT INTO reviews
(submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (0,'b','a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');

-- test reviews geq_one_locations

-- test review_locations not_last_location

-- test comments foreign key to reviews
