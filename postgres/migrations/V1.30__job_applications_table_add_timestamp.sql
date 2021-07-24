ALTER TABLE job_applications 
	ADD COLUMN date_added timestamp with time zone default now();