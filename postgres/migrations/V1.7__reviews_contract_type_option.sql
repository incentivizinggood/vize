ALTER TABLE reviews
	ADD COLUMN contractType text NOT NULL DEFAULT 'FULL_TIME'
	CHECK (contractType='FULL_TIME' OR contractType='PART_TIME' OR contractType='INTERNSHIP' OR contractType='TEMPORARY' OR contractType='CONTRACTOR');
