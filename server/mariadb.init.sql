create database vize;
use vize;
CREATE TABLE companies (
	_id					bigint			primary key auto_increment,
	vizeProfileUrl		varchar(255),
	vizeReviewUrl		varchar(255),
	vizeSalaryUrl		varchar(255),
	vizePostJobUrl		varchar(255),
	name				varchar(100)	unique not null,
	contactEmail		varchar(100), 	-- needs regex constraint -> RLIKE in trigger
	dateEstablished		datetime,
	numEmployees		varchar(20), 	-- needs allowedValues constraint -> RLIKE in trigger
	industry			varchar(60),
	-- locations						-- can be done either with a separate table or dynamic columns, will probably use a separate table
	otherContactInfo	varchar(255),
	websiteURL			varchar(255),	-- needs regex constraint -> RLIKE in trigger
	descriptionOfCompany	text,
	dateJoined			datetime		default now(),
	-- min/max constraints are straightforward via CHECK
	numFlags			int				default 0, -- geq 0
	numReviews			int				default 0, -- geq 0
	avgNumMonthsWorked	float			default 0, -- geq 0
	percentRecommended	float			default 0, -- geq 0 and leq 1
	healthAndSafety		float			default 0, -- geq 0 and leq 5
	managerRelationship	float			default 0, -- geq 0 and leq 5
	workEnvironment		float			default 0, -- geq 0 and leq 5
	benefits			float			default 0, -- geq 0 and leq 5
	overallSatisfaction	float			default 0 -- geq 0 and leq 5
) ENGINE = InnoDB;

CREATE FUNCTION int_geq_0 (i int) RETURNS bool DETERMINISTIC
	RETURN (i >= 0);

CREATE FUNCTION float_geq_0 (f float) RETURNS bool DETERMINISTIC
	RETURN (f >= 0);

CREATE FUNCTION float_geq_0_and_leq_1 (f float) RETURNS bool DETERMINISTIC
	RETURN (f >= 0 AND f <= 1);

CREATE FUNCTION float_geq_0_and_leq_5 (f float) RETURNS bool DETERMINISTIC
	RETURN (f >= 0 AND f <= 5);

DELIMITER //

CREATE TRIGGER bi_validate_company
	BEFORE INSERT ON companies
	FOR EACH ROW
		BEGIN

		END; //

DELIMITER ;
