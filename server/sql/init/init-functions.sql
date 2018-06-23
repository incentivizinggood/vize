-- regex check for email w/ TLD
CREATE OR REPLACE FUNCTION is_valid_email_with_tld(arg text)
RETURNS boolean AS
$$
	const emailWithTldRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailWithTldRegex.test(arg);
$$ LANGUAGE plv8 IMMUTABLE;

-- regex check for URL
CREATE OR REPLACE FUNCTION is_valid_url(arg text)
RETURNS boolean AS
$$
	const urlRegex=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
	return urlRegex.test(arg);
$$ LANGUAGE plv8 IMMUTABLE;

-- regex check for pay range
CREATE OR REPLACE FUNCTION is_valid_pay_range(arg text)
RETURNS boolean AS
$$
	const payRangeRegex=/^[123456789]\d*(\.\d\d)?\s*(-\s*[123456789]\d*(\.\d\d)?\s*)?$/;
	return payRangeRegex.test(arg);
$$ LANGUAGE plv8 IMMUTABLE;

-- count words in a string, used for checking pros and cons
-- in the reviews table, hooray for plv8 letting me reuse
-- the Javascript code that I fought so hard to get working
CREATE OR REPLACE FUNCTION word_count(arg text)
RETURNS integer AS
$$
	return arg.split(/\s+\b/).length;
$$ LANGUAGE plv8 IMMUTABLE;

-- WARNING
-- BEWARE DEATH BY FLOATING POINT ERRORS.
-- These next functions terrify me so much
-- I want to replace denormalization with views.
-- WARNING

-- x: number to add to an average
-- n: the number of values already in the average
-- avg: the average to add x to
-- returns the average with x added to it
-- Accepted answer was strange, but the most-upvoted answer
-- suits our use case perfectly:
-- https://math.stackexchange.com/questions/22348/how-to-add-and-subtract-values-from-an-average
CREATE OR REPLACE FUNCTION add_to_average(x float(2), n float(2), avg float(2))
RETURNS float(2) AS
$$
	return avg + ((x - avg) / (n + 1));
$$ LANGUAGE plv8 IMMUTABLE;

-- x: the number to be removed from the average
-- n: the number of values currently in the average
-- avg: the average to remove x from
-- returns the average with x removed from it
-- inverted version of previous function
CREATE OR REPLACE FUNCTION sub_from_average(x float(2), n float(2), avg float(2))
RETURNS float(2) AS
$$
	// because 0 / 0 is NaN (rather than 0) in Javascript
	return (n - 1 === 0) ? 0 : avg - ((x - avg) / (n - 1));
$$ LANGUAGE plv8 IMMUTABLE;

-- x_old: the old value of x
-- x_new: the new value of x
-- n: the number of values in the average
-- avg: the average before x is changed
-- return the average with x changed
-- copy-pasted from imports/api/data/denormalization.js
CREATE OR REPLACE FUNCTION change_value_in_avg(x_old float(2), x_new float(2), n float(2), avg float(2))
RETURNS float(2) AS
$$
	const w1 = 1 / (n + 1); // The fraction of avg that is x.
	return avg + (x_new - x_old) * w1;
$$ LANGUAGE plv8 IMMUTABLE;

-- helper function for when we want to use a trigger
-- to blanketly disallow some action
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

-- vote insertion
CREATE OR REPLACE FUNCTION cast_initial_vote() RETURNS TRIGGER AS
$$
	// select review or comment by NEW.refersto,
	// if none found then throw an exception
	const table = (NEW.votesubject === 'review') ? "reviews" : "review_comments";
	const id = (table === "reviews") ? "reviewid" : "commentid";
	const queryPlan = plv8.prepare("select submittedby,upvotes,downvotes from " + table + " where " + id + "=$1",['integer']);
	const result = queryPlan.execute([NEW.refersto]);
	queryPlan.free();
	if(result.length === 0)
		throw "Cannot vote on nonexistent " + NEW.votesubject;
	else if(result[0].submittedby === NEW.submittedby)
		throw "Cannot vote on own " + NEW.votesubject;
	else {
		const oldUpvotes = result[0].upvotes;
		const oldDownvotes = result[0].downvotes;
		if(NEW.value === true) {
			const updatePlan = plv8.prepare("update " + table + " set upvotes=$1 where " + id + "=$2",['integer','integer']);
			updatePlan.execute([oldUpvotes+1,NEW.refersto]);
			updatePlan.free();
		}
		else if(NEW.value === false) {
			const updatePlan = plv8.prepare("update " + table + " set downvotes=$1 where " + id + "=$2",['integer','integer']);
			updatePlan.execute([oldDownvotes+1,NEW.refersto]);
			updatePlan.free();
		}
		else {
			plv8.elog(ERROR,"vote value is neither true nor false? wut?");
		}
	}
