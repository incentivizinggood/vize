-- In case anyone was wondering, here are some features that PostgreSQL
-- has that MariaDB and other MySQL-ites don't:
-- -> Deferrable constraints
-- -> Check constraints
-- -> DDL and DML statements that never commit transactions without asking permission
-- TODO:
-- - Add users.js to your list of JS files to "translate" to postgres
--		-> user-related SQL fields will reference it
--		-> will be nice if it can be used alongside current user accounts
--			before they are replaced by GraphQL
-- - Figure out how to fill in the vize*Url fields
-- - Figure out how long comments and other text fields ought to be

-- WARNING --
-- Let the reader beware:
-- camelCase is used in this file for readability, but
-- *NOTE* while  SQL dialects are weakly typed,
-- the table, field, trigger, constraint, and function
-- names are converted entirely to lowercase. *NOTE*
-- This actually can cause strange null pointer
-- exceptions when working with plv8 code.
-- If in doubt, use all lowercase or snakecase
-- when writing queries or stored function code.
-- WARNING --

-- company profiles
DROP TABLE IF EXISTS companies CASCADE;
CREATE TABLE companies (
	companyId			serial			PRIMARY KEY,
	name				varchar(110)	UNIQUE NOT NULL,
	dateJoined			date			DEFAULT now(),
	vizeProfileUrl		text, -- need to make sure this gets initialized
	vizeReviewUrl		text, -- need to make sure this gets initialized
	vizeSalaryUrl		text, -- need to make sure this gets initialized
	vizePostJobUrl		text, -- need to make sure this gets initialized
	dateEstablished		date,
	industry			varchar(60),
	otherContactInfo	varchar(210),
	descriptionOfCompany	varchar(6010),

	-- Other validity onstraints are straightforward via CHECK,
	-- I love that PostgreSQL actually supports this
	-- allowed brackets for numEmployees
	numEmployees		varchar(20)		CHECK (numEmployees IS NULL OR numEmployees='1 - 50' OR numEmployees='51 - 500' OR numEmployees='501 - 2000' OR numEmployees='2001 - 5000' OR numEmployees='5000+'),
	-- regex CHECK constraint for email (with TLD) validity
	contactEmail		varchar(110)	NOT NULL CHECK (is_valid_email_with_tld(contactEmail)),
	-- regex CHECK constraint for URL validity, a bit different
	-- from the email check because websiteURL is not a required field
	websiteURL			varchar(255)	CHECK (websiteURL IS NULL OR is_valid_url(websiteURL)),
	numFlags			int				DEFAULT 0 CHECK (numFlags >= 0),
	numReviews			int				DEFAULT 0 CHECK (numReviews >= 0),
	avgNumMonthsWorked	float(2)			DEFAULT 0 CHECK (avgNumMonthsWorked >= 0),
	percentRecommended	float(2)			DEFAULT 0 CHECK (percentRecommended >= 0 AND percentRecommended <= 1),
	healthAndSafety		float(2)			DEFAULT 0 CHECK (healthAndSafety >= 0 AND healthAndSafety <= 5),
	managerRelationship	float(2)			DEFAULT 0 CHECK (managerRelationship >= 0 AND managerRelationship <= 5),
	workEnvironment		float(2)			DEFAULT 0 CHECK (workEnvironment >= 0 AND workEnvironment <= 5),
	benefits			float(2)			DEFAULT 0 CHECK (benefits >= 0 AND benefits <= 5),
	overallSatisfaction	float(2)			DEFAULT 0 CHECK (overallSatisfaction >= 0 AND overallSatisfaction <= 5)
);

-- normalized company locations
DROP TABLE IF EXISTS company_locations CASCADE;
CREATE TABLE company_locations (
	companyId			integer
		REFERENCES companies (companyId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	locationName		varchar(160),
	PRIMARY KEY (companyId, locationName)
);

-- NOTE submittedBy fields are numeric in this implementation,
-- but could be displayed on the website as "user[submittedBy]"
-- in place of a screen name

-- reviews about companies
DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews (
	reviewId			serial			PRIMARY KEY,
	-- QUESTION (related to users table implementation)
	-- Does this field have to be compatible with
	-- the current Mongo setup?
	-- QUESTION Are users allowed to submit more than
	-- one review per company? If not, we could use
	-- (submittedBy,companyName) as the primary key.
	submittedBy			integer			NOT NULL, -- same size as serial, references the poster's ID, may be 0  or -1 if they don't have an account
	-- QUESTION
	-- Logically these bext two fields are foreign keys, but how to handle
	-- the desired exception cases (where someone can leave a review
	-- for a company that has no profile yet)? Two options:
	-- 0) Wait, is this even a problem since the fields aren't declared NOT NULL?
	--		Logically the only separation between cases is session flow, so
	--		it might make sense to leave these fields as optional since the
	--		database doesn't care about session flow.
	-- -> FALSE, companyName is NOT NULL, that was a mistake earlier.
	-- 1) TRIGGER to check for a profile, if it doesn't exist then
	--		create a dummy one, perhaps with a special flag
	-- -> This is going to be fugly.
	-- 2) DISABLE TRIGGERS, perform the desired insertion, then reenable
	--		triggers. Not sure if this is viable, it will only work if
	--		ALTER TABLE doesn't auto-commit the transaction, and only if
	--		we can make sure that the transaction has an Xlock on this table.
	-- -> It indeed does not, and you can request ACCESS EXCLUSIVE.
	--		Did I mention that I love PostgreSQL?
	companyName			varchar(110)	NOT NULL
		REFERENCES companies (name)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	companyId			integer
		REFERENCES companies (companyId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	-- QUESTION this next field might be a good index, should we do that and how?
	reviewTitle			varchar(110)	NOT NULL, -- character count is 1 more than the Mongo version, allowing for null-terminator
	jobTitle			varchar(110)	NOT NULL,
	numMonthsWorked		smallint		NOT NULL CHECK (numMonthsWorked >= 0),
	pros				varchar(210)	NOT NULL CHECK (word_count(pros) >= 5),
	cons				varchar(210)	NOT NULL CHECK (word_count(cons) >= 5),
	wouldRecommend		boolean			NOT NULL,
	healthAndSafety		float(2)			NOT NULL CHECK (healthAndSafety >= 0 AND healthAndSafety <= 5),
	managerRelationship	float(2)			NOT NULL CHECK (managerRelationship >= 0 AND managerRelationship <= 5),
	workEnvironment		float(2)			NOT NULL CHECK (workEnvironment >= 0 AND workEnvironment <= 5),
	benefits			float(2)			NOT NULL CHECK (benefits >= 0 AND benefits <= 5),
	overallSatisfaction	float(2)			NOT NULL CHECK (overallSatisfaction >= 0 AND overallSatisfaction <= 5),
	additionalComments	varchar(6010),
	dateJoined			date			DEFAULT now(),
	upvotes				integer			DEFAULT 0 CHECK (upvotes >= 0),
	downvotes			integer			DEFAULT 0 CHECK (downvotes >= 0)
);

