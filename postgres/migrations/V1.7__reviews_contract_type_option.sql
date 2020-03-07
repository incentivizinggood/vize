ALTER TABLE reviews
	ADD COLUMN contractType text NOT NULL
	CHECK (contractType='FULL_TIME' OR contractType='PART_TIME' OR contractType='INTERNSHIP' OR contractType='TEMPORARY' OR contractType='CONTRACTOR')
	SET DEFAULT 'FULL_TIME';
