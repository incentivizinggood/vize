-- regex check for email w/ TLD
DROP FUNCTION IF EXISTS is_valid_email_with_tld;
CREATE OR REPLACE FUNCTION is_valid_email_with_tld(arg text)
RETURNS boolean AS
$$
	const emailWithTldRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailWithTldRegex.test(arg);
$$ LANGUAGE plv8 IMMUTABLE;

-- regex check for URL
DROP FUNCTION IF EXISTS is_valid_url;
CREATE OR REPLACE FUNCTION is_valid_url(arg text)
RETURNS boolean AS
$$
	const urlRegex=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
	return urlRegex.test(arg);
$$ LANGUAGE plv8 IMMUTABLE;

-- regex check for pay range
DROP FUNCTION IF EXISTS is_valid_pay_range;
CREATE OR REPLACE FUNCTION is_valid_pay_range(arg text)
RETURNS boolean AS
$$
	const payRangeRegex=/^[123456789]\d*(\.\d\d)?\s*(-\s*[123456789]\d*(\.\d\d)?\s*)?$/;
	return payRangeRegex.test(arg);
$$ LANGUAGE plv8 IMMUTABLE;

-- count words in a string, used for checking pros and cons
-- in the reviews table, hooray for plv8 letting me reuse
-- the Javascript code that I fought so hard to get working
DROP FUNCTION IF EXISTS word_count;
CREATE OR REPLACE FUNCTION word_count(arg text)
RETURNS integer AS
$$
	return arg.split(/\s+\b/).length;
$$ LANGUAGE plv8 IMMUTABLE;

-- helper function for replacing NULL values in output
-- with 0's, in cases where 0 makes more sense
-- currently only defined for bigint becuase it is
-- only used on the results of count aggregations
DROP FUNCTION IF EXISTS zero_if_null;
CREATE OR REPLACE FUNCTION zero_if_null(arg bigint)
RETURNS bigint AS
$$
	return (arg === null || arg === undefined) ? 0 : arg;
$$ LANGUAGE plv8 IMMUTABLE;

-- helper function for when we want to use a trigger
-- to blanketly disallow some action
DROP FUNCTION IF EXISTS deny_op;
CREATE OR REPLACE FUNCTION deny_op() RETURNS TRIGGER AS
$$
	// plv8 is very intuitive, just not in the ways you might expect XD,
	// apparently this statement translates to a nice SQL exception
	// and rolls back the parent transaction
	throw "Operation not permitted";
$$ LANGUAGE plv8;

-- selects the set of X from table 1 (company_locations or review_locations)
-- related to Y in table 2 (companies or reviews)
-- by integer factor Z (companyId or reviewId)
-- and return the set's size
-- or -1 if Z does not exist in table 2
-- this breaks if Z's name is not the same in both table1 and table2
-- BUG This function is highly vulnerable to SQL injection
DROP FUNCTION IF EXISTS count_related_by_int;
CREATE OR REPLACE FUNCTION count_related_by_int
(table1 text, table2 text, factorname text, factorvalue integer)
RETURNS integer AS
$$
	// hacked SQL-injection defense because I cannot
	// fully use prepared statements here
	if(!(table1 === "company_locations" || table1 === "review_locations" || table1 === "job_locations") ||
		!(table2 === "companies" || table2 === "reviews" || table2 === "jobads") ||
		!(factorname === "companyid" || factorname === "reviewid" || factorname === "jobadid"))
		throw "Illegal arguments";
	const checkTable2Plan = plv8.prepare("select " + factorname + " from " + table2 + " where " + factorname + "=$1",['integer']);
	const doesYexist = checkTable2Plan.execute([factorvalue]).length >= 1;
	checkTable2Plan.free();
	if(!doesYexist) return -1;
	const countXplan = plv8.prepare("select count(" + factorname + ") from " + table1 + " where " + factorname + "=$1",['integer']);
	return countXplan.execute([factorvalue])[0].count;
$$ LANGUAGE plv8;

