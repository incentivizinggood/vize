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
	ON UPDATE CASCADE ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED,
	locationName		varchar(190),
	PRIMARY KEY (companyName, locationName)
);