$$ LANGUAGE plv8;

-- for these next two trigger functions:
-- assume vote exists because these are after-triggers
-- assume the referenced items also exist because of cascading
-- foreign keys and previously-implemented trigger constraints

-- vote update
-- users should only be able to update their own votes
CREATE OR REPLACE FUNCTION change_vote() RETURNS TRIGGER AS
$$
//		deny changes to votesubject, refersto, and submittedby,
//		because I do not want to think about them
//		if new value === old value, return null
//		else if new value > old value, subtract one from downvotes and add one to upvotes
//		else if new value < old value, subtract one from upvotes and add one to downvotes
	if(NEW.votesubject !== OLD.votesubject ||
		NEW.refersto !== OLD.refersto ||
		NEW.submittedby !== OLD.submittedby) {
		throw "Operation not permitted";
	}
	else if(NEW.value === OLD.value) {
		return null;
	}
	const table = (OLD.votesubject === 'review') ? "reviews" : "review_comments";
	const id = (table === "reviews") ? "reviewid" : "commentid";
	const queryPlan = plv8.prepare("select upvotes,downvotes from " + table + " where " + id + "=$1",['integer']);
	const oldVotes = queryPlan.execute([OLD.refersto]);
	queryPlan.free();
	const oldUpvotes = oldVotes[0].upvotes;
	const oldDownvotes = oldVotes[0].downvotes;
	const updatePlan = plv8.prepare("update " + table + " set upvotes=$1,downvotes=$2 where " + id + "=$3",['integer','integer','integer']);
	if(NEW.value === true && OLD.value === false) {
		updatePlan.execute([oldUpvotes+1, oldDownvotes-1,OLD.refersto])
	}
	else if(NEW.value === false && OLD.value === true) {
		updatePlan.execute([oldUpvotes-1, oldDownvotes+1,OLD.refersto])
	}
	updatePlan.free();
$$ LANGUAGE plv8;

-- vote delete
-- users should only be able to delete their own votes
CREATE OR REPLACE FUNCTION retract_vote() RETURNS TRIGGER AS
$$
//		if vote value is true, subtract one from upvotes
//		else if vote value is false, subtract one from downvotes
	const table = (OLD.votesubject === 'review') ? "reviews" : "review_comments";
	const id = (table === "reviews") ? "reviewid" : "commentid";
	const queryPlan = plv8.prepare("select upvotes,downvotes from " + table + " where " + id + "=$1",['integer']);
	const oldVotes = queryPlan.execute([OLD.refersto]);
	queryPlan.free();
	const oldUpvotes = oldVotes[0].upvotes;
	const oldDownvotes = oldVotes[0].downvotes;
	if(OLD.value === true) {
		const updatePlan = plv8.prepare("update " + table + " set upvotes=$1 where " + id + "=$2",['integer','integer']);
		updatePlan.execute([oldUpvotes-1,OLD.refersto]);
		updatePlan.free();
	}
	else if(OLD.value === false) {
		const updatePlan = plv8.prepare("update " + table + " set downvotes=$1 where " + id + "=$2",['integer','integer']);
		updatePlan.execute([oldDownvotes-1,OLD.refersto]);
		updatePlan.free();
	}
$$ LANGUAGE plv8;

