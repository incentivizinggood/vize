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

COPY scripts/ scripts/

RUN scripts/build-meteor


FROM node:8.11.4-slim as prod

ENV APP_BUNDLE_DIR /opt/meteor/dist

# Default values for Meteor environment variables
ENV ROOT_URL http://localhost
ENV MONGO_URL mongodb://mongo:27017/meteor
ENV PORT 80

EXPOSE 80

WORKDIR $APP_BUNDLE_DIR/bundle
COPY --from=builder $APP_BUNDLE_DIR/ $APP_BUNDLE_DIR/
CMD ["node", "main.js"]
