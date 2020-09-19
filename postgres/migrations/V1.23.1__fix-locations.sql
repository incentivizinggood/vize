-- Drop all stuff that was for the old locations

ALTER TABLE job_locations DROP CONSTRAINT job_locations_joblocation_check;
DROP TRIGGER enforce_location_format ON job_locations;

ALTER TABLE company_locations DROP CONSTRAINT company_locations_companylocation_check;
DROP TRIGGER enforce_location_format ON company_locations;

ALTER TABLE reviews DROP CONSTRAINT reviews_reviewlocation_check;
DROP TRIGGER enforce_location_format ON reviews;

ALTER TABLE salaries DROP CONSTRAINT salaries_salarylocation_check;
DROP TRIGGER enforce_location_format ON salaries;

DROP FUNCTION is_valid_location(text);
DROP FUNCTION process_location(text);

DROP FUNCTION process_company_location();
DROP FUNCTION process_job_location();
DROP FUNCTION process_review_location();
DROP FUNCTION process_salary_location();

-- Convert the old locations to simpler colunms.

create function fix_location_null(text) returns text as
$$
select
    case $1
        -- The staging and development databases have been using '-' instead of null.
        when '-' then null
        -- The production database have been using this instead of null.
        when '(unknown or not provided by user)' then null
        else $1
    end;
$$ LANGUAGE sql IMMUTABLE;



ALTER TABLE job_locations
    ADD COLUMN city text,
    ADD COLUMN address text,
    ADD COLUMN industrial_hub text;

UPDATE job_locations
SET
    city = fix_location_null(joblocation::jsonb->>'city'),
    address = fix_location_null(joblocation::jsonb->>'address'),
    industrial_hub = fix_location_null(joblocation::jsonb->>'industrialHub');


ALTER TABLE company_locations
    ADD COLUMN city text,
    ADD COLUMN address text,
    ADD COLUMN industrial_hub text;

UPDATE company_locations
SET
    city = fix_location_null(companylocation::jsonb->>'city'),
    address = fix_location_null(companylocation::jsonb->>'address'),
    industrial_hub = fix_location_null(companylocation::jsonb->>'industrialHub');


ALTER TABLE reviews
    ADD COLUMN city text,
    ADD COLUMN address text,
    ADD COLUMN industrial_hub text;

UPDATE reviews
SET
    city = fix_location_null(reviewlocation::jsonb->>'city'),
    address = fix_location_null(reviewlocation::jsonb->>'address'),
    industrial_hub = fix_location_null(reviewlocation::jsonb->>'industrialHub');


ALTER TABLE salaries
    ADD COLUMN city text,
    ADD COLUMN address text,
    ADD COLUMN industrial_hub text;

UPDATE salaries
SET
    city = fix_location_null(salarylocation::jsonb->>'city'),
    address = fix_location_null(salarylocation::jsonb->>'address'),
    industrial_hub = fix_location_null(salarylocation::jsonb->>'industrialHub');


-- This function is only usefull in this migration.
drop function fix_location_null(text);
