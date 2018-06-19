-- functions first, because our table creation statements use them
\i ./server/sql/init/init-functions.sql;
-- initializes tables, including most foreign key and other constraints
\i ./server/sql/init/init-tables.sql;
-- triggers last, because they use both the functions and the tables
\i ./server/sql/init/init-triggers.sql;
