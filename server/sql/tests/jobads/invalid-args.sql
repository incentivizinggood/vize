\! echo "INVALID ARG TEST 1: NULL fields part 1"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES (NULL,'a','1','Part time','a','a','a');
\! echo "INVALID ARG TEST 2: NULL fields part 2"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',NULL,'1','Part time','a','a','a');
\! echo "INVALID ARG TEST 3: NULL fields part 3"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a',NULL,'Part time','a','a','a');
\! echo "INVALID ARG TEST 4: NULL fields part 4"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','1',NULL,'a','a','a');
\! echo "INVALID ARG TEST 5: NULL fields part 5"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','1','Part time',NULL,'a','a');
\! echo "INVALID ARG TEST 6: NULL fields part 6"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','1','Part time','a',NULL,'a');
\! echo "INVALID ARG TEST 7: NULL fields part 7"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','1','Part time','a','a',NULL);
\! echo "INVALID ARG TEST 8: invalid contract type 1"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','1','Fulltime','a','a','a');
\! echo "INVALID ARG TEST 9: invalid contract type 2"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','1','Part ime','a','a','a');
\! echo "INVALID ARG TEST 10: invalid contract type 3"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','1','Gontractor','a','a','a');
