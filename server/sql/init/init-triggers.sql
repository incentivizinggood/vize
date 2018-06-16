DROP TRIGGER IF EXISTS deny_truncate ON companies;
CREATE TRIGGER deny_truncate
BEFORE TRUNCATE ON companies
FOR EACH STATEMENT EXECUTE PROCEDURE deny_op();

DROP TRIGGER IF EXISTS deny_truncate ON company_locations;
CREATE TRIGGER deny_truncate
BEFORE TRUNCATE ON company_locations
FOR EACH STATEMENT EXECUTE PROCEDURE deny_op();

DROP TRIGGER IF EXISTS geq_one_locations ON companies;
CREATE CONSTRAINT TRIGGER geq_one_locations
AFTER INSERT ON companies
DEFERRABLE INITIALLY DEFERRED
FOR EACH ROW EXECUTE PROCEDURE check_for_company_locations();

-- Okay, here's the tricky part:
-- One-many relationship from companies to locations,
-- many-one from locations to companies. Solved on
-- locations side by foreign key, but how to make sure
-- that each company has at least one location?

-- SOLUTION:
-- Foreign key as it currently stands, plus
-- "deferred constraint triggers", one for each
-- case (after update/delete/truncate on locations,
-- after insert on companies, constraint triggers
-- can only be after but it's fine because they
-- roll back the transaction).
