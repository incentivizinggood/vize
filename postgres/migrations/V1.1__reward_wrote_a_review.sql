CREATE TABLE reward_wrote_a_review (
	phone_number VARCHAR(15)
		PRIMARY KEY,
	user_id INTEGER
		UNIQUE
		REFERENCES users (userid)
			ON UPDATE CASCADE
			ON DELETE SET NULL,
	payment_method VARCHAR(12)
		NOT NULL
		CHECK (payment_method IN ('PAYPAL', 'XOOM')),
	claimed_on TIMESTAMP
		NOT NULL
		DEFAULT now()
);


COMMENT ON COLUMN reward_wrote_a_review.phone_number IS
	'The phone number the user gave when claiming this reward. Stored in E.164 format with out the +. This is used to prevent persons from claiming multiple rewards.';
COMMENT ON COLUMN reward_wrote_a_review.user_id IS
	'The user that claimed this reward.';
COMMENT ON COLUMN reward_wrote_a_review.payment_method IS
	'The way the user choose to receive this reward.';
COMMENT ON COLUMN reward_wrote_a_review.claimed_on IS
	'The time this reward was clamed. This is not nessisary for the rewards to work but it might be usefull information.';
