ALTER TABLE jobads
ADD COLUMN salary_min numeric,
ADD COLUMN salary_max numeric,
ADD COLUMN salary_type text 
    CHECK (salary_type IN (
        'YEARLY_SALARY',
        'MONTHLY_SALARY',
        'WEEKLY_SALARY',
        'DAILY_SALARY',
        'HOURLY_WAGE'
    ));

UPDATE jobads
SET
    salary_min = pesosperhour::numeric,
    salary_max = pesosperhour::numeric,
    salary_type = 'HOURLY_WAGE';
