-- TRUNCATE just seems like a nasty loophole
-- right now and I'm not going to think about it.
DROP TRIGGER IF EXISTS deny_truncate ON companies;
CREATE TRIGGER deny_truncate
BEFORE TRUNCATE ON companies
FOR EACH STATEMENT EXECUTE PROCEDURE deny_op();

DROP TRIGGER IF EXISTS deny_truncate ON company_locations;
CREATE TRIGGER deny_truncate
BEFORE TRUNCATE ON company_locations
FOR EACH STATEMENT EXECUTE PROCEDURE deny_op();

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
