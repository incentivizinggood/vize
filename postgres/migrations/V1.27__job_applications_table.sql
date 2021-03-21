-- Job Applications Table
DROP TABLE IF EXISTS job_applications CASCADE;
CREATE TABLE job_applications (
	application_id serial PRIMARY KEY,
	full_name VARCHAR(40),
    phone_number VARCHAR(15),
	email text,
	cover_letter text
);