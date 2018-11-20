# This docker file is for building a production image.
# This build can take several minutes to finish.
# If you are doing development level testing use the docker-compose.dev.yml.
# It's much faster.

FROM node:8.11.4-jessie as builder

RUN curl "https://install.meteor.com/?release=1.6.1.1" | sh

ENV METEOR_ALLOW_SUPERUSER true
ENV APP_SOURCE_DIR /opt/meteor/src
ENV APP_BUNDLE_DIR /opt/meteor/dist

WORKDIR $APP_SOURCE_DIR

COPY package.json ./
RUN meteor npm install

# Only copy the files that meteor needs to build the app.
# This avoids unneeded rebuilds when other files change.
COPY .meteor/ .meteor/
COPY client/ client/
COPY i18n/ i18n/
COPY imports/ imports/
COPY public/ public/
COPY server/ server/
COPY .meteorignore ./

RUN meteor build $APP_BUNDLE_DIR --directory --server-only \
	&& cd $APP_BUNDLE_DIR/bundle/programs/server/ \
	&& meteor npm install --production \
	&& chown -R node:node $APP_BUNDLE_DIR


FROM node:8.11.4-slim as prod

USER node

ENV APP_DIR /home/node/app

WORKDIR $APP_DIR
COPY --from=builder /opt/meteor/dist/bundle/ $APP_DIR/

# Expecting environment vars to be set outside of this image.

CMD ["node", "main.js"]
