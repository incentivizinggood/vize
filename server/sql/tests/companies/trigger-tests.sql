-- companies foreign key -> company_locations tests:
\! echo "--- TESTING COMPANY-RELATED FUNCTIONALITY *WITHOUT* TRIGGERS ---"
\i ./server/sql/tests/wipedb.sql;
\i ./server/sql/init/init-db.sql;
-- tests for geq_one_locations trigger on companies
-- this transaction should pass
START TRANSACTION;
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('test', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0),('test2', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);
INSERT INTO company_locations(companyName,locationName) VALUES ('test','somewhere over the rainbow'),('test','hello world'),('test','anotherwhere'),('test','movin right along'),('test','one last time'),('test2','one last time');
COMMIT;
-- this op should fail inside the trigger because
-- there are no locations for this company
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('test3', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

-- tests for not_last_location trigger on company_locations
DELETE FROM company_locations WHERE locationName='somewhere over the rainbow' or locationName='anotherwhere' or locationName='movin right along' or locationName='hello world';
-- these next two ops should fail with a message about
-- it being the last location, NOT about a primary key restraint
DELETE FROM company_locations WHERE locationName='one last time';
UPDATE company_locations SET companyName='test2',locationName='hello world' WHERE companyName='test';
