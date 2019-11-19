-- Change all varchar columns to text.
ALTER TABLE companies ALTER COLUMN name TYPE text;
ALTER TABLE companies ALTER COLUMN industry TYPE text;
ALTER TABLE companies ALTER COLUMN descriptionofcompany TYPE text;
ALTER TABLE companies ALTER COLUMN numemployees TYPE text;
ALTER TABLE companies ALTER COLUMN contactemail TYPE text;
ALTER TABLE companies ALTER COLUMN websiteurl TYPE text;
ALTER TABLE companies ALTER COLUMN contactphonenumber TYPE text;

ALTER TABLE users ALTER COLUMN usermongoid TYPE text;
ALTER TABLE users ALTER COLUMN role TYPE text;

ALTER TABLE reviews ALTER COLUMN companyname TYPE text;
ALTER TABLE reviews ALTER COLUMN reviewtitle TYPE text;
ALTER TABLE reviews ALTER COLUMN jobtitle TYPE text;
ALTER TABLE reviews ALTER COLUMN pros TYPE text;
ALTER TABLE reviews ALTER COLUMN cons TYPE text;
ALTER TABLE reviews ALTER COLUMN additionalcomments TYPE text;

ALTER TABLE review_comments ALTER COLUMN content TYPE text;

ALTER TABLE salaries ALTER COLUMN companyname TYPE text;
ALTER TABLE salaries ALTER COLUMN jobtitle TYPE text;
ALTER TABLE salaries ALTER COLUMN incometype TYPE text;
ALTER TABLE salaries ALTER COLUMN gender TYPE text;

ALTER TABLE jobads ALTER COLUMN companyname TYPE text;
ALTER TABLE jobads ALTER COLUMN jobtitle TYPE text;
ALTER TABLE jobads ALTER COLUMN pesosperhour TYPE text;
ALTER TABLE jobads ALTER COLUMN contracttype TYPE text;
ALTER TABLE jobads ALTER COLUMN jobdescription TYPE text;
ALTER TABLE jobads ALTER COLUMN responsibilities TYPE text;
ALTER TABLE jobads ALTER COLUMN qualifications TYPE text;

ALTER TABLE reward_wrote_a_review ALTER COLUMN phone_number TYPE text;
ALTER TABLE reward_wrote_a_review ALTER COLUMN payment_method TYPE text;
