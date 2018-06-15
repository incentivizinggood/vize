CREATE FUNCTION hello() RETURNS VOID AS
$$
	plv8.elog(NOTICE, "Hello, world!");
$$ LANGUAGE plv8;

-- Okay, here's the tricky part:
-- One-many relationship from companies to locations,
-- many-one from locations to companies. Solved on
-- locations side by foreign key, but how to make sure
-- that each company has at least one location?

-- SOLUTION:
-- Foreign key as it currently stands, plus
-- "deferred constraint triggers", one for each
-- case (after update/delete/truncate on locations,
-- after insert on companies, constraint triggers
-- can only be after but it's fine because they
-- roll back the transaction).

-- QUESTION
-- What language to write triggers in? PostgreSQL doesn't
-- support full trigger definitions via DDL like Maria does.
-- Options: C (requires clunky setup, harder to secure)
--			pgSQL (fine, but not very powerful)
--			tcl (fine, but would have to learn)
--			Python (great, but not-fully-supported by postgres and seems very insecure)
--			Perl (great, well-supported and secure but hard to read,
--			and would have to learn)
-- SCRATCH ALL THAT
-- I would have gone with Perl, but the learning curve seems really steep.
-- Will see how far I get with pl/V8 (Javascript) via CREATE EXTENSION,
-- because this stuff just needs to get done.
-- Why? It's a "trusted" (doesn't have to run as root) language that
-- I already know and provides all the necessary power, we just need to install
-- it, which means breaking out of the Meteor ecosystem a bit.

-- WARNING
-- If this succeeds, the Vize Web App project will depend on PL/V8,
-- which will have to be manually installed on Galaxy by...probably me.
-- Although I guess it wouldn't be hard to just clone the repo and
-- "make install", which is basically what the instructions on their
-- website tell you to do.
