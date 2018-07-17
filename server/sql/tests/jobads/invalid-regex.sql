\! echo "INVALID REGEX TEST 1: (Pay Range)"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','0','Part time','a','a','a');
\! echo "INVALID REGEX TEST 2: (Pay Range)"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
			jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1-0','Part time','a','a','a');
\! echo "INVALID REGEX TEST 3: (Pay Range)"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','0.11','Part time','a','a','a');
\! echo "INVALID REGEX TEST 4: (Pay Range)"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1-0.11','Part time','a','a','a');
\! echo "INVALID REGEX TEST 5: (Pay Range)"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1.0','Part time','a','a','a');
\! echo "INVALID REGEX TEST 6: (Pay Range)"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1.11-1.1','Part time','a','a','a');
\! echo "INVALID REGEX TEST 7: (Pay Range)"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1.11.1','Part time','a','a','a');
\! echo "INVALID REGEX TEST 8: (Pay Range)"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','-1','Part time','a','a','a');
\! echo "INVALID REGEX TEST 9: (Pay Range)"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1-','Part time','a','a','a');
\! echo "INVALID REGEX TEST 10: (Pay Range)"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1.','Part time','a','a','a');
