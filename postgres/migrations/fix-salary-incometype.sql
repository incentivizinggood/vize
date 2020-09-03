-- Change salaries.incometype and gender in our database to match our GraphQL API.
-- This could be done with an enumerated type, but those are not extendable.

ALTER TABLE salaries
    DROP CONSTRAINT salaries_incometype_check;
    DROP CONSTRAINT salaries_gender_check;

update salaries set
    incometype =
        case incometype
            when 'Yearly Salary'  then 'YEARLY_SALARY'
            when 'Monthly Salary' then 'MONTHLY_SALARY'
            when 'Weekly Salary'  then 'WEEKLY_SALARY'
            when 'Daily Salary'   then 'DAILY_SALARY'
            when 'Hourly Wage'    then 'HOURLY_WAGE'
        end,
    gender = 
        case gender
            when 'Male' then 'MALE'
            when 'Female' then 'FEMALE'
        end;

ALTER TABLE salaries 
    ADD CONSTRAINT salaries_incometype_check
    CHECK (
        incometype IN (
            'YEARLY_SALARY',
            'MONTHLY_SALARY',
            'WEEKLY_SALARY',
            'DAILY_SALARY',
            'HOURLY_WAGE'
        )
    )
    ADD CONSTRAINT salaries_gender_check
    CHECK (gender IN ('MALE', 'FEMALE'));


