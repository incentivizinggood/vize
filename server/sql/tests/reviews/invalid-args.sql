\! echo "INVALID ARG TEST 1: NULL fields, part 1"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (NULL,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,0,0,0,0);
\! echo "INVALID ARG TEST 2: NULL fields, part 2"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,NULL,'a','a',0,'a a a a a','a a a a a',FALSE,0,0,0,0,0);
\! echo "INVALID ARG TEST 3: NULL fields, part 3"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a',NULL,'a',0,'a a a a a','a a a a a',FALSE,0,0,0,0,0);
\! echo "INVALID ARG TEST 4: NULL fields, part 4"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a',NULL,0,'a a a a a','a a a a a',FALSE,0,0,0,0,0);
\! echo "INVALID ARG TEST 5: NULL fields, part 5"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',NULL,'a a a a a','a a a a a',FALSE,0,0,0,0,0);
\! echo "INVALID ARG TEST 6: NULL fields, part 6"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,NULL,'a a a a a',FALSE,0,0,0,0,0);
\! echo "INVALID ARG TEST 7: NULL fields, part 7"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a',NULL,FALSE,0,0,0,0,0);
\! echo "INVALID ARG TEST 8: NULL fields, part 8"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',NULL,0,0,0,0,0);
\! echo "INVALID ARG TEST 9: NULL fields, part 9"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,NULL,0,0,0,0);
\! echo "INVALID ARG TEST 10: NULL fields, part 10"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,NULL,0,0,0);
\! echo "INVALID ARG TEST 11: NULL fields, part 11"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,0,NULL,0,0);
\! echo "INVALID ARG TEST 12: NULL fields, part 12"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,0,0,NULL,0);
\! echo "INVALID ARG TEST 13: NULL fields, part 13"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,0,0,0,NULL);
\! echo "INVALID ARG TEST 14: undershot arg ranges, part 1"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',-1,'a a a a a','a a a a a',FALSE,0,0,0,0,0);
\! echo "INVALID ARG TEST 15: undershot arg ranges, part 2"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,-1,0,0,0,0);
\! echo "INVALID ARG TEST 16: undershot arg ranges, part 3"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,-1,0,0,0);
\! echo "INVALID ARG TEST 17: undershot arg ranges, part 4"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,0,-1,0,0);
\! echo "INVALID ARG TEST 18: undershot arg ranges, part 5"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,0,0,-1,0);
\! echo "INVALID ARG TEST 19: undershot arg ranges, part 6"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,0,0,0,-1);
\! echo "INVALID ARG TEST 20: undershot arg ranges, part 7"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction,upvotes)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,0,0,0,0,-1);
\! echo "INVALID ARG TEST 21: overshot arg ranges, part 8"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction,downvotes)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,0,0,0,0,-1);
\! echo "INVALID ARG TEST 22: overshot arg ranges, part 2"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,6,0,0,0,0);
\! echo "INVALID ARG TEST 23: overshot arg ranges, part 3"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,6,0,0,0);
\! echo "INVALID ARG TEST 24: overshot arg ranges, part 4"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,0,6,0,0);
\! echo "INVALID ARG TEST 25: overshot arg ranges, part 5"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,0,0,6,0);
\! echo "INVALID ARG TEST 26: overshot arg ranges, part 6"
INSERT INTO reviews(submittedBy,companyName,reviewTItle,
					jobTitle,numMonthsWorked,pros,cons,
					wouldRecommend,healthAndSafety,
					managerRelationship,workEnvironment,
					benefits,overallSatisfaction)
	VALUES (0,'a','a','a',0,'a a a a a','a a a a a',FALSE,0,0,0,0,6);

\! echo "INVALID ARG TEST 27: duplicate _id"
-- rehash of the first acceptance test insertion,
-- _id field should conflict if the other tests were run first
INSERT INTO reviews
(_id,submittedBy,companyName,companyId,
	reviewTitle,jobTitle,numMonthsWorked,
	pros,cons,wouldRecommend,healthAndSafety,
	managerRelationship,workEnvironment,benefits,
	overallSatisfaction,additionalComments)
	VALUES (1,0,'a',0,
			'a','a',0,
			'a a a a a','a a a a a',FALSE,
			0,0,0,0,0,'Hello world!');
