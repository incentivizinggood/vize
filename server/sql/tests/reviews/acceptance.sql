\! echo "ACCEPTANCE TEST 1: all non-default-valued fields"
INSERT INTO reviews
(submittedBy,companyName,companyId,reviewLocation,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (0,'a',0,'a','a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');

\! echo "ACCEPTANCE TEST 2: only non-null fields, numeric range limits"
INSERT INTO reviews
(submittedBy,companyName,reviewLocation,reviewTitle,jobTitle,
	numMonthsWorked,pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction)
	VALUES (1,'a','a','a','a',9999,
			'a a a a a','a a a a a',TRUE,
			5,5,5,5,5);
