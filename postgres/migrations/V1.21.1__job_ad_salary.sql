ALTER TABLE jobads
ADD COLUMN salary_min numeric,
ADD COLUMN salary_max numeric,
ADD COLUMN salary_type text 
    CHECK (salary_type IN (
        'Yearly Salary',
        'Monthly Salary',
        'Weekly Salary',
        'Daily Salary',
        'Hourly Wage'
    ));

UPDATE jobads
SET
    salary_min = pesosperhour::numeric,
    salary_max = pesosperhour::numeric,
    salary_type = 'Hourly Wage';
