\! echo "--- TESTING JOBAD-RELATED FUNCTIONALITY *WITH* TRIGGERS ---"
\i ./server/sql/wipedb.sql
\i ./server/sql/init/init-db.sql;

-- this transaction should go through
START TRANSACTION;
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('a', '1 - 50', 'example@gmail.com', 'https://example.com',0);
INSERT INTO company_locations(companyId,locationName) VALUES (1,'somewhere over the rainbow'),(1,'hello world'),(1,'anotherwhere'),(1,'movin right along');
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('b', '1 - 50', 'example@gmail.com', 'https://example.com',0);
INSERT INTO company_locations(companyId,locationName) VALUES (2,'somewhere over the rainbow'),(2,'hello world'),(2,'anotherwhere'),(2,'movin right along');
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','1.00','Part time','a','a','a');
INSERT INTO job_locations (jobadId,jobLocation) VALUES (1,'hello world');
INSERT INTO job_locations (jobadId,jobLocation) VALUES (1,'anotherwhere');
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('b','a','1.00','Part time','a','a','a');
INSERT INTO job_locations (jobadId,jobLocation) VALUES (2,'somewhere over the rainbow');
COMMIT;

-- this should fail, no company 'c'
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('c','a','1.00','Part time','a','a','a');

-- this should fail, no locations
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','1.00','Part time','a','a','a');

-- should fail, would leave no locations for job
DELETE FROM job_locations WHERE jobadId=1;
-- should succeed, one location left
DELETE FROM job_locations WHERE jobLocation='hello world';
-- these next two should both fail, as either
-- would remove a review's last location
DELETE FROM job_locations WHERE jobLocation='somewhere over the rainbow';
UPDATE job_locations SET jobadId=1 WHERE jobLocation='somewhere over the rainbow';
