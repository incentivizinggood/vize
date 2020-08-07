#!/bin/bash


# Stop this script if any command fails.
set -e

# You must specify what remote to deploy to. 
# This tells heroku what enviornment (staging or production) to deploy to.
REMOTE=$1

# Download the config values from Heroku and set them as environment variables.
eval $(heroku config --remote $REMOTE --shell)

# Migrate the database with Flyway.
sudo docker run \
    -v "$(pwd)/postgres/migrations:/flyway/sql" \
    --rm flyway/flyway:6.5.0 \
    -url=jdbc:postgresql://$PGHOST:$PGPORT/$PGDATABASE \
    -user=$PGUSER \
    -password="$PGPASSWORD" \
    migrate

# Deploy to Heroku
git push $REMOTE HEAD:master -f
