\! echo "INVALID REGEX TEST 1: (Email with TLD)"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-regex-test1', '1 - 50', 'examplegmail.com', 'https://example.com',0);

\! echo "INVALID REGEX TEST 2: (Email with TLD)"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-regex-test2', '1 - 50', 'example@gmailcom', 'https://example.com',0);

\! echo "INVALID REGEX TEST 3: (Email with TLD)"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-regex-test3', '1 - 50', 'example@gmail.c', 'https://example.com',0);

\! echo "INVALID REGEX TEST 4: (Email with TLD)"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-regex-test4', '1 - 50', '@gmail.com', 'https://example.com',0);

\! echo "INVALID REGEX TEST 5: (URL)"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-regex-test5', '1 - 50', 'example@gmail.com', 'https//example.com',0);

\! echo "INVALID REGEX TEST 6: (URL)"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-regex-test6', '1 - 50', 'example@gmail.com', 'https://examplecom',0);

\! echo "INVALID REGEX TEST 7: (URL)"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-regex-test7', '1 - 50', 'example@gmail.com', 'https:/example.com',0);

\! echo "INVALID REGEX TEST 8: (URL)"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-regex-test8', '1 - 50', 'example@gmail.com', 'https:example.com',0);

\! echo "INVALID REGEX TEST 9: (URL)"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-regex-test9', '1 - 50', 'example@gmail.com', 'https://example.c',0);

\! echo "INVALID REGEX TEST 10: (URL)"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-regex-test10', '1 - 50', 'example@gmail.com', 'https://.com',0);

\! echo "INVALID REGEX TEST 11: (URL)"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-regex-test11', '1 - 50', 'example@gmail.com', 'fttps://example.com',0);

\! echo "INVALID REGEX TEST 12: (URL)"
INSERT INTO companies (name,numEmployees,contactEmail,websiteURL,numFlags) VALUES ('invalid-regex-test12', '1 - 50', 'example@gmail.com', '://example.com',0);
