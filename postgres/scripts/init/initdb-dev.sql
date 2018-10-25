CREATE EXTENSION plv8;
-- functions first, because our table creation statements use them
\i ./init/init-functions.sql;
-- initializes tables, including most foreign key and other constraints
\i ./init/init-tables.sql;
-- triggers next, because they use both the functions and the tables
\i ./init/init-triggers.sql;
-- views last, because they depend on everything else
\i ./init/init-views.sql;
