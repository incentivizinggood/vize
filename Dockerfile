FROM node:8

RUN curl "https://install.meteor.com/?release=1.6.1.1" | sh
ENV METEOR_ALLOW_SUPERUSER true


ENV APP_SOURCE_DIR /opt/meteor/src
ENV APP_BUNDLE_DIR /opt/meteor/dist


WORKDIR $APP_SOURCE_DIR

COPY ./package.json ./
RUN meteor npm install

COPY . .
RUN meteor build $APP_BUNDLE_DIR --directory --server-only
