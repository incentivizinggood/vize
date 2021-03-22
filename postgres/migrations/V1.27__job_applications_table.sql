-- Job Applications Table
DROP TABLE IF EXISTS job_applications;
CREATE TABLE job_applications (
	application_id serial PRIMARY KEY,
	full_name VARCHAR(40) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
	email text NOT NULL,
	cover_letter text,
	jobadid INTEGER,
	companyid INTEGER
);