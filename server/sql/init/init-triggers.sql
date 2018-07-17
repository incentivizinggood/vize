-- WARNING
-- In PostgreSQL, triggers defined for the same
-- event on the same table execute in alphabetical
-- order by trigger name.
-- WARNING

-- SST === Single Source of Truth
DROP TRIGGER IF EXISTS id_is_sst ON reviews;
CREATE TRIGGER id_is_sst
BEFORE INSERT OR UPDATE ON reviews
FOR EACH ROW
WHEN (NEW.companyid IS NOT NULL)
EXECUTE PROCEDURE correct_name_by_id();

DROP TRIGGER IF EXISTS id_is_sst ON salaries;
CREATE TRIGGER id_is_sst
BEFORE INSERT OR UPDATE ON salaries
FOR EACH ROW
WHEN (NEW.companyid IS NOT NULL)
EXECUTE PROCEDURE correct_name_by_id();

DROP TRIGGER IF EXISTS id_is_sst ON jobads;
CREATE TRIGGER id_is_sst
BEFORE INSERT OR UPDATE ON jobads
FOR EACH ROW
WHEN (NEW.companyid IS NOT NULL)
EXECUTE PROCEDURE correct_name_by_id();

DROP TRIGGER IF EXISTS fill_id_if_exists ON reviews;
CREATE TRIGGER fill_id_if_exists
BEFORE INSERT OR UPDATE ON reviews
FOR EACH ROW
WHEN (NEW.companyname IS NOT NULL AND NEW.companyid IS NULL)
EXECUTE PROCEDURE fill_id_by_name();

DROP TRIGGER IF EXISTS fill_id_if_exists ON salaries;
CREATE TRIGGER fill_id_if_exists
BEFORE INSERT OR UPDATE ON salaries
FOR EACH ROW
WHEN (NEW.companyname IS NOT NULL AND NEW.companyid IS NULL)
EXECUTE PROCEDURE fill_id_by_name();

DROP TRIGGER IF EXISTS fill_id_if_exists ON jobads;
CREATE TRIGGER fill_id_if_exists
BEFORE INSERT OR UPDATE ON jobads
FOR EACH ROW
WHEN (NEW.companyname IS NOT NULL AND NEW.companyid IS NULL)
EXECUTE PROCEDURE fill_id_by_name();

-- QUESTION:
-- One-many relationship from companies to locations,
-- many-one from locations to companies. Solved on
-- locations side by foreign key, but how to make sure
-- that each company has at least one location? MariaDB
-- lets us specify a foreign key that references *part*
-- of the foreign table's primary key, PostgreSQL forces
-- us to reference the *entire* primary key.

-- ANSWER:
-- Foreign key as it currently stands (see init-tables.sql),
-- plus "deferred constraint triggers", one for each
-- case (after update and delete on locations,
-- after insert on companies). Constraint triggers
-- can only fire after an op but that's fine because they
-- can roll back the transaction, which is exactly what we
-- want them to do.

DROP TRIGGER IF EXISTS geq_one_locations ON companies;
CREATE CONSTRAINT TRIGGER geq_one_locations
AFTER INSERT ON companies
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE PROCEDURE check_company_location_count();

DROP TRIGGER IF EXISTS not_last_location ON company_locations;
CREATE CONSTRAINT TRIGGER not_last_location
AFTER UPDATE OR DELETE ON company_locations
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE PROCEDURE check_remaining_company_locations();

DROP TRIGGER IF EXISTS geq_one_locations ON jobads;
CREATE CONSTRAINT TRIGGER geq_one_locations
AFTER INSERT ON jobads
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE PROCEDURE check_job_location_count();

DROP TRIGGER IF EXISTS not_last_location ON job_locations;
CREATE CONSTRAINT TRIGGER not_last_location
AFTER UPDATE OR DELETE ON job_locations
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE PROCEDURE check_remaining_job_locations();

DROP TRIGGER IF EXISTS not_own_review ON review_votes;
CREATE CONSTRAINT TRIGGER not_own_review
AFTER INSERT OR UPDATE ON review_votes
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE PROCEDURE disallow_voting_on_self();

DROP TRIGGER IF EXISTS not_own_comment ON comment_votes;
CREATE CONSTRAINT TRIGGER not_own_comment
AFTER INSERT OR UPDATE ON comment_votes
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE PROCEDURE disallow_voting_on_self();
