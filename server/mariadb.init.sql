create database vize;
use vize;
START TRANSACTION;
SET autocommit=0;
-- It's so good to be back...
CREATE TABLE companies (
	reviewId			bigint			primary key auto_increment,
	vizeProfileUrl		varchar(255),	-- default value?
	vizeReviewUrl		varchar(255),	-- default value?
	vizeSalaryUrl		varchar(255),	-- default value?
	vizePostJobUrl		varchar(255),	-- default value?
	name				varchar(100)	unique not null,
	contactEmail		varchar(100), 	-- needs regex constraint
	dateEstablished		datetime,
	numEmployees		varchar(20), 	-- needs allowedValues constraint
	industry			varchar(60),
	-- locations						-- can be done either with a separate table or dynamic columns, will probably use a separate table
	otherContactInfo	varchar(255),
	websiteURL			varchar(255),	-- needs regex constraint
	descriptionOfCompany	text,
	dateJoined			datetime,		-- default value?
	numFlags			int,			-- default value? also needs minValue constraint
	healthAndSafety		float,			-- needs min/max constraints, also defaultValue?
	managerRelationship	float,			-- needs min/max constraints, also defaultValue?
	workEnvironment		float,			-- needs min/max constraints, also defaultValue?
	benefits			float,			-- needs min/max constraints, also defaultValue?
	overallSatisfaction	float,			-- needs min/max constraints, also defaultValue?
	numReviews			int,			-- needs min value contraint and default value
	percentRecommended	float,			-- needs min/max constraints, also defaultValue?
	avgNumMonthsWorked	float			-- needs min value contraint and default value
) ENGINE = InnoDB;
COMMIT;
