-- Job Applications Table
DROP TABLE IF EXISTS job_applications;
CREATE TABLE job_applications (
	application_id serial PRIMARY KEY,
	date_added timestamp with time zone default now(),
	full_name VARCHAR(40) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
	email text NOT NULL,
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
	cover_letter text,
	jobadid INTEGER,
	companyid INTEGER
);

COMMENT ON COLUMN job_applications.location_neighborhood IS
	'The neighborhood or area of the city where the worker is located';

COMMENT ON COLUMN job_applications.education_level IS
	'The highest level of education a worker has achieved';
