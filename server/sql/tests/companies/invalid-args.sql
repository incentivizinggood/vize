\! echo "INVALID ARG TEST 1: duplicate name"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test1', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test1', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 2: duplicate companyId"
INSERT INTO companies (companyId, name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES (1,'invalid-args-test2', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 3: NULL name"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES (NULL, '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 4: NULL email"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test4', '1 - 50', NULL, 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 5: invalid numEmployees type 1"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test5', '1 - 5', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 6: invalid numEmployees type 2"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test6', '5 - 500', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 7: invalid numEmployees type 3"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test7', '501 -2000', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 8: invalid numEmployees type 4"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test8', '001 - 5000', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 9: invalid numEmployees type 5"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test9', '1000+', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 10: undershot arg ranges part 1"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test10', '1 - 50', 'example@gmail.com', 'https://example.com',-1,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 11: undershot arg ranges part 2"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test11', '1 - 50', 'example@gmail.com', 'https://example.com',0,-1,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 12: undershot arg ranges part 3"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test12', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,-1,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 13: undershot arg ranges part 4"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test13', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,-1,0,0,0,0,0);

\! echo "INVALID ARG TEST 14: undershot arg ranges part 5"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test14', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,-1,0,0,0,0);

\! echo "INVALID ARG TEST 15: undershot arg ranges part 6"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test15', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,-1,0,0,0);

\! echo "INVALID ARG TEST 16: undershot arg ranges part 7"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test16', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,-1,0,0);

\! echo "INVALID ARG TEST 17: undershot arg ranges part 8"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test17', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,-1,0);

\! echo "INVALID ARG TEST 18: undershot arg ranges part 9"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test18', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,-1);

\! echo "INVALID ARG TEST 19: overshot arg ranges part 1"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test13', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,1.1,0,0,0,0,0);

\! echo "INVALID ARG TEST 20: overshot arg ranges part 2"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test14', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,5.1,0,0,0,0);

\! echo "INVALID ARG TEST 21: overshot arg ranges part 3"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test15', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,5.1,0,0,0);

\! echo "INVALID ARG TEST 22: overshot arg ranges part 4"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test16', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,5.1,0,0);

\! echo "INVALID ARG TEST 23: overshot arg ranges part 5"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test17', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,5.1,0);

\! echo "INVALID ARG TEST 24: overshot arg ranges part 6"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test18', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,5.1);
