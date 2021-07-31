ALTER TABLE job_applications 
	ADD COLUMN date_added timestamp with time zone default now();

ALTER TABLE job_applications 
	ADD COLUMN location_city text NOT NULL;

ALTER TABLE job_applications 
	ADD COLUMN location_neighborhood text;

COMMENT ON COLUMN job_applications.location_neighborhood IS
	'The neighborhood or area of the city where the worker is located';

ALTER TABLE job_applications 
	ADD COLUMN work_experiences jsonb;

ALTER TABLE job_applications 
	ADD COLUMN skills text[];

ALTER TABLE job_applications 
	ADD COLUMN certificates_and_licences text[];

ALTER TABLE job_applications 
	ADD COLUMN english_proficiency text
        NOT NULL
        CHECK (english_proficiency IN ('NATIVE_LANGUAGE', 'FLUENT', 'CONVERSATIONAL', 'BASIC', 'NO_PROFICIENCY'));

ALTER TABLE job_applications 
	ADD COLUMN education_level text
        NOT NULL
        CHECK (education_level IN ('SOME_HIGH_SCHOOL', 'HIGH_SCHOOL', 'SOME_COLLEGE', 'COLLEGE_DEGREE'));

COMMENT ON COLUMN job_applications.education_level IS
	'The highest level of education a worker has achieved';

ALTER TABLE job_applications 
	ADD COLUMN work_availability text[]
        NOT NULL
        CHECK (work_availability <@ ARRAY['MORNING_SHIFT', 'AFTERNOON_SHIFT', 'NIGHT_SHIFT']);

ALTER TABLE job_applications 
	ADD COLUMN availability_comments text;
