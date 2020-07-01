#!/bin/bash


# Stop this script if any command fails.
set -e

# Download the config values from Heroku and set them as environment variables.
eval $(heroku config -s)

# Migrate the database with Flyway.
sudo docker run \
    -v "$(pwd)/postgres/migrations:/flyway/sql" \
    --rm flyway/flyway:6.5.0 \
    -url=jdbc:postgresql://$PGHOST:$PGPORT/$PGDATABASE \
    -user=$PGUSER \
    -password="$PGPASSWORD" \
    migrate

# Deploy to Heroku
git push heroku HEAD:master -f
