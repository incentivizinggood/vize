FROM postgres:10.5

RUN apt-get update \
	&& apt-get install -y --no-install-recommends \
		postgresql-10-plv8

COPY scripts/init/ /docker-entrypoint-initdb.d/
