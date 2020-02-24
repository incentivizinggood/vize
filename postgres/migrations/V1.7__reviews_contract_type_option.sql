ALTER TABLE reviews
	ADD COLUMN contractType varchar(20)	NOT NULL 
	CHECK (contractType='FULL_TIME' OR contractType='PART_TIME' OR contractType='INTERNSHIP' OR contractType='TEMPORARY' OR contractType='CONTRACTOR');