-- normalized review locations
DROP TABLE IF EXISTS review_locations CASCADE;
CREATE TABLE review_locations (
	reviewId			integer			NOT NULL
		REFERENCES reviews (reviewId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	reviewLocation		varchar(160),
	PRIMARY KEY (reviewId,reviewLocation)
);

-- normalized review comments
DROP TABLE IF EXISTS review_comments CASCADE;
CREATE TABLE review_comments (
	commentId			serial			PRIMARY KEY, -- needed for voting
	-- QUESTION this first field might be a good index, should we do that and how?
	reviewId			integer			NOT NULL
		REFERENCES reviews (reviewId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	submittedBy			integer			NOT NULL, -- same size as serial, references the poster's ID, may be 0 or -1 if they don't have an account
	datePosted			date			DEFAULT now(),
	-- We may want to discuss the maximum allowable size of comments,
	-- I'm not sure if ~250 characters is enough but > 6000 (text) seems excessive.
	content				varchar(6010)	NOT NULL,
	upvotes				integer			DEFAULT 0 CHECK (upvotes >= 0),
	downvotes			integer			DEFAULT 0 CHECK (downvotes >= 0)
);

-- salary reports about companies
DROP TABLE IF EXISTS salaries CASCADE;
CREATE TABLE salaries (
	salaryId			serial			PRIMARY KEY,
	submittedBy			integer			NOT NULL,
	companyName			varchar(110)	NOT NULL
		REFERENCES companies (name)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	companyId			integer
		REFERENCES companies (companyId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	jobTitle			varchar(110)	NOT NULL,
	incomeType			varchar(20)		NOT NULL CHECK (incomeType='Yearly Salary' OR incomeType='Monthly Salary' OR incomeType='Hourly Wage'),
	incomeAmount		float(2)			NOT NULL CHECK (incomeAmount >= 0),
	gender				varchar(10)		CHECK (gender IS NULL OR gender='Male' OR gender='Female'),
	datePosted			date			DEFAULT now()
);

-- job ads posted by companies
DROP TABLE IF EXISTS jobads CASCADE;
CREATE TABLE jobads (
	jobadId				serial			PRIMARY KEY,
	companyName			varchar(110)	NOT NULL
		REFERENCES companies (name)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	companyId			integer
		REFERENCES companies (companyId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	vizeApplyForJobUrl	text, -- need to make sure this gets initialized
	jobTitle			varchar(110)	NOT NULL,
	pesosPerHour		varchar(40)		NOT NULL CHECK (is_valid_pay_range(pesosPerHour)),
	contractType		varchar(20)		NOT NULL CHECK (contractType='Full time' OR contractType='Part time' OR contractType='Contractor'),
	jobDescription		varchar(6010)	NOT NULL,
	responsibilities	varchar(6010)	NOT NULL,
	qualifications		varchar(6010)	NOT NULL,
	dateposted			date			DEFAULT now()
);

-- normalized job locations
DROP TABLE IF EXISTS job_locations CASCADE;
CREATE TABLE job_locations (
	jobadId			integer				NOT NULL
		REFERENCES jobads (jobadId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	jobLocation		varchar(160),
	PRIMARY KEY (jobadId,jobLocation)
);

-- votes on reviews and comments ("upvotes" and "downvotes")
DROP TABLE IF EXISTS votes CASCADE;
CREATE TABLE votes (
	-- do we need a vote id field?
	submittedBy			integer			NOT NULL, -- user ID
	voteSubject			varchar(10)		NOT NULL CHECK (voteSubject='review' OR voteSubject='comment'), -- what the vote is about
	refersTo			integer			NOT NULL, -- id of the review or comment in question
	PRIMARY KEY (submittedBy,voteSubject,refersTo), -- one vote per user per item
	-- requires a special trigger for a special multiplexed foreign key constraint
	value				boolean			NOT NULL
);
