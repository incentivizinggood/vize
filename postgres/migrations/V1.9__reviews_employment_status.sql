ALTER TABLE reviews
	ADD COLUMN employmentStatus text NOT NULL DEFAULT 'FORMER'
	CHECK (employmentStatus='FORMER' OR employmentStatus='CURRENT');
