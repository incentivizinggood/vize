\! echo "ACCEPTANCE TEST 1: review"
INSERT INTO votes(submittedBy,voteSubject,refersTo,value)
	VALUES (0,'review',0,'t');
\! echo "ACCEPTANCE TEST 2: comment"
INSERT INTO votes(submittedBy,voteSubject,refersTo,value)
	VALUES (0,'comment',0,'f');
