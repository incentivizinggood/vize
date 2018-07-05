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
--
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
	numFlags			int				DEFAULT 0 CHECK (numFlags >= 0)
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
	--
	-- NOTE
	-- Forget all that, I have an even better idea.
	-- companyName is required in all cases, but in the "exception" case,
	-- there will be no companyId. So logically it would seem like
	-- this translates to companyName being a required field,
	-- with companyId as an optional foreign key field. If the case is
	-- not the exception case, then we would expect the caller
	-- to provide the companyid.
	-- Then the only caveat is users leaving reviews for companies
	-- in the non-exception case where the name given does not match
	-- the recorded name of the company with that id. This can be handled
	-- either in a trigger or by the caller.
	-- This may make it necessary to allow the companyName field to be
	-- updated for correction in case of typos, or to be automatically
	-- updated when a companyid is supplied.
	-- Of course, this will not be enough to catch all mistakes made
	-- in the exception case, but at that point I'm afraid we'll have
	-- to rely on good UI or "manual correction".
	-- Although, logically it seems to makes sense that reviews for
	-- companies with different names would be treated as reviews for
	-- different companies: that's just taking the user at their word,
	-- and in that light it makes perfect sense to offload the burden of
	-- mistake-checking to either them or the front-end.
	companyName			varchar(110)	NOT NULL
		REFERENCES companies (name)
		-- should we really cascade on delete,
		-- or leave the reviews of deleted companies?
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	companyId			integer
		REFERENCES companies (companyId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	reviewLocation		varchar(160)	NOT NULL,
	-- QUESTION this next field might be a good index, should we do that and how?
	reviewTitle			varchar(110)	NOT NULL, -- character count is 1 more than the Mongo version, allowing for null-terminator
	jobTitle			varchar(110)	NOT NULL,
	numMonthsWorked		smallint		NOT NULL CHECK (numMonthsWorked >= 0),
	pros				varchar(210)	NOT NULL CHECK (word_count(pros) >= 5),
	cons				varchar(210)	NOT NULL CHECK (word_count(cons) >= 5),
	wouldRecommend		boolean			NOT NULL,
	healthAndSafety		float(2)		NOT NULL CHECK (healthAndSafety >= 0 AND healthAndSafety <= 5),
	managerRelationship	float(2)		NOT NULL CHECK (managerRelationship >= 0 AND managerRelationship <= 5),
	workEnvironment		float(2)		NOT NULL CHECK (workEnvironment >= 0 AND workEnvironment <= 5),
	benefits			float(2)		NOT NULL CHECK (benefits >= 0 AND benefits <= 5),
	overallSatisfaction	float(2)		NOT NULL CHECK (overallSatisfaction >= 0 AND overallSatisfaction <= 5),
	additionalComments	varchar(6010),
	dateJoined			date			DEFAULT now()
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
	content				varchar(6010)	NOT NULL
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
	salaryLocation		varchar(160)	NOT NULL,
	jobTitle			varchar(110)	NOT NULL,
	-- This confuses me. I should think that jobTitle
	-- would determine income type, and income type
	-- introduces yet another variable into the calculation
	-- of statistics that is both hard to handle internally
	-- and tricky to represent on the frontend. Do we need it?
	-- Further, Julian's proposed salary stats display
	-- does not make use of it.
	incomeType			varchar(20)		NOT NULL CHECK (incomeType='Yearly Salary' OR incomeType='Monthly Salary' OR incomeType='Hourly Wage'),
	incomeAmount		float(2)		NOT NULL CHECK (incomeAmount >= 0),
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

-- votes on reviews
DROP TABLE IF EXISTS review_votes CASCADE;
CREATE TABLE review_votes (
	-- do we need a vote id field?
	submittedBy			integer			NOT NULL, -- user ID
	refersTo			integer			NOT NULL
		REFERENCES reviews (reviewid)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (submittedBy,refersTo), -- one vote per user per item
	value				boolean			NOT NULL
);

-- votes on comments
DROP TABLE IF EXISTS comment_votes CASCADE;
CREATE TABLE comment_votes (
	-- do we need a vote id field?
	submittedBy			integer			NOT NULL, -- user ID
	refersTo			integer			NOT NULL
		REFERENCES review_comments (commentid)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (submittedBy,refersTo), -- one vote per user per item
	value				boolean			NOT NULL
);
