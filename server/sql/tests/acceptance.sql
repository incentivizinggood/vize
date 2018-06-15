\! echo "ACCEPTANCE TEST 1: valid numEmployees 1 - 50"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('test1', '1 - 50', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "ACCEPTANCE TEST 2: valid numEmployees 51 - 500"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('test2', '51 - 500', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "ACCEPTANCE TEST 3: valid numEmployees 501 - 2000"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('test3', '501 - 2000', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "ACCEPTANCE TEST 4: valid numEmployees 2001 - 5000"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('test4', '2001 - 5000', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "ACCEPTANCE TEST 5: valid numEmployees 5000+"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('test5', '5000+', 'example@gmail.com', 'https://example.com',0,0,0,0,0,0,0,0,0);

\! echo "ACCEPTANCE TEST 6: valid numeric field range limits"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags,numReviews, avgNumMonthsWorked,percentRecommended,healthAndSafety,managerRelationship,workEnvironment,benefits,overallSatisfaction) VALUES ('test6', '1 - 50', 'example@gmail.com', 'https://example.com',9000,9000,9000.9999,1.0,5.0,5.0,5.0,5.0,5.0);
