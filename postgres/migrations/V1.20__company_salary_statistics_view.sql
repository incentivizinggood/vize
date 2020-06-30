DROP VIEW IF EXISTS company_salary_income_amount CASCADE;
CREATE OR REPLACE VIEW company_salary_income_amount AS

select
	companyname,jobtitle,incometype,gender,incomeamount,
    case
        when incometype = 'Yearly Salary'  then incomeamount / 52
        when incometype = 'Monthly Salary' then incomeamount / 4
        when incometype = 'Weekly Salary'  then incomeamount
        when incometype = 'Daily Salary'   then 5 * incomeamount
        when incometype = 'Hourly Wage'    then 50 * incomeamount
        else null -- We do not know what to do with any other incometype.
    end as income_amount_per_week
from salaries;


DROP VIEW IF EXISTS company_salary_statistics CASCADE;
CREATE OR REPLACE VIEW company_salary_statistics AS

select
	companyname,jobtitle,
	total_avg_pay,total_max_pay,total_min_pay,
	male_avg_pay,male_max_pay,male_min_pay,
	female_avg_pay,female_max_pay,female_min_pay,
	num_salaries_job_title

from
	(select
		companyname,jobtitle,
		avg(income_amount_per_week) as total_avg_pay,
		max(income_amount_per_week) as total_max_pay,
		min(income_amount_per_week) as total_min_pay,
		count(*) as num_salaries_job_title
	from
		company_salary_income_amount
	group by
		companyname,jobtitle) as total_pay_stats

	NATURAL FULL OUTER JOIN

	(select
		companyname,jobtitle,
		avg(income_amount_per_week) as male_avg_pay,
		max(income_amount_per_week) as male_max_pay,
		min(income_amount_per_week) as male_min_pay
	from
		company_salary_income_amount
	where
		gender='Male'
	group by
		companyname,jobtitle) as male_pay_stats

	NATURAL FULL OUTER JOIN

	(select
		companyname,jobtitle,
		avg(income_amount_per_week) as female_avg_pay,
		max(income_amount_per_week) as female_max_pay,
		min(income_amount_per_week) as female_min_pay
	from
		company_salary_income_amount
	where
		gender='Female'
	group by
		companyname,jobtitle) as female_pay_stats;
