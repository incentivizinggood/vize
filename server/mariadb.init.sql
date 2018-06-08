create database vize;
use vize;
START TRANSACTION;
SET autocommit=0;
-- It's so good to be back...
CREATE TABLE companies (
	_id					bigint			primary key auto_increment,
	vizeProfileUrl		varchar(255),
	vizeReviewUrl		varchar(255),
	vizeSalaryUrl		varchar(255),
	vizePostJobUrl		varchar(255),
	name				varchar(100)	unique not null,
	contactEmail		varchar(100), 	-- needs regex constraint -> CHECK RLIKE
	dateEstablished		datetime,
	numEmployees		varchar(20), 	-- needs allowedValues constraint -> CHECK RLIKE
	industry			varchar(60),
	-- locations						-- can be done either with a separate table or dynamic columns, will probably use a separate table
	otherContactInfo	varchar(255),
	websiteURL			varchar(255),	-- needs regex constraint -> CHECK RLIKE
	descriptionOfCompany	text,
	dateJoined			datetime		default now(),
	-- min/max constraints are straightforward via CHECK
	numFlags			int				default 0 check (numFlags >= 0),
	healthAndSafety		float			default 0 check (healthAndSafety >= 0 AND healthAndSafety <= 5),
	managerRelationship	float			default 0 check (managerRelationship >= 0 AND managerRelationship <= 5),
	workEnvironment		float			default 0 check (workEnvironment >= 0 AND workEnvironment <= 5),
	benefits			float			default 0 check (benefits >= 0 AND benefits <= 5),
	overallSatisfaction	float			default 0 check (overallSatisfaction >= 0 AND overallSatisfaction <= 5),
	numReviews			int				default 0 check (numReviews >= 0),
	percentRecommended	float			default 0 check (percentRecommended >= 0 AND percentRecommended <= 1),
	avgNumMonthsWorked	float			default 0 check (avgNumMonthsWorked >= 0)
) ENGINE = InnoDB;
COMMIT;
