FROM node:8

RUN curl "https://install.meteor.com/?release=1.6.1.1" | sh
ENV METEOR_ALLOW_SUPERUSER true


ENV APP_SOURCE_DIR /opt/meteor/src
ENV APP_BUNDLE_DIR /opt/meteor/dist


WORKDIR $APP_SOURCE_DIR

# Only copy the files that NPM needs to install build dependencies.
# This avoids unneeded reinstalls when other files change.
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

RUN meteor build $APP_BUNDLE_DIR --directory --server-only
WORKDIR $APP_BUNDLE_DIR/bundle/programs/server/
RUN meteor npm install --production --verbose
RUN chown -R node:node $APP_BUNDLE_DIR


# Default values for Meteor environment variables
ENV ROOT_URL http://localhost
ENV MONGO_URL mongodb://mongo:27017/meteor
ENV PORT 80

EXPOSE 80

WORKDIR $APP_BUNDLE_DIR/bundle
CMD ["node", "main.js"]
