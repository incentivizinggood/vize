-- In case anyone was wondering, here are some features that PostgreSQL
-- has that MariaDB and other MySQL-ites don't:
-- -> Deferrable constraints
-- -> Check constraints

-- company profiles
DROP TABLE IF EXISTS companies CASCADE;
CREATE TABLE companies (
	_id					serial			PRIMARY KEY,
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
	companyName			varchar(190)
		REFERENCES companies (name)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	locationName		varchar(190),
	PRIMARY KEY (companyName, locationName)
);

-- NOTE submittedBy fields are numeric in this implementation,
-- but could be displayed on the website as "user[submittedBy]"
-- in place of a screen name
-- QUESTION how to fill in the submittedBy field for users that
-- don't have accounts yet, especially as I don't yet know how the
-- accounts will be implemented in the full-SQL version?
-- QUESTION what if I do it by translating users.js to PostgreSQL
-- like the other schema files? Then how would we handle the transition stage?

-- reviews about companies
DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews (
	_id					serial			PRIMARY KEY,
	-- QUESTION
	-- Does this field have to be compatible with
	-- the current Mongo setup?
	submittedBy			integer			NOT NULL, -- same size as serial, references the poster's ID, may be 0  or -1 if they don't have an account
	-- QUESTION
	-- Logically these bext two fields are foreign keys, but how to handle
	-- the desired exception cases (where someone can leave a review
	-- for a company that has no profile yet)? Two options:
	-- 0) Wait, is this even a problem since the fields aren't declared NOT NULL?
	--		Logically the only separation between cases is session flow, so
	--		it might make sense to leave these fields as optional since the
	--		database doesn't care about session flow.
	-- 1) TRIGGER to check for a profile, if it doesn't exist then
	--		create a dummy one, perhaps with a special flag
	-- 2) DISABLE TRIGGERS, perform the desired insertion, then reenable
	--		triggers. Not sure if this is viable, it will only work if
	--		ALTER TABLE doesn't auto-commit the transaction, and only if
	--		we can make sure that the transaction has an Xlock on this table.
	companyName			varchar(190)
		REFERENCES companies(name)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	companyId			integer
		REFERENCES companies (_id)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	-- QUESTION This next field is supposed to be indexed, how to do that?
	reviewTitle			varchar(101)	NOT NULL, -- character count is 1 more than the Mongo version, allowing for null-terminator
	jobTitle			varchar(101)	NOT NULL,
	numMonthsWorked		smallint		NOT NULL CHECK (numMonthsWorked >= 0),
	pros				varchar(201)	NOT NULL, -- check 5 words
	cons				varchar(201)	NOT NULL, -- check 5 words
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

	-- NOTE Locations go here, need another table with special triggers on it
	-- NOTE Comments go here, need another table with another set of triggers
);

-- normalized review locations
DROP TABLE IF EXISTS review_locations CASCADE;
CREATE TABLE review_locations (
	reviewId			integer			NOT NULL
		REFERENCES reviews(_id)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	locationName		varchar(190),
	PRIMARY KEY (reviewId,locationName)
);

DROP TABLE IF EXISTS review_comments CASCADE;
CREATE TABLE review_comments (
	-- QUESTION this first field should be an index, how to do that?
	reviewId			integer			NOT NULL
		REFERENCES reviews(_id)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	submittedBy			integer			NOT NULL, -- same size as serial, references the poster's ID, may be 0 or -1 if they don't have an account
	datePosted			date			DEFAULT now(),
	content				text			NOT NULL,
	upvotes				integer			DEFAULT 0 CHECK (upvotes >= 0),
	downvotes			integer			DEFAULT 0 CHECK (downvotes >= 0)
);
