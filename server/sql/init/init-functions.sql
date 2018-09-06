-- Regexes for email w/ tld, URL, and phone number
-- were copy-pasted from the MIT-licensed SimplSchema
-- node package in order to tally with that package's
-- behavior on the frontend and avoid unexpected results:
-- https://github.com/aldeed/simple-schema-js/blob/master/package/lib/regExp.js

-- regex check for email w/ TLD
DROP FUNCTION IF EXISTS is_valid_email_with_tld(text) CASCADE;
CREATE OR REPLACE FUNCTION is_valid_email_with_tld(arg text)
RETURNS boolean AS
$$
	const emailWithTldRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailWithTldRegex.test(arg);
$$ LANGUAGE plv8 IMMUTABLE;

-- regex check for URL
DROP FUNCTION IF EXISTS is_valid_url(text) CASCADE;
CREATE OR REPLACE FUNCTION is_valid_url(arg text)
RETURNS boolean AS
$$
	const urlRegex=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
	return urlRegex.test(arg);
$$ LANGUAGE plv8 IMMUTABLE;

-- regex check for phone number
DROP FUNCTION IF EXISTS is_valid_phone_number(text) CASCADE;
CREATE OR REPLACE FUNCTION is_valid_phone_number(arg text)
RETURNS boolean AS
$$
	const phoneNoRegex= /^[0-9０-９٠-٩۰-۹]{2}$|^[+＋]*(?:[-x‐-―−ー－-／  ­​⁠　()（）［］.\[\]/~⁓∼～*]*[0-9０-９٠-٩۰-۹]){3,}[-x‐-―−ー－-／  ­​⁠　()（）［］.\[\]/~⁓∼～0-9０-９٠-٩۰-۹]*(?:;ext=([0-9０-９٠-٩۰-۹]{1,7})|[  \t,]*(?:e?xt(?:ensi(?:ó?|ó))?n?|ｅ?ｘｔｎ?|[,xｘ#＃~～]|int|anexo|ｉｎｔ)[:\.．]?[  \t,-]*([0-9０-９٠-٩۰-۹]{1,7})#?|[- ]+([0-9０-９٠-٩۰-۹]{1,5})#)?$/i;
	return phoneNoRegex.test(arg);
$$ LANGUAGE plv8 IMMUTABLE;

-- regex check for pay range
DROP FUNCTION IF EXISTS is_valid_pay_range(text) CASCADE;
CREATE OR REPLACE FUNCTION is_valid_pay_range(arg text)
RETURNS boolean AS
$$
	const payRangeRegex=/^[123456789]\d*(\.\d\d)?\s*(-\s*[123456789]\d*(\.\d\d)?\s*)?$/;
	return payRangeRegex.test(arg);
$$ LANGUAGE plv8 IMMUTABLE;

-- count words in a string, used for checking pros and cons
-- in the reviews table, hooray for plv8 letting me reuse
-- the Javascript code that I fought so hard to get working
DROP FUNCTION IF EXISTS word_count(text) CASCADE;
CREATE OR REPLACE FUNCTION word_count(arg text)
RETURNS integer AS
$$
	return arg.split(/\s+\b/).length;
$$ LANGUAGE plv8 IMMUTABLE;

-- helper function for replacing NULL values in output
-- with 0's, in cases where 0 makes more sense
-- currently only defined for bigint becuase it is
-- only used on the results of count aggregations
DROP FUNCTION IF EXISTS zero_if_null(bigint) CASCADE;
CREATE OR REPLACE FUNCTION zero_if_null(arg bigint)
RETURNS bigint AS
$$
	return (arg === null || arg === undefined) ? 0 : arg;
$$ LANGUAGE plv8 IMMUTABLE;

-- helper function for when we want to use a trigger
-- to blanketly disallow some action
DROP FUNCTION IF EXISTS deny_op() CASCADE;
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
DROP FUNCTION IF EXISTS count_related_by_int(text,text,text,integer) CASCADE;
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

-- Retrieves the name of a company with a given
-- id if the company exists, used to help
-- autofill/autocorrect company names
DROP FUNCTION IF EXISTS get_name_for_id(integer) CASCADE;
CREATE OR REPLACE FUNCTION get_name_for_id
(companyid integer)
RETURNS text AS
$$
	const queryCompanyNamePlan = plv8.prepare("select name from companies where companyid=$1",['integer']);
	const result = queryCompanyNamePlan.execute([companyid]);
	queryCompanyNamePlan.free();
	if(result.length > 0)
		return result[0].name;
	else
		return null;
$$ LANGUAGE plv8;

-- Retrieves the id of a company with a given name,
-- used to help figure things out in cases where
-- name is provided and a company with that name
-- has an entry in companies, but the id was not provided
DROP FUNCTION IF EXISTS get_id_for_name(text) CASCADE;
CREATE OR REPLACE FUNCTION get_id_for_name
(companyname text)
RETURNS integer AS
$$
	const queryCompanyIdPlan = plv8.prepare("select companyid from companies where name=$1",['text']);
	const result = queryCompanyIdPlan.execute([companyname]);
	queryCompanyIdPlan.free();
	if(result.length > 0)
		return result[0].companyid;
	else
		return null;
$$ LANGUAGE plv8;

-- where tables have both companyname and
-- companyid fields, companyid is treated
-- as Single Source of Truth for which company
-- is being referenced
DROP FUNCTION IF EXISTS correct_name_by_id() CASCADE;
CREATE OR REPLACE FUNCTION correct_name_by_id() RETURNS TRIGGER AS
$$
	const get_name_for_id = plv8.find_function("get_name_for_id");
	NEW.companyname = get_name_for_id(NEW.companyid);
	return NEW;
$$ LANGUAGE plv8;

-- we choose to be a pal and try to get the companyid
-- if the caller supplies a name without an id
DROP FUNCTION IF EXISTS fill_id_by_name() CASCADE;
CREATE OR REPLACE FUNCTION fill_id_by_name() RETURNS TRIGGER AS
$$
	const get_id_for_name = plv8.find_function("get_id_for_name");
	NEW.companyid = get_id_for_name(NEW.companyname);
	return NEW;
$$ LANGUAGE plv8;

-- Enforces location valid location format on inserted rows.
-- Whether this is necessary is up for debate, as later we
-- get to function that force location validity, but I have
-- this just in case.
DROP FUNCTION IF EXISTS is_valid_location(text) CASCADE;
CREATE OR REPLACE FUNCTION is_valid_location
(location text)
RETURNS boolean AS
$$
	try {
		const obj = JSON.parse(location);
		return (
			(
				(obj.city === undefined || typeof obj.city === 'string') &&
				(obj.address === undefined || typeof obj.address === 'string') &&
				(obj.industrialHub === undefined || typeof obj.industrialHub === 'string')
			) &&
			(
				obj.city !== undefined ||
				obj.address !== undefined ||
				obj.industrialHub !== undefined
			)
		)
	} catch (e) {
		return false;
	}
$$ LANGUAGE plv8 IMMUTABLE;

-- Checks whether a proposed location has the expected
-- format (a string-ified JSON object with fields for
-- city, address, and industrial park) and either passes
-- it through, performs a conversion, or throws an exception.
-- Avoids using the equivalent portions of is_valid_location
-- because I'm not sure how error-handling would work if it did.
DROP FUNCTION IF EXISTS process_location(text) CASCADE;
CREATE OR REPLACE FUNCTION process_location
(location text)
RETURNS text AS
$$
	let returnVal = "";
	try {
		const obj = JSON.parse(location);
		if (obj.city === undefined &&
			obj.address === undefined &&
			obj.industrialHub === undefined)
			// case where location is a valid JSON object
			// but does not have any of the required fields
			throw "Location must include either a city, an address, or an industrial park";
		else if (
			(obj.city !== undefined && !(typeof obj.city === 'string')) ||
			(obj.address !== undefined && !(typeof obj.address === 'string')) ||
			(obj.industrialHub !== undefined && !(typeof obj.industrialHub === 'string'))
		)
		{
			// case where one or more of the required fields exists but has
			// the wrong type (non-required fields are considered harmless)
			throw "All required fields of location must have type String";
		}
		// else, we are fine
		returnVal = location;
	} catch (e) {
		if (e instanceof SyntaxError) {
			// case where location is not a valid JSON object, assume
			// "industrial hub", as in the case with the initial reviews
			returnVal = JSON.stringify({ industrialHub: location });
		} else
			throw e;
	}

	return returnVal;
$$ LANGUAGE plv8 IMMUTABLE;

-- Trigger functions to make sure that company, jobad, review,
-- and salary locations are all properly formatted. The first two
-- go onto company_locations and job_locations, the next two go
-- onto reviews and salaries, the idea being that each function
-- call process exactly one location, rather than an array thereof.
DROP FUNCTION IF EXISTS process_company_location() CASCADE;
CREATE OR REPLACE FUNCTION process_company_location() RETURNS TRIGGER AS
$$
	if (NEW.companylocation !== null) {
		const process_location = plv8.find_function("process_location");
		NEW.companylocation = process_location(NEW.companylocation);
		return NEW;
	}
$$ LANGUAGE plv8;

DROP FUNCTION IF EXISTS process_job_location() CASCADE;
CREATE OR REPLACE FUNCTION process_job_location() RETURNS TRIGGER AS
$$
	if (NEW.joblocation !== null) {
		const process_location = plv8.find_function("process_location");
		NEW.joblocation = process_location(NEW.joblocation);
		return NEW;
	}
$$ LANGUAGE plv8;

DROP FUNCTION IF EXISTS process_review_location() CASCADE;
CREATE OR REPLACE FUNCTION process_review_location() RETURNS TRIGGER AS
$$
	if (NEW.reviewlocation !== null) {
		const process_location = plv8.find_function("process_location");
		NEW.reviewlocation = process_location(NEW.reviewlocation);
		return NEW;
	}
$$ LANGUAGE plv8;

DROP FUNCTION IF EXISTS process_salary_location() CASCADE;
CREATE OR REPLACE FUNCTION process_salary_location() RETURNS TRIGGER AS
$$
	if (NEW.salarylocation !== null) {
		const process_location = plv8.find_function("process_location");
		NEW.salarylocation = process_location(NEW.salarylocation);
		return NEW;
	}
$$ LANGUAGE plv8;

-- This one is going to be used in an after-insert
-- constraint trigger on companies so that each
-- company starts off with at least one location.
DROP FUNCTION IF EXISTS check_company_location_count() CASCADE;
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

-- ditto for job locations
DROP FUNCTION IF EXISTS check_job_location_count() CASCADE;
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
DROP FUNCTION IF EXISTS check_remaining_company_locations() CASCADE;
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

-- ditto for job locations
DROP FUNCTION IF EXISTS check_remaining_job_locations() CASCADE;
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

-- enforce the job post limit, which is currently set to 5 per company
DROP FUNCTION IF EXISTS enforce_per_company_jobad_limit() CASCADE;
CREATE OR REPLACE FUNCTION enforce_per_company_jobad_limit() RETURNS TRIGGER AS
$$
	// skip case we don't care about so we don't have to worry about OLD
	// allows updates that change companyname and companyid, the
	// correctness of which should be handled by a different trigger
	if(TG_OP === 'UPDATE' && OLD.companyname === NEW.companyname && OLD.companyid === NEW.companyid)
		return null;

	// henceforth we assume that the relation between
	// companyname and companyid is correct, and opt
	// to use companyid becuase it is a required field
	const getCountPlan = plv8.prepare("select count(jobadid) from jobads where companyname=$1",['text']);
	const count = getCountPlan.execute([NEW.companyname])[0].count;
	if(count > 5)
		throw "No more than 5 job ad posts allowed per company";
	return null;
$$ LANGUAGE plv8;

-- make sure that users don't vote on own reviews or comments
DROP FUNCTION IF EXISTS disallow_voting_on_self() CASCADE;
CREATE OR REPLACE FUNCTION disallow_voting_on_self() RETURNS TRIGGER AS
$$
	if(!(TG_TABLE_NAME === "review_votes" || TG_TABLE_NAME === "comment_votes"))
		throw "Operation not permitted";
	const table = (TG_TABLE_NAME === "review_votes") ? "reviews" : "review_comments";
	const id = (TG_TABLE_NAME === "review_votes") ? "reviewid" : "commentid";
	const plan = plv8.prepare("select * from " + table + " where " + id + "=$1",['integer']);
	const result = plan.execute([NEW.refersto]);
	if(result[0].submittedby === NEW.submittedby)
		throw "You are not allowed to vote on your own " + ((TG_TABLE_NAME === "review_votes") ? "reviews" : "comments");
	return null;
$$ LANGUAGE plv8;
