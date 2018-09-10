CREATE EXTENSION plv8;
-- functions first, because our table creation statements use them
\i /opt/vize/db-scripts/init/init-functions.sql;
-- initializes tables, including most foreign key and other constraints
\i /opt/vize/db-scripts/init/init-tables.sql;
-- triggers next, because they use both the functions and the tables
\i /opt/vize/db-scripts/init/init-triggers.sql;
-- views last, because they depend on everything else
\i /opt/vize/db-scripts/init/init-views.sql;
