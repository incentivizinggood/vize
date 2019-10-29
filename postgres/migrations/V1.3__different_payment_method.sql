ALTER TABLE reward_wrote_a_review
	DROP CONSTRAINT reward_wrote_a_review_payment_method_check;
ALTER TABLE reward_wrote_a_review
	ADD CONSTRAINT reward_wrote_a_review_payment_method_check
	CHECK (payment_method IN ('PAYPAL', 'XOOM', 'SWAP'));