-- This one is going to be used in an after-insert
-- constraint trigger on companies so that each
-- company starts off with at least one location.
DROP FUNCTION IF EXISTS check_company_location_count;
CREATE OR REPLACE FUNCTION check_company_location_count() RETURNS TRIGGER AS
$$
	const newcompanyid = NEW.companyid;
	const count_related_by_int = plv8.find_function("count_related_by_int");
	const result = count_related_by_int("company_locations", "companies","companyid",newcompanyid);
	if(result === -1)
		throw "Company doesn't exist, what in the blazes is going on?";
	else if(result === 0)
		throw "Each company must have at least one location";
	else
		return null;
$$ LANGUAGE plv8;

-- ditto for review locations
DROP FUNCTION IF EXISTS check_review_location_count;
CREATE OR REPLACE FUNCTION check_review_location_count() RETURNS TRIGGER AS
$$
	const newreviewid = NEW.reviewid;
	const count_related_by_int = plv8.find_function("count_related_by_int");
	const result = count_related_by_int("review_locations","reviews","reviewid",newreviewid);
	if(result === -1)
		throw "Review doesn't exist, what in the blazes is going on?";
	else if(result === 0)
		throw "Each review must have at least one location";
	else
		return null;
$$ LANGUAGE plv8;

-- ditto for job locations
DROP FUNCTION IF EXISTS check_job_location_count;
CREATE OR REPLACE FUNCTION check_job_location_count() RETURNS TRIGGER AS
$$
	const newjobadid = NEW.jobadid;
	const count_related_by_int = plv8.find_function("count_related_by_int");
	const result = count_related_by_int("job_locations","jobads","jobadid",newjobadid);
	if(result === -1)
		throw "Job ad doesn't exist, what in the blazes is going on?";
	else if(result === 0)
		throw "Each job ad must have at least one location";
	else
		return null;
$$ LANGUAGE plv8;

-- This is for after-delete and after-update triggers
-- on company locations, to make sure that a company's last location
-- doesn't accidentally get moved or deleted
DROP FUNCTION IF EXISTS check_remaining_company_locations;
CREATE OR REPLACE FUNCTION check_remaining_company_locations() RETURNS TRIGGER AS
$$
	// skip case we don't care about so we don't have to worry about NEW
	if(TG_OP === 'UPDATE' && OLD.companyid === NEW.companyid)
		return null;
	const oldcompanyid = OLD.companyid;
	const count_related_by_int = plv8.find_function("count_related_by_int");
	const result = count_related_by_int("company_locations", "companies", "companyid",oldcompanyid);
	if (result === 0)
		throw "Each company must have at least one location (cannot remove last location)";
	else
		return null;
$$ LANGUAGE plv8;

-- ditto for review locations
DROP FUNCTION IF EXISTS check_remaining_review_locations;
CREATE OR REPLACE FUNCTION check_remaining_review_locations() RETURNS TRIGGER AS
$$
	// skip case we don't care about so we don't have to worry about NEW
	if(TG_OP === 'UPDATE' && OLD.reviewid === NEW.reviewid)
		return null;
	const oldreviewid = OLD.reviewid;
	const count_related_by_int = plv8.find_function("count_related_by_int");
	const result = count_related_by_int("review_locations","reviews","reviewid",oldreviewid);
	if(result === 0)
		throw "Each review must have at least one location (cannot remove last location)";
	else
		return null;
$$ LANGUAGE plv8;

-- ditto for job locations
DROP FUNCTION IF EXISTS check_remaining_job_locations;
CREATE OR REPLACE FUNCTION check_remaining_job_locations() RETURNS TRIGGER AS
$$
	// skip case we don't care about so we don't have to worry about NEW
	if(TG_OP === 'UPDATE' && OLD.jobadid === NEW.jobadid)
		return null;
	const oldjobadid = OLD.jobadid;
	const count_related_by_int = plv8.find_function("count_related_by_int");
	const result = count_related_by_int("job_locations","jobads","jobadid",oldjobadid);
	if(result === 0)
		throw "Each job ad must have at least one location (cannot remove last location)";
	else
		return null;
$$ LANGUAGE plv8;
