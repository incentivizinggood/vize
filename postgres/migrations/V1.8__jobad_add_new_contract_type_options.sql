ALTER TABLE jobads
	DROP CONSTRAINT jobads_contracttype_check;

UPDATE jobads
SET contractType = 'FULL_TIME'
WHERE contractType = 'Full time';

UPDATE jobads
SET contractType = 'PART_TIME'
WHERE contractType = 'Part time';

UPDATE jobads
SET contractType = 'CONTRACTOR'
WHERE contractType = 'Contractor';
