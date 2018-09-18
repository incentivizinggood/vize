\! echo "ACCEPTANCE TEST 1: review"
INSERT INTO review_votes(submittedBy,refersTo,value)
	VALUES (0,0,'t');
\! echo "ACCEPTANCE TEST 2: comment"
INSERT INTO comment_votes(submittedBy,refersTo,value)
	VALUES (0,0,'f');
