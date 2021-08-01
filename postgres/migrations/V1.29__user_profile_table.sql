-- User Profiles Table
DROP TABLE IF EXISTS user_profiles CASCADE;
CREATE TABLE user_profiles (
	userid serial PRIMARY KEY,
    date_added timestamp with time zone default now(),
	full_name VARCHAR(40) NOT NULL,
	phone_number VARCHAR(15) NOT NULL,
	location_city text NOT NULL,
	location_neighborhood text,
    work_experiences jsonb,
	skills text[],
	certificates_and_licences text[],
	english_proficiency text
        NOT NULL
        CHECK (english_proficiency IN ('NATIVE_LANGUAGE', 'FLUENT', 'CONVERSATIONAL', 'BASIC', 'NO_PROFICIENCY')),
	education_level text
        NOT NULL
        CHECK (education_level IN ('SOME_HIGH_SCHOOL', 'HIGH_SCHOOL', 'SOME_COLLEGE', 'COLLEGE_DEGREE')),
    work_availability text[]
        NOT NULL
        CHECK (work_availability <@ ARRAY['MORNING_SHIFT', 'AFTERNOON_SHIFT', 'NIGHT_SHIFT']),
    availability_comments text,
    long_term_professional_goal text
);

COMMENT ON COLUMN user_profiles.long_term_professional_goal IS
	'Where the worker wants to be professionally in 3-10 years';

COMMENT ON COLUMN user_profiles.location_neighborhood IS
	'The neighborhood or area of the city where the worker is located';

COMMENT ON COLUMN user_profiles.education_level IS
	'The highest level of education a worker has achieved';
