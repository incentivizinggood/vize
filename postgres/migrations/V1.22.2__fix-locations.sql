/*
    These drops need to be in a separate migration because each migration is
    done in a transaction. When a table has triggers it cannot be updated and
    then altered in the same transaction.
*/

ALTER TABLE job_locations
    DROP COLUMN joblocation;

ALTER TABLE company_locations
    DROP COLUMN companylocation;

ALTER TABLE reviews
    DROP COLUMN reviewlocation;

ALTER TABLE salaries
    DROP COLUMN salarylocation;
