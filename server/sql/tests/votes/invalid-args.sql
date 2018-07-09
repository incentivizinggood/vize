\! echo "INVALID ARG TEST 1: review_votes: NULL fields, part 1"
INSERT INTO review_votes(submittedBy,refersTo,value)
	VALUES(NULL,0,'t');
\! echo "INVALID ARG TEST 2: review_votes: NULL fields, part 2"
INSERT INTO review_votes(submittedBy,refersTo,value)
	VALUES(0,NULL,'t');
\! echo "INVALID ARG TEST 3: review_votes: NULL fields, part 3"
INSERT INTO review_votes(submittedBy,refersTo,value)
	VALUES(0,0,NULL);
\! echo "INVALID ARG TEST 4: comment_votes: NULL fields, part 1"
INSERT INTO comment_votes(submittedBy,refersTo,value)
	VALUES(NULL,0,'t');
\! echo "INVALID ARG TEST 5: comment_votes: NULL fields, part 3"
INSERT INTO comment_votes(submittedBy,refersTo,value)
	VALUES(0,NULL,'t');
\! echo "INVALID ARG TEST 6: comment_votes: NULL fields, part 4"
INSERT INTO comment_votes(submittedBy,refersTo,value)
	VALUES(0,0,NULL);
