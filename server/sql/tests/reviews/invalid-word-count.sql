\! echo "INVALID WORD COUNT TEST 1: not enough pros"
INSERT INTO reviews
(submittedBy,companyName,companyId,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (0,'a',0,'a','a',0,
			'a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');
\! echo "INVALID WORD COUNT TEST 2: not enough cons"
INSERT INTO reviews
(submittedBy,companyName,companyId,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (0,'a',0,'a','a',0,
			'a a a a a','a a a a',FALSE,
			0,0,0,0,0,'Hello world!');
