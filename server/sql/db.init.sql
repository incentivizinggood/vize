-- functions first, because our table creation statements use them
\i /home/jhigginbotham64/Desktop/vize/vize-meteor-app/server/sql/functions.init.sql;
-- initializes tables, including most foreign key and other constraints
\i /home/jhigginbotham64/Desktop/vize/vize-meteor-app/server/sql/tables.init.sql;
-- triggers last, because they use both the functions and the tables
\i /home/jhigginbotham64/Desktop/vize/vize-meteor-app/server/sql/triggers.init.sql;
