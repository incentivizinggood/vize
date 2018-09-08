\! echo "INVALID ARG TEST 1: NULL fields, part 1"
INSERT INTO salaries(submittedBy,companyname,salarylocation,jobTitle,
					incomeType,incomeAmount)
	VALUES(0,NULL,'a','a','Hourly Wage',0);
\! echo "INVALID ARG TEST 2: NULL fields, part 2"
INSERT INTO salaries(submittedBy,companyname,salarylocation,jobTitle,
					incomeType,incomeAmount)
	VALUES(0,'a',NULL,'a','Hourly Wage',0);
\! echo "INVALID ARG TEST 3: NULL fields, part 3"
INSERT INTO salaries(submittedBy,companyname,salarylocation,jobTitle,
					incomeType,incomeAmount)
	VALUES(0,'a','a',NULL,'Hourly Wage',0);
\! echo "INVALID ARG TEST 4: NULL fields, part 4"
INSERT INTO salaries(submittedBy,companyname,salarylocation,jobTitle,
					incomeType,incomeAmount)
	VALUES(0,'a','a','a',NULL,0);
\! echo "INVALID ARG TEST 5: NULL fields, part 5"
INSERT INTO salaries(submittedBy,companyname,salarylocation,jobTitle,
					incomeType,incomeAmount)
	VALUES(0,'a','a','a','Hourly Wage',NULL);
\! echo "INVALID ARG TEST 6: negative income"
INSERT INTO salaries(submittedBy,companyname,salarylocation,jobTitle,
					incomeType,incomeAmount)
	VALUES(0,'a','a','a','Hourly Wage',-.001);
\! echo "INVALID ARG TEST 7: invalid income type 1"
INSERT INTO salaries(submittedBy,companyname,salarylocation,jobTitle,
					incomeType,incomeAmount)
	VALUES(0,'a','a','a','Yearly Salar',0);
\! echo "INVALID ARG TEST 8: invalid income type 2"
INSERT INTO salaries(submittedBy,companyname,salarylocation,jobTitle,
					incomeType,incomeAmount)
	VALUES(0,'a','a','a','Monly Salary',0);
\! echo "INVALID ARG TEST 9: invalid income type 3"
INSERT INTO salaries(submittedBy,companyname,salarylocation,jobTitle,
					incomeType,incomeAmount)
	VALUES(0,'a','a','a','Hourly Wags',0);
\! echo "INVALID ARG TEST 10: duplicate salaryid"
INSERT INTO salaries(salaryId,submittedBy,companyname,salarylocation,jobTitle,
					incomeType,incomeAmount)
	VALUES(1,0,'a','a','a','Hourly Wage',0);
