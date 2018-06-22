\! echo "ACCEPTANCE TEST 1: non-default-valued fields, contract type 1"
INSERT INTO jobads(companyName,companyId,vizeApplyForJobUrl,
				jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a',0,'a','a','0','Full time','a','a','a');
\! echo "ACCEPTANCE TEST 2: non-null fields, pay range 1, contract type 2"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','0.00','Part time','a','a','a');
\! echo "ACCEPTANCE TEST 3: pay range 2, contract type 3"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','0 - 0','Contractor','a','a','a');
\! echo "ACCEPTANCE TEST 4: pay range 3"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','0.00 - 0.00','Full time','a','a','a');
\! echo "ACCEPTANCE TEST 5: pay range 4"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','0- 0.00','Full time','a','a','a');
\! echo "ACCEPTANCE TEST 6: pay range 5"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','0.00 -0','Full time','a','a','a');
\! echo "ACCEPTANCE TEST 7: pay range 5"
INSERT INTO jobads(companyName,jobTitle,pesosPerHour,contractType,
				jobDescription,responsibilities,qualifications)
	VALUES ('a','a','0-0','Full time','a','a','a');
