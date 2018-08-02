\! echo "INVALID ARG TEST 1: duplicate name"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-args-test1', '1 - 50', 'example@gmail.com', 'https://example.com',0);
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-args-test1', '1 - 50', 'example@gmail.com', 'https://example.com',0);

\! echo "INVALID ARG TEST 2: duplicate companyId"
INSERT INTO companies (companyId, name,numEmployees,contactEmail,websiteURL,numFlags) VALUES (1,'invalid-args-test2', '1 - 50', 'example@gmail.com', 'https://example.com',0);

\! echo "INVALID ARG TEST 3: NULL name"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES (NULL, '1 - 50', 'example@gmail.com', 'https://example.com',0);

\! echo "INVALID ARG TEST 4: NULL email"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-args-test4', '1 - 50', NULL, 'https://example.com',0);

\! echo "INVALID ARG TEST 5: invalid numEmployees type 1"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-args-test5', '1 - 5', 'example@gmail.com', 'https://example.com',0);

\! echo "INVALID ARG TEST 6: invalid numEmployees type 2"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-args-test6', '5 - 500', 'example@gmail.com', 'https://example.com',0);

\! echo "INVALID ARG TEST 7: invalid numEmployees type 3"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-args-test7', '501 -2000', 'example@gmail.com', 'https://example.com',0);

\! echo "INVALID ARG TEST 8: invalid numEmployees type 4"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-args-test8', '001 - 5000', 'example@gmail.com', 'https://example.com',0);

\! echo "INVALID ARG TEST 9: invalid numEmployees type 5"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-args-test9', '1000+', 'example@gmail.com', 'https://example.com',0);

\! echo "INVALID ARG TEST 10: undershot arg ranges part 1"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-args-test10', '1 - 50', 'example@gmail.com', 'https://example.com',-1);
