\! echo "ACCEPTANCE TEST 1: all non-default-valued fields, first income type, Male"
INSERT INTO salaries(salaryId,submittedBy,companyName,
					companyId,jobTitle,incomeType,
					incomeAmount,gender)
	VALUES (0,0,'a',0,'a','Yearly Salary',.5,'Male');
\! echo "ACCEPTANCE TEST 2: only non-null fields, numeric range limits, second income type"
INSERT INTO salaries(submittedBy,companyName,jobTitle,
					incomeType,incomeAmount)
	VALUES (0,'a','a','Monthly Salary',999999999.99999);
\! echo "ACCEPTANCE TEST 3: third income type, female"
INSERT INTO salaries(submittedBy,companyName,jobTitle,
					incomeType,incomeAmount,gender)
	VALUES (0,'a','a','Hourly Wage',0,'Female');
