\! echo "INVALID ARG TEST 1: NULL fields, part 1"
INSERT INTO votes(submittedBy,voteSubject,refersTo,value)
	VALUES(NULL,'review',0,'t');
\! echo "INVALID ARG TEST 2: NULL fields, part 2"
INSERT INTO votes(submittedBy,voteSubject,refersTo,value)
	VALUES(0,NULL,0,'t');
\! echo "INVALID ARG TEST 3: NULL fields, part 3"
INSERT INTO votes(submittedBy,voteSubject,refersTo,value)
	VALUES(0,'review',NULL,'t');
\! echo "INVALID ARG TEST 4: NULL fields, part 4"
INSERT INTO votes(submittedBy,voteSubject,refersTo,value)
	VALUES(0,'review',0,NULL);
\! echo "INVALID ARG TEST 5: invalid vote subject 1"
INSERT INTO votes(submittedBy,voteSubject,refersTo,value)
	VALUES(0,'revew',0,'t');
\! echo "INVALID ARG TEST 6: invalid vote subject 2"
INSERT INTO votes(submittedBy,voteSubject,refersTo,value)
	VALUES(0,'commet',0,'t');
