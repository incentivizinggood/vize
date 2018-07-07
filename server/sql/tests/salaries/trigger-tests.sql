\! echo "--- TESTING SALARY-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-db.sql;

-- test salaries foreign key to companies
-- this one should pass
START TRANSACTION;
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('a', '1 - 50', 'example@gmail.com', 'https://example.com',0);
INSERT INTO company_locations(companyId,locationName) VALUES (1,'somewhere over the rainbow'),(1,'hello world'),(1,'anotherwhere'),(1,'movin right along');
INSERT INTO salaries
(submittedBy,companyname,salarylocation,
	jobTitle,incomeType,incomeAmount)
	VALUES (0,'a','a','a','Hourly Wage',0);
COMMIT;

-- fail: no company 'b'
INSERT INTO salaries
(submittedBy,companyname,salarylocation,
	jobTitle,incomeType,incomeAmount)
	VALUES (0,'b','a','a','Hourly Wage',0);

-- fail: no company with id -1
INSERT INTO salaries
(submittedBy,companyname,salarylocation,companyId,
	jobTitle,incomeType,incomeAmount)
	VALUES (0,'a','a',-1,'a','Hourly Wage',0);
