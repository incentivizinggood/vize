FROM node:8.11.4-jessie

# Install gosu. su does not work inside of the entry point for some reason.
ARG GOSU_VERSION=1.10
RUN dpkgArch="$(dpkg --print-architecture | awk -F- '{ print $NF }')" \
	&& wget -O /usr/local/bin/gosu "https://github.com/tianon/gosu/releases/download/$GOSU_VERSION/gosu-$dpkgArch" \
	&& chmod +x /usr/local/bin/gosu \
	&& gosu nobody true


ENV HOME /home/node

ENV APP_DIR $HOME/meteor
ENV APP_SOURCE_DIR $APP_DIR/src

# Need super user in the entry point script.
USER root

WORKDIR $APP_SOURCE_DIR

COPY docker-scripts/* /docker-scripts/
ENTRYPOINT /docker-scripts/entrypoint.sh
