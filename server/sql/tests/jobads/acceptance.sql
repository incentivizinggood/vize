\! echo "ACCEPTANCE TEST 1: non-default-valued fields, contract type 1"
INSERT INTO jobads(companyName,companyId,
				jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',0,'a','1','Full time','a','a','a');
\! echo "ACCEPTANCE TEST 2: non-null fields, pay range 1, contract type 2"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1.00','Part time','a','a','a');
\! echo "ACCEPTANCE TEST 3: pay range 2, contract type 3"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1 - 1','Contractor','a','a','a');
\! echo "ACCEPTANCE TEST 4: pay range 3"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1.00 - 1.00','Full time','a','a','a');
\! echo "ACCEPTANCE TEST 5: pay range 4"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1- 1.00','Full time','a','a','a');
\! echo "ACCEPTANCE TEST 6: pay range 5"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1.00 -1','Full time','a','a','a');
\! echo "ACCEPTANCE TEST 7: pay range 5"
INSERT INTO jobads(companyName,companyId,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',1,'a','1-1','Full time','a','a','a');
