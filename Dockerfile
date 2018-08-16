FROM ubuntu:18.04

RUN apt-get update && \
    apt-get install -y curl

RUN curl "https://install.meteor.com/?release=1.6.1.1" | sh
ENV METEOR_ALLOW_SUPERUSER true

CMD ["meteor", "--version"]
