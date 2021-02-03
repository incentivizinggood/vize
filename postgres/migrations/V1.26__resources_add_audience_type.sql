ALTER TABLE resources
    ADD COLUMN audience_type text NOT NULL DEFAULT 'WORKERS'
	CHECK (audience_type='EMPLOYERS' OR audience_type='WORKERS' OR audience_type='ALL');

ALTER TABLE resource_topics
    ADD COLUMN audience_type text NOT NULL DEFAULT 'WORKERS'
	CHECK (audience_type='EMPLOYERS' OR audience_type='WORKERS' OR audience_type='ALL');