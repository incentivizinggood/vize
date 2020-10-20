ALTER TABLE jobads
    ADD COLUMN start_time time without time zone, -- Don't use time zones. Just store the times in local time.
    ADD COLUMN end_time time without time zone,
    ADD COLUMN start_day integer CHECK (start_day BETWEEN 0 AND 6), -- The day of the week (0 - 6; Sunday is 0)
    ADD COLUMN end_day integer CHECK (end_day BETWEEN 0 AND 6);
