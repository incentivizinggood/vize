\! echo "ACCEPTANCE TEST 1: all non-default-valued fields"
INSERT INTO review
(submittedBy,companyName,companyId,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (0,"Vize",0,
			"a","a",0,
			"a a a a a","a a a a a",1
			0,0,0,0,0);

\! echo "ACCEPTANCE TEST 2: only non-null fields, numeric range limits"
INSERT INTO review
(submittedBy,reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction)
	VALUES ()
