-- In case anyone was wondering, here are some features that PostgreSQL
-- has that MariaDB and other MySQL-ites don't:
-- -> Deferrable constraints
-- -> Check constraints

-- company profiles
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
	-- locations	-- can be done either with a separate table or dynamic columns, will probably use a separate table

	-- Other validity onstraints are straightforward via CHECK,
	-- I love that PostgreSQL actually supports this

	-- defines allowed brackets for numEmployees
	numEmployees		varchar(20)		CHECK (numEmployees IS NULL OR numEmployees='1 - 50' OR numEmployees='51 - 500' OR numEmployees='501 - 2000' OR numEmployees='2001 - 5000' OR numEmployees='5000+'),
	-- regex CHECK constraint for email (with TLD) validity
	-- QUESTION Should I find a better place to keep the regex strings?
	contactEmail		varchar(255)	NOT NULL CHECK (contactEmail ~ '^(([^<>()\\[\\]\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
	-- regex CHECK constraint for URL validity, a bit different
	-- from the email check because websiteURL is not a required field
	websiteURL			varchar(255)	CHECK (websiteURL IS NULL OR (websiteURL ~ '^(?:(?:https?|ftp):\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!10(?:\\.\\d{1,3}){3})(?!127(?:\\.\\d{1,3}){3})(?!169\\.254(?:\\.\\d{1,3}){2})(?!192\\.168(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\x00a1-\\xffff0-9]+-?)*[a-z\\x00a1-\\xffff0-9]+)(?:\\.(?:[a-z\\x00a1-\\xffff0-9]+-?)*[a-z\\x00a1-\\xffff0-9]+)*(?:\\.(?:[a-z\\x00a1-\\xffff]{2,})))(?::\\d{2,5})?(?:\\/[^\\s]*)?$')),
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
CREATE TABLE locations (
	companyName			varchar(190)
	REFERENCES companies (name)
	ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
	locationName		varchar(190),
	PRIMARY KEY (companyName, locationName)
);

-- Okay, here's the tricky part:
-- One-many relationship from companies to locations,
-- many-one from locations to companies. Solved on
-- locations side by foreign key, but how to make sure
-- that each company has at least one location?

-- SOLUTION:
-- Foreign key as it currently stands, plus
-- "deferred constraint triggers", one for each
-- case (after update/delete/truncate on locations,
-- after insert on companies, constraint triggers
-- can only be after but it's fine because they
-- roll back the transaction).

-- QUESTION
-- What language to write triggers in? PostgreSQL doesn't
-- support full trigger definitions via DDL like Maria does.
-- Options: C (requires clunky setup, harder to secure)
--			pgSQL (fine, but not very powerful)
--			tcl (fine, but would have to learn)
--			Python (great, but not-fully-supported by postgres and seems very insecure)
--			Perl (great, well-supported and secure but hard to read,
--			and would have to learn)
-- SCRATCH ALL THAT
-- I would have gone with Perl, but the learning curve seems really steep.
-- Will see how far I get with pl/V8 (Javascript) via CREATE EXTENSION,
-- because this stuff just needs to get done.
-- Why? It's a "trusted" (doesn't have to run as root) language that
-- I already know and provides all the necessary power, we just need to install
-- it, which means breaking out of the Meteor ecosystem a bit.

-- WARNING
-- If this succeeds, the Vize Web App project will depend on PL/V8,
-- which will have to be manually installed on Galaxy by...probably me.
-- Although I guess it wouldn't be hard to just clone the repo and
-- "make install", which is basically what the instructions on their
-- website tell you to do.
