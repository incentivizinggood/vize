-- In case anyone was wondering, here are some features that PostgreSQL
-- has that MariaDB and other MySQL-ites don't:
-- -> Deferrable constraints
-- -> Check constraints
-- -> DDL and DML statements that never commit transactions without asking permission
-- TODO:
-- 1) Refactor the location-counting functions and triggers to be more reusable
-- 2) add users.js to your list of JS files to "translate" to postgres
--		-> user-related SQL fields will reference it
--		-> will be nice if it can be used alongside current user accounts
--			before they are replaced by GraphQL

-- company profiles
DROP TABLE IF EXISTS companies CASCADE;
CREATE TABLE companies (
	companyId			serial			PRIMARY KEY,
	name				varchar(190)	UNIQUE NOT NULL,
	dateJoined			date			DEFAULT now(),
	vizeProfileUrl		varchar(255),
	vizeReviewUrl		varchar(255),
	vizeSalaryUrl		varchar(255),
	vizePostJobUrl		varchar(255),
	dateEstablished		date,
	industry			varchar(60),
	otherContactInfo	varchar(255),
	descriptionOfCompany	text,

	-- Other validity onstraints are straightforward via CHECK,
	-- I love that PostgreSQL actually supports this
	-- allowed brackets for numEmployees
	numEmployees		varchar(20)		CHECK (numEmployees IS NULL OR numEmployees='1 - 50' OR numEmployees='51 - 500' OR numEmployees='501 - 2000' OR numEmployees='2001 - 5000' OR numEmployees='5000+'),
	-- regex CHECK constraint for email (with TLD) validity
	contactEmail		varchar(255)	NOT NULL CHECK (is_valid_email_with_tld(contactEmail)),
	-- regex CHECK constraint for URL validity, a bit different
	-- from the email check because websiteURL is not a required field
	websiteURL			varchar(255)	CHECK (websiteURL IS NULL OR is_valid_url(websiteURL)),
	numFlags			int				DEFAULT 0 CHECK (numFlags >= 0),
	numReviews			int				DEFAULT 0 CHECK (numReviews >= 0),
	avgNumMonthsWorked	float			DEFAULT 0 CHECK (avgNumMonthsWorked >= 0),
	percentRecommended	float			DEFAULT 0 CHECK (percentRecommended >= 0 AND percentRecommended <= 1),
	healthAndSafety		float			DEFAULT 0 CHECK (healthAndSafety >= 0 AND healthAndSafety <= 5),
	managerRelationship	float			DEFAULT 0 CHECK (managerRelationship >= 0 AND managerRelationship <= 5),
	workEnvironment		float			DEFAULT 0 CHECK (workEnvironment >= 0 AND workEnvironment <= 5),
	benefits			float			DEFAULT 0 CHECK (benefits >= 0 AND benefits <= 5),
	overallSatisfaction	float			DEFAULT 0 CHECK (overallSatisfaction >= 0 AND overallSatisfaction <= 5)
);

-- normalized company locations
DROP TABLE IF EXISTS company_locations CASCADE;
CREATE TABLE company_locations (
	companyId			integer
		REFERENCES companies (companyId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	locationName		varchar(190),
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
	companyName			varchar(190)	NOT NULL
		REFERENCES companies(name)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	companyId			integer
		REFERENCES companies (companyId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	-- QUESTION this next field might be a good index, should we do that and how?
	reviewTitle			varchar(101)	NOT NULL, -- character count is 1 more than the Mongo version, allowing for null-terminator
	jobTitle			varchar(101)	NOT NULL,
	numMonthsWorked		smallint		NOT NULL CHECK (numMonthsWorked >= 0),
	pros				varchar(201)	NOT NULL CHECK (word_count(pros) >= 5),
	cons				varchar(201)	NOT NULL CHECK (word_count(cons) >= 5),
	wouldRecommend		boolean			NOT NULL,
	healthAndSafety		float			NOT NULL CHECK (healthAndSafety >= 0 AND healthAndSafety <= 5),
	managerRelationship	float			NOT NULL CHECK (managerRelationship >= 0 AND managerRelationship <= 5),
	workEnvironment		float			NOT NULL CHECK (workEnvironment >= 0 AND workEnvironment <= 5),
	benefits			float			NOT NULL CHECK (benefits >= 0 AND benefits <= 5),
	overallSatisfaction	float			NOT NULL CHECK (overallSatisfaction >= 0 AND overallSatisfaction <= 5),
	additionalComments	text,
	dateJoined			date			DEFAULT now(),
	upvotes				integer			DEFAULT 0 CHECK (upvotes >= 0),
	downvotes			integer			DEFAULT 0 CHECK (downvotes >= 0)
);

-- normalized review locations
DROP TABLE IF EXISTS review_locations CASCADE;
CREATE TABLE review_locations (
	reviewId			integer			NOT NULL
		REFERENCES reviews(reviewId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	reviewLocation		varchar(190),
	PRIMARY KEY (reviewId,reviewLocation)
);

-- normalized review comments
DROP TABLE IF EXISTS review_comments CASCADE;
CREATE TABLE review_comments (
	-- QUESTION this first field might be a good index, should we do that and how?
	reviewId			integer			NOT NULL
		REFERENCES reviews(reviewId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	submittedBy			integer			NOT NULL, -- same size as serial, references the poster's ID, may be 0 or -1 if they don't have an account
	datePosted			date			DEFAULT now(),
	content				text			NOT NULL,
	upvotes				integer			DEFAULT 0 CHECK (upvotes >= 0),
	downvotes			integer			DEFAULT 0 CHECK (downvotes >= 0)
);
