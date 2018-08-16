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
	dateAdded			date			DEFAULT now(),
	-- While there are range constraints for year
	-- on the frontend, they are mostly "plausibility
	-- constraints" and don't much matter to us here
	-- on the backend because of how mutable they are.
	-- In fact they change every year at the exact same time.
	yearEstablished		int,
	industry			varchar(60),
	descriptionOfCompany	varchar(6010),
	-- Other validity onstraints are straightforward via CHECK,
	-- I love that PostgreSQL actually supports this
	-- allowed brackets for numEmployees
	numEmployees		varchar(20)		CHECK (numEmployees IS NULL OR numEmployees='1 - 50' OR numEmployees='51 - 500' OR numEmployees='501 - 2000' OR numEmployees='2001 - 5000' OR numEmployees='5000+'),
	-- regex CHECK constraint for email (with TLD) validity
	contactEmail		varchar(110)	NOT NULL CHECK (is_valid_email_with_tld(contactEmail)),
	-- regex CHECK constraint for URL and phone no. validity, a bit different
	-- from the email check because websiteURL is not a required field
	websiteURL			varchar(255)	CHECK (websiteURL IS NULL OR is_valid_url(websiteURL)),
	contactPhoneNumber	varchar(30)		CHECK (contactPhoneNumber IS NULL OR is_valid_phone_number(contactPhoneNumber)),
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

-- NOTE We're not actually managing user accounts in PostgreSQL
-- at this stage, but this table might be handy when we do.
-- In any case, right now it helps us handle Mongo/Postgres
-- compatibility by allowing us to translate user ID's from
-- one DBMS to the other.
-- NOTE Here are some features of the current SimplSchema for
-- Meteor.users (imports/api/data/users.js) that I'm
-- not going to worry about for now:
-- -> keeping track of the emails array, since this requires
--		normalization and thus an additional table
-- -> username, because it isn't really used
-- -> services, because it isn't really used and there
--		are no real specifications for it
-- QUESTION So, now that we're here, how to actually do
-- the submittedBy fields for the other documents?
-- I think that reviews and salaries should have it as
-- an optional foreign key field, so that it can be NULL
-- instead of having to be adjusted to a unique value
-- when not provided, which would mean having to initialize
-- the users table a particular way in order to accommodate
-- truly anonymous submissions.
-- This is a moot point for jobads, which already have
-- companyId as a required foreign key.
-- That leaves comments and votes.
-- Comments can probably be handled in the same way as
-- reviews and salaries, for the same reason.
-- Votes is trickier because submittedBy is part of the
-- primary key, which doesn't readily accommodate anonymous
-- voting (only one person could cast a vote with submittedBy = NULL,
-- and then the constraint would prevent further such
-- NULL votes). But I guess if we wanted votes to be anonymous
-- then we could implement privacy guards higher up the
-- stack, and it makes sense to require users to have
-- accounts before voting.
-- So, for the PostgreSQL migration, we have the following
-- changes to the submittedBy field in the various tables:
-- reviews: optional foreign key to users
-- salaries: optional foreign key to users
-- jobads: N/A
-- companies: N/A
-- review_comments: optional foreign key to users
-- review/comment_votes: required foreign key to users
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
	userId				serial			PRIMARY KEY,
	-- the _id field in the Mongo document
	-- corresponding to this user tuple
	userMongoId			varchar(50)		UNIQUE,

	role				varchar(30)		NOT NULL CHECK (role='worker' OR role='company-unverified' OR role='company'),
	companyid			integer			UNIQUE
		REFERENCES companies (companyId)
		ON UPDATE CASCADE ON DELETE SET NULL
		DEFERRABLE INITIALLY DEFERRED,
	dateAdded			date			DEFAULT now(),
	CHECK ( -- can't have workers with company profiles
		(companyid IS NULL)
		OR role='company' OR role='company-unverified')
);

-- Dummy user to (temporarily?) allow the submitting
-- of reviews, salaries, votes, and comments but users
-- who do not have an account yet...such as the kind
-- folk who submitted the first reviews on the site.
-- BUG? Hopefully won't run into issues with there not being
-- an associated Mongo account (this is untested)...
-- NOTE: UPDATE: this thing was starting to bug me, so
-- I'm commenting it out for now to see if we can get along
-- without it
-- INSERT INTO users (userid,role) VALUES (-1,'worker');

-- NOTE submittedBy fields are numeric in this implementation,
-- but could be displayed on the website as "user[submittedBy]"
-- in place of a screen name

-- NOTE So, reviews and salaries have some interesting requirements.
-- On the one hand we need to be able to aggregate review and salary
-- data about an individual company, and logically each review and salary
-- must have a corresponding company. However, they want users to be able
-- to submit reviews and salaries for companies that don't have profiles,
-- so it's not as simple as just using foreign keys. Here's what
-- I've come up with:
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
-- -> NOTE could probably just assume that id trumps name
-- and autocorrect in a before-insert trigger
-- Of course, this will not be enough to catch all mistakes made
-- in the exception case, but at that point I'm afraid we'll have
-- to rely on good UI or "manual correction".
-- Although, logically it seems to makes sense that reviews for
-- companies with different names would be treated as reviews for
-- different companies: that's just taking the user at their word,
-- and in that light it makes perfect sense to offload the burden of
-- mistake-checking to either them or the front-end.

