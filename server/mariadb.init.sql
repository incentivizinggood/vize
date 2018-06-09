create database vize;
use vize;
CREATE TABLE companies (
	_id					bigint			primary key auto_increment,
	vizeProfileUrl		varchar(255),
	vizeReviewUrl		varchar(255),
	vizeSalaryUrl		varchar(255),
	vizePostJobUrl		varchar(255),
	name				varchar(255)	not null,
	contactEmail		varchar(255)	not null, 	-- needs regex constraint -> RLIKE in trigger
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

DELIMITER //

CREATE TRIGGER bi_validate_company
	BEFORE INSERT ON companies
	FOR EACH ROW
		BEGIN
			-- Not worrying about existence constraints or default values,
			-- becuase those are handled by the schema itself
			IF (NOT NEW.contactEmail = NULL) AND NOT (NEW.contactEmail RLIKE "^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$")
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "contactEmail is not a valid email";
			ELSEIF (NOT NEW.numEmployees = NULL) AND NOT (NEW.numEmployees="1 - 50" OR NEW.numEmployees="51 - 500" OR NEW.numEmployees="501 - 2000" OR NEW.numEmployees="2001 - 5000" OR NEW.numEmployees="5000+") THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = "Illegal value for numEmployees";
			ELSEIF (NOT NEW.websiteURL = NULL) AND (NOT NEW.websiteURL RLIKE "^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$") THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'websiteURL is not a valid URL';
			ELSEIF NOT NEW.numFlags = NULL AND NEW.numFlags < 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'numFlags cannot be less than 0';
			ELSEIF NOT NEW.numReviews = NULL AND NEW.numReviews < 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'numReviews cannot be less than 0';
			ELSEIF NOT NEW.avgNumMonthsWorked = NULL AND NEW.avgNumMonthsWorked < 0 THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'avgNumMonthsWorkeds cannot be less than 0';
			ELSEIF NOT NEW.percentRecommended = NULL AND (NEW.percentRecommended < 0 OR NEW.percentRecommended > 1) THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'percentRecommended must be between 0 and 1 (inclusive)';
			ELSEIF NOT NEW.healthAndSafety = NULL AND (NEW.healthAndSafety < 0 OR NEW.healthAndSafety > 1) THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'healthAndSafety must be between 0 and 5 (inclusive)';
			ELSEIF NOT NEW.managerRelationship = NULL AND (NEW.managerRelationship < 0 OR NEW.managerRelationship > 5) THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'managerRelationship must be between 0 and 5 (inclusive)';
			ELSEIF NOT NEW.workEnvironment = NULL AND (NEW.workEnvironment < 0 OR NEW.workEnvironment > 5) THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'workEnvironment must be between 0 and 5 (inclusive)';
			ELSEIF NOT NEW.benefits = NULL AND (NEW.benefits < 0 OR NEW.benefits > 5) THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'benefits must be between 0 and 5 (inclusive)';
			ELSEIF NOT NEW.overallSatisfaction = NULL AND (NEW.overallSatisfaction < 0 OR NEW.overallSatisfaction > 5) THEN
				SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'overallSatisfaction must be between 0 and 5 (inclusive)';
			END IF;
		END; //

DELIMITER ;
