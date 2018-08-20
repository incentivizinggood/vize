\! echo "--- TESTING SALARY-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-db.sql;

-- test salaries foreign key to companies
-- this one should pass
START TRANSACTION;
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('a', '1 - 50', 'example@gmail.com', 'https://example.com',0);
INSERT INTO company_locations(companyId,companyLocation) VALUES (1,'somewhere over the rainbow'),(1,'hello world'),(1,'anotherwhere'),(1,'movin right along');
INSERT INTO salaries
(companyname,salarylocation,
	jobTitle,incomeType,incomeAmount)
	VALUES ('a','a','a','Hourly Wage',0);
COMMIT;

-- should succeed, exception case
-- where no company with that name
-- is in the database
INSERT INTO salaries
(companyname,salarylocation,
	jobTitle,incomeType,incomeAmount)
	VALUES ('b','a','a','Hourly Wage',0);

-- fail: no company with id -1
-- may give a message about name being null,
-- since that's what the trigger "corrected"
-- it to, but I guess this is fine since callers
-- shouldn't be trying to insert with invalid id's,
-- but the error message isn't terribly helpful
INSERT INTO salaries
(companyname,salarylocation,companyId,
	jobTitle,incomeType,incomeAmount)
	VALUES ('a','a',-1,'a','Hourly Wage',0);
