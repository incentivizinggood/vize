ALTER TABLE jobads 
	ADD COLUMN external_job_post_URL text,
	ADD COLUMN is_archived boolean DEFAULT FALSE;
 