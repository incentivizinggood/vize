-- companies foreign key -> company_locations tests:
\! echo "--- TESTING COMPANY-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"
\i ./server/sql/wipedb.sql;
\i ./server/sql/init/init-db.sql;
-- tests for geq_one_locations trigger on companies
-- this transaction should pass
START TRANSACTION;
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('test', '1 - 50', 'example@gmail.com', 'https://example.com',0),('test2', '1 - 50', 'example@gmail.com', 'https://example.com',0);
INSERT INTO company_locations(companyid,companyLocation) VALUES (1,'somewhere over the rainbow'),(1,'hello world'),(1,'anotherwhere'),(1,'movin right along'),(1,'one last time'),(2,'one last time');
COMMIT;
-- this op should fail inside the trigger because
-- there are no locations for this company
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('test3', '1 - 50', 'example@gmail.com', 'https://example.com',0);

-- tests for not_last_location trigger on company_locations
DELETE FROM company_locations WHERE companyLocation='{"industrialHub":"somewhere over the rainbow"}' or companyLocation='{"industrialHub":"anotherwhere"}' or companyLocation='{"industrialHub":"movin right along"}' or companyLocation='{"industrialHub":"hello world"}';
-- these next two ops should fail with a message about
-- it being the last location, NOT about a primary key restraint
DELETE FROM company_locations WHERE companyLocation='{"industrialHub":"one last time"}';
UPDATE company_locations SET companyId=2,companyLocation='{"industrialHub":"hello world"}' WHERE companyId=1;
