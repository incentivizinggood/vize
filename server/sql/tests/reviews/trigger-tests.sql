\! echo "--- TESTING REVIEW-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"
\i ./server/sql/tests/wipedb.sql;
\i ./server/sql/init/init-db.sql;

-- test reviews foreign key to companies
-- these should all be fine
START TRANSACTION;
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('a', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);
INSERT INTO company_locations(companyId,locationName) VALUES (1,'somewhere over the rainbow'),(1,'hello world'),(1,'anotherwhere'),(1,'movin right along');
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('b', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);
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

-- should be pretty much all 0's on both of these,
-- but 1 review for each company
select nummonthsworked,wouldrecommend,healthandsafety,managerrelationship,workenvironment,benefits,overallsatisfaction from reviews;
select numreviews,avgnummonthsworked,percentrecommended,healthandsafety,managerrelationship,workenvironment,benefits,overallsatisfaction from companies;

-- should succeed via cascade to reviews and review_locations
DELETE FROM companies *;

-- now to check to correctness of the denormalization
START TRANSACTION;
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('a', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);
INSERT INTO company_locations(companyId,locationName) VALUES (3,'somewhere over the rainbow');
INSERT INTO reviews
(reviewId,submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (3,0,'a','a','a',2,
			'a a a a a','a a a a a',TRUE,
			1,2,3,4,0,'Hello world!');
INSERT INTO reviews
(reviewId,submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (4,1,'a','a','a',3,
			'a a a a a','a a a a a',TRUE,
			1,2,3,4,0,'Hello world!');
INSERT INTO reviews
(reviewId,submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (5,2,'a','a','a',4,
			'a a a a a','a a a a a',TRUE,
			1,2,3,4,0,'Hello world!');
INSERT INTO reviews
(reviewId,submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (6,3,'a','a','a',5,
			'a a a a a','a a a a a',FALSE,
			1,2,3,4,0,'Hello world!');
INSERT INTO reviews
(reviewId,submittedBy,companyName,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (7,4,'a','a','a',6,
			'a a a a a','a a a a a',FALSE,
			2,3,4,5,1,'Hello world!');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (3,'somewhere over the rainbow');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (4,'somewhere over the rainbow');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (5,'somewhere over the rainbow');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (6,'somewhere over the rainbow');
INSERT INTO review_locations (reviewId,reviewLocation) VALUES (7,'somewhere over the rainbow');
COMMIT;

-- values should be:
-- numreviews: 5
-- avgnummonthsworked: 4
-- percentrecommended: .6
-- healthandsafety: 6 / 5 = 1.2
-- managerrelationship: 11 / 5 = 2.2
-- workenvironment: 16 / 5 = 3.2
-- benefits: 21 / 5 = 4.2
-- overallsatisfaction: 1 / 5 = .2
select numreviews,avgnummonthsworked,percentrecommended,healthandsafety,managerrelationship,workenvironment,benefits,overallsatisfaction from companies where name='a';

-- values should be:
-- numreviews: 4
-- avgnummonthsworked: 3.75
-- percentrecommended: .75
-- healthandsafety: 1.25
-- managerrelationship: 2.25
-- workenvironment: 3.25
-- benefits: 4.25
-- overallsatisfaction: .25
delete from reviews where submittedby=3;
select numreviews,avgnummonthsworked,percentrecommended,healthandsafety,managerrelationship,workenvironment,benefits,overallsatisfaction from companies where name='a';

-- values should be:
-- numreviews: 3
-- avgnummonthsworked: 4.33
-- percentrecommended: .667
-- healthandsafety: 1.33
-- managerrelationship: 2.33
-- workenvironment: 3.33
-- benefits: 4.33
-- overallsatisfaction: .33
delete from reviews where submittedby=0;
select numreviews,avgnummonthsworked,percentrecommended,healthandsafety,managerrelationship,workenvironment,benefits,overallsatisfaction from companies where name='a';

-- values should be all 0's
delete from reviews *;
select numreviews,avgnummonthsworked,percentrecommended,healthandsafety,managerrelationship,workenvironment,benefits,overallsatisfaction from companies where name='a';