-- review data denormalization,
-- based on whether review is being inserted, updated, or deleted
-- update numReviews (+1, -0, -1)
-- update averages:
-- avgNumMonthsWorked
-- percentRecommended
-- healthAndSafety
-- managerRelationship
-- workEnvironment
-- benefits
-- overallSatisfaction
-- can assume that NEW review is valid
-- and that referenced company is valid if it exists
CREATE OR REPLACE FUNCTION update_review_statistics() RETURNS TRIGGER AS
$$

	if(TG_OP.toLowerCase() === 'update' &&
	(OLD.companyid !== NEW.companyid || OLD.companyname !== NEW.companyname)) {
		throw "Operation not permitted";
	}

	const companyName = (TG_OP.toLowerCase() === 'delete') ? OLD.companyname : NEW.companyname;
	const queryPlan = plv8.prepare("SELECT * FROM companies WHERE name=$1",['text']);
	const company = queryPlan.execute(companyName)[0];
	queryPlan.free();

	if(company === undefined) {
		return null;
	}

	const updatePlan = plv8.prepare(
		"UPDATE companies SET "+
		"numReviews=$1,avgNumMonthsWorked=$2,percentRecommended=$3,"+
		"healthAndSafety=$4,managerRelationship=$5,workEnvironment=$6,"+
		"benefits=$7,overallSatisfaction=$8 "+
		"WHERE name=$9",
	['float(2)','float(2)','float(2)','float(2)','float(2)','float(2)','float(2)','float(2)','text']);

	if(TG_OP.toLowerCase() === 'insert') {
		const addToAvg = plv8.find_function("add_to_average");
		updatePlan.execute([
			company.numreviews+1,
			addToAvg(NEW.nummonthsworked,company.numreviews,company.avgnummonthsworked),
			addToAvg((NEW.wouldrecommend) ? 1 : 0,company.numreviews,company.percentrecommended),
			addToAvg(NEW.healthandsafety,company.numreviews,company.healthandsafety),
			addToAvg(NEW.managerrelationship,company.numreviews,company.managerrelationship),
			addToAvg(NEW.workenvironment,company.numreviews,company.workenvironment),
			addToAvg(NEW.benefits,company.numreviews,company.benefits),
			addToAvg(NEW.overallsatisfaction,company.numreviews,company.overallsatisfaction),
			company.name
		]);
	}

	else if(TG_OP.toLowerCase() === 'update') {
		const changeValueInAvg = plv8.find_function("change_value_in_avg");
		updatePlan.execute([
			company.numreviews,
			changeValueInAvg(OLD.nummonthsworked,NEW.nummonthsworked,company.numreviews,company.avgnummonthsworked),
			changeValueInAvg((OLD.wouldrecommend) ? 1 : 0, (NEW.wouldrecommend) ? 1 : 0,company.numreviews,company.percentrecommended),
			changeValueInAvg(OLD.healthandsafety,NEW.healthandsafety,company.numreviews,company.healthandsafety),
			changeValueInAvg(OLD.managerrelationship,NEW.managerrelationship,company.numreviews,company.managerrelationship),
			changeValueInAvg(OLD.workenvironment,NEW.workenvironment,company.numreviews,company.workenvironment),
			changeValueInAvg(OLD.benefits,NEW.benefits,company.numreviews,company.benefits),
			changeValueInAvg(OLD.overallsatisfaction,NEW.overallsatisfaction,company.numreviews,company.overallsatisfaction),
			company.name
		]);
	}

	else if(TG_OP.toLowerCase() === 'delete') {
		const subFromAvg = plv8.find_function("sub_from_average");
		updatePlan.execute([
			company.numreviews-1,
			subFromAvg(OLD.nummonthsworked,company.numreviews,company.avgnummonthsworked),
			subFromAvg((OLD.wouldrecommend) ? 1 : 0,company.numreviews,company.percentrecommended),
			subFromAvg(OLD.healthandsafety,company.numreviews,company.healthandsafety),
			subFromAvg(OLD.managerrelationship,company.numreviews,company.managerrelationship),
			subFromAvg(OLD.workenvironment,company.numreviews,company.workenvironment),
			subFromAvg(OLD.benefits,company.numreviews,company.benefits),
			subFromAvg(OLD.overallsatisfaction,company.numreviews,company.overallsatisfaction),
			company.name
		]);
	}

	updatePlan.free();
	return null;

$$ LANGUAGE plv8;