-- reviews about companies
DROP TABLE IF EXISTS reviews CASCADE;
CREATE TABLE reviews (
	reviewId			serial			PRIMARY KEY,
	-- NOTE: this value CAN BE NULL, as would be
	-- the case with reviews and salaries submitted
	-- from the home page by users who do not have
	-- accounts or are not logged in
	submittedBy			integer
		REFERENCES users (userId)
		ON UPDATE CASCADE ON DELETE SET NULL
		DEFERRABLE INITIALLY DEFERRED,
	-- companyName: non-FK required field
	-- companyId: optional FK field
	-- needed triggers:
	-- 1) fix name to match id (on insert AND on update)
	-- 2) supply id if name matches a company
	companyName			varchar(110)	NOT NULL,
	-- NOTE: a user may submit only one review per
	-- company if they are logged in to their account,
	-- but infinitely many from the home page if they are
	-- logged out or have not created an account.
	-- That seems a bit strange, but perhaps "authorless"
	-- reviews can be treated differently?
	-- QUESTION Although, they are currently prevented from submitting
	-- salaries and reviews unless they have the "worker"
	-- role, which requires being logged in to an account,
	-- so that simplifies things a great deal for now, I'll
	-- just need to make sure that that's what Bryce and Julian want.
	UNIQUE (submittedBy,companyName),
	companyId			integer
		REFERENCES companies (companyId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	reviewLocation		varchar(160)	NOT NULL,
	-- QUESTION this next field might be a good index, should we do that and how?
	reviewTitle			varchar(110)	NOT NULL, -- character count is 1 more than the Mongo version, allowing for null-terminator
	jobTitle			varchar(110)	NOT NULL,
	numMonthsWorked		smallint		NOT NULL CHECK (numMonthsWorked >= 0),
	pros				varchar(610)	NOT NULL CHECK (word_count(pros) >= 5),
	cons				varchar(610)	NOT NULL CHECK (word_count(cons) >= 5),
	wouldRecommend		boolean			NOT NULL,
	healthAndSafety		float(2)		NOT NULL CHECK (healthAndSafety >= 0 AND healthAndSafety <= 5),
	managerRelationship	float(2)		NOT NULL CHECK (managerRelationship >= 0 AND managerRelationship <= 5),
	workEnvironment		float(2)		NOT NULL CHECK (workEnvironment >= 0 AND workEnvironment <= 5),
	benefits			float(2)		NOT NULL CHECK (benefits >= 0 AND benefits <= 5),
	overallSatisfaction	float(2)		NOT NULL CHECK (overallSatisfaction >= 0 AND overallSatisfaction <= 5),
	additionalComments	varchar(6010),
	dateAdded			date			DEFAULT now()
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
	submittedBy			integer
		REFERENCES users (userId)
		ON UPDATE CASCADE ON DELETE SET NULL
		DEFERRABLE INITIALLY DEFERRED,
	dateAdded			date			DEFAULT now(),
	-- We may want to discuss the maximum allowable size of comments,
	-- I'm not sure if ~250 characters is enough but > 6000 (text) seems excessive.
	content				varchar(6010)	NOT NULL
);

-- salary reports about companies
DROP TABLE IF EXISTS salaries CASCADE;
CREATE TABLE salaries (
	salaryId			serial			PRIMARY KEY,
	-- NOTE: all the comments on the reviews table concerning
	-- the following two fields and corresponding constraint
	-- apply equally here
	submittedBy			integer
		REFERENCES users (userId)
		ON UPDATE CASCADE ON DELETE SET NULL
		DEFERRABLE INITIALLY DEFERRED,
	companyName			varchar(110)	NOT NULL,
	UNIQUE (submittedBy,companyName),
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
	dateAdded			date			DEFAULT now()
);

-- job ads posted by companies
DROP TABLE IF EXISTS jobads CASCADE;
CREATE TABLE jobads (
	jobadId				serial			PRIMARY KEY,
	companyName			varchar(110)
		REFERENCES companies (name)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	companyId			integer			NOT NULL
		REFERENCES companies (companyId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	jobTitle			varchar(110)	NOT NULL,
	pesosPerHour		varchar(40)		NOT NULL CHECK (is_valid_pay_range(pesosPerHour)),
	contractType		varchar(20)		NOT NULL CHECK (contractType='Full time' OR contractType='Part time' OR contractType='Contractor'),
	jobDescription		varchar(6010)	NOT NULL,
	responsibilities	varchar(6010)	NOT NULL,
	qualifications		varchar(6010)	NOT NULL,
	dateAdded			date			DEFAULT now()
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
	submittedBy			integer			NOT NULL
		REFERENCES users (userId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	refersTo			integer			NOT NULL
		REFERENCES reviews (reviewid)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (submittedBy,refersTo), -- one vote per user per item
	value				boolean			NOT NULL,
	dateAdded			date			DEFAULT now()
);

-- votes on comments
DROP TABLE IF EXISTS comment_votes CASCADE;
CREATE TABLE comment_votes (
	submittedBy			integer			NOT NULL
		REFERENCES users (userId)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	refersTo			integer			NOT NULL
		REFERENCES review_comments (commentid)
		ON UPDATE CASCADE ON DELETE CASCADE
		DEFERRABLE INITIALLY DEFERRED,
	PRIMARY KEY (submittedBy,refersTo), -- one vote per user per item
	value				boolean			NOT NULL,
	dateAdded			date			DEFAULT now()
);
