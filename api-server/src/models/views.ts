import sql from "src/utils/sql-template";

export const companyReviewStatistics = sql`
SELECT
    companyname AS name,
    count(*) AS numreviews,
    avg(nummonthsworked) AS avgnummonthsworked,
    avg(wouldrecommend::integer) AS percentrecommended,
    avg(healthandsafety) AS healthandsafety,
    avg(managerrelationship) AS managerrelationship,
    avg(workenvironment) AS workenvironment,
    avg(benefits) AS benefits,
    avg(overallsatisfaction) AS overallsatisfaction
FROM reviews
GROUP BY companyname
`;

const companySalaryIncomeAmount = sql`
SELECT
    companyname,
    jobtitle,
    incometype,
    gender,
    incomeamount,
    CASE incometype
        WHEN 'Yearly Salary' THEN incomeamount / 52::double precision
        WHEN 'Monthly Salary' THEN incomeamount / 4::double precision
        WHEN 'Weekly Salary' THEN incomeamount::double precision
        WHEN 'Daily Salary' THEN 5::double precision * incomeamount
        WHEN 'Hourly Wage' THEN 50::double precision * incomeamount
        ELSE NULL::double precision
    END AS income_amount_per_week
FROM salaries
`;

export const companySalaryStatistics = sql`
SELECT 
    companyname,
    jobtitle,
    avg(income_amount_per_week) AS total_avg_pay,
    max(income_amount_per_week) AS total_max_pay,
    min(income_amount_per_week) AS total_min_pay,
    avg(income_amount_per_week) filter (where gender = 'Male') AS male_avg_pay,
    max(income_amount_per_week) filter (where gender = 'Male') AS male_max_pay,
    min(income_amount_per_week) filter (where gender = 'Male') AS male_min_pay,
    avg(income_amount_per_week) filter (where gender = 'Female') AS female_avg_pay,
    max(income_amount_per_week) filter (where gender = 'Female') AS female_max_pay,
    min(income_amount_per_week) filter (where gender = 'Female') AS female_min_pay,
    count(*) AS num_salaries_job_title
FROM (${companySalaryIncomeAmount}) company_salary_income_amount
GROUP BY companyname, jobtitle
`;

export const reviewVoteCounts = sql`
select
    refersto as reviewid,
    count(*) filter (where value = true) as upvotes,
    count(*) filter (where value = false) as downvotes
from review_votes
group by refersto
`;
