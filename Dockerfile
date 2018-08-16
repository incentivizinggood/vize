FROM node:8

RUN curl "https://install.meteor.com/?release=1.6.1.1" | sh
ENV METEOR_ALLOW_SUPERUSER true

WORKDIR /usr/src/vize-meteor

COPY ./package.json ./
RUN meteor npm install

CMD ["meteor", "--version"]
