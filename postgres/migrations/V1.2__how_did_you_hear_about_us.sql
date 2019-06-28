CREATE TABLE how_did_you_hear_about_us (
	user_id INTEGER
		UNIQUE
		REFERENCES users (userid)
			ON UPDATE CASCADE
			ON DELETE SET NULL,
	how TEXT
		NOT NULL
		CHECK (how IN ('radio', 'facebook', 'google', 'referral', 'other')),
	reported_on TIMESTAMP
		NOT NULL
		DEFAULT now()
);

COMMENT ON COLUMN how_did_you_hear_about_us.user_id IS
	'The user that reported how they heard about us.';
COMMENT ON COLUMN how_did_you_hear_about_us.how IS
	'The way that the user heard about us.';
COMMENT ON COLUMN how_did_you_hear_about_us.reported_on IS
	'The date and time that the user reported this information. This should be in UTC.';
