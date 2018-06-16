-- regex check for email w/ TLD
CREATE OR REPLACE FUNCTION is_valid_email_with_tld(arg text)
RETURNS boolean AS
$$
	const emailWithTldRegex= /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailWithTldRegex.test(arg);
$$ LANGUAGE plv8;

-- regex check for URL
CREATE OR REPLACE FUNCTION is_valid_url(arg text)
RETURNS boolean AS
$$
	const urlRegex=/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
	return urlRegex.test(arg);
$$ LANGUAGE plv8;

-- trigger function to hackishly kind-of-enforce a foreign key constraint
-- on companies, our workaround for not being in Meteor/Mongo where we
-- can specify that array fields must have a minimum number of elements,
-- and not being in MariaDB where we can specify a foreign key reference
-- to a partial key
CREATE OR REPLACE FUNCTION check_company_locations() RETURNS TRIGGER AS
$$
	return NEW;
$$ LANGUAGE plv8;
