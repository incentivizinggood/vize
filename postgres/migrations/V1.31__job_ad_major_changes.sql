ALTER TABLE jobads 
	ADD COLUMN skills text[],
	ADD COLUMN certificates_and_licences text[],
	ADD COLUMN minimum_education text
        CHECK (minimum_education IN ('SOME_HIGH_SCHOOL', 'HIGH_SCHOOL', 'SOME_COLLEGE', 'COLLEGE_DEGREE')),
	ADD COLUMN minimum_english_proficiency text
        CHECK (minimum_english_proficiency IN ('NATIVE_LANGUAGE', 'FLUENT', 'CONVERSATIONAL', 'BASIC', 'NO_PROFICIENCY')),
	ADD COLUMN shifts json,
	DROP COLUMN responsibilities,
	DROP COLUMN qualifications,
	DROP COLUMN start_day,
	DROP COLUMN end_day,
	DROP COLUMN start_time,
	DROP COLUMN end_time;
 