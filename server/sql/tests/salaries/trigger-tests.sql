\! echo "--- TESTING SALARY-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-db.sql;

-- test salaries foreign key to companies
-- this one should pass
START TRANSACTION;
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('a', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);
INSERT INTO company_locations(companyId,locationName) VALUES (1,'somewhere over the rainbow'),(1,'hello world'),(1,'anotherwhere'),(1,'movin right along');
INSERT INTO salaries
(submittedBy,companyName,
	jobTitle,incomeType,incomeAmount)
	VALUES (0,'a','a','Hourly Wage',0);
COMMIT;

-- fail: no company 'b'
INSERT INTO salaries
(submittedBy,companyName,
	jobTitle,incomeType,incomeAmount)
	VALUES (0,'b','a','Hourly Wage',0);

-- fail: no company with id -1
INSERT INTO salaries
(submittedBy,companyName,companyId,
	jobTitle,incomeType,incomeAmount)
	VALUES (0,'a',-1,'a','Hourly Wage',0);
