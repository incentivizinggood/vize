ALTER TABLE salaries
	DROP CONSTRAINT salaries_incometype_check;
ALTER TABLE salaries
	ADD CONSTRAINT salaries_incometype_check
	CHECK (incomeType='Yearly Salary' OR incomeType='Monthly Salary' OR incomeType='Weekly Salary' OR incomeType='Hourly Wage');
