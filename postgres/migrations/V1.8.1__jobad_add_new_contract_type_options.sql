ALTER TABLE jobads
	ADD CONSTRAINT jobads_contracttype_check
	CHECK (contractType='FULL_TIME' OR contractType='PART_TIME' OR contractType='INTERNSHIP' OR contractType='TEMPORARY' OR contractType='CONTRACTOR');
