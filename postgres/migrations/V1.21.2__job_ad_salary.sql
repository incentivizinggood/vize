ALTER TABLE jobads
ALTER COLUMN salary_min SET NOT NULL,
ALTER COLUMN salary_max SET NOT NULL,
ALTER COLUMN salary_type SET NOT NULL,
DROP COLUMN pesosperhour;

DROP FUNCTION is_valid_pay_range;
