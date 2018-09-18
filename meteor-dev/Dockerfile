FROM node:8.11.4-jessie

USER node
ENV HOME /home/node

ENV APP_DIR $HOME/meteor
ENV APP_SCRIPTS_DIR $APP_DIR/scripts
ENV APP_SOURCE_DIR $APP_DIR/src
ENV APP_BUNDLE_DIR $APP_DIR/dist

# Pre-create volume mount points so that the "node" user will own them.
RUN mkdir -p \
	$HOME/.meteor \
	$APP_SOURCE_DIR \
	$APP_SOURCE_DIR/node_modules \
	$APP_SOURCE_DIR/.meteor/local

COPY dev-run $APP_SCRIPTS_DIR/

WORKDIR $APP_SOURCE_DIR

CMD $APP_SCRIPTS_DIR/dev-run
