\! echo "INVALID ARG TEST 1: duplicate name"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test1', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test1', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 2: NULL name"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES (NULL, '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 3: NULL email"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('invalid-args-test3', '1 - 50', NULL, 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "INVALID ARG TEST 4: duplicate _id"
INSERT INTO companies (_id, name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES (1,'invalid-args-test4', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);
