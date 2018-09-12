FROM postgres:10.5

RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		postgresql-10-plv8

# Copy in the SQL scripts and symlink the init script so that it will be run.
COPY scripts/ /opt/vize/db-scripts/
RUN ln -s /opt/vize/db-scripts/init/init-db.sql /docker-entrypoint-initdb.d/init-db.sql
