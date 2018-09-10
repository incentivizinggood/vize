CREATE EXTENSION plv8;
-- functions first, because our table creation statements use them
\i ./docker-entrypoint-initdb.d/init-functions.sql;
-- initializes tables, including most foreign key and other constraints
\i ./docker-entrypoint-initdb.d/init-tables.sql;
-- triggers next, because they use both the functions and the tables
\i ./docker-entrypoint-initdb.d/init-triggers.sql;
-- views last, because they depend on everything else
\i ./docker-entrypoint-initdb.d/init-views.sql;
