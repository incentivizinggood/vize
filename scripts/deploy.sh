#!/bin/bash


# Stop this script if any command fails.
set -e

SETTINGS_FILE="$(realpath $1)"

# Update the version info file.
./scripts/get-version-info.sh

# Migrate the database with Flyway.
sudo docker run \
    -v "$(pwd)/postgres/migrations:/flyway/sql" \
    --rm boxfuse/flyway:5.2.1 \
    -url=jdbc:postgresql://$(jq --raw-output '."galaxy.meteor.com".env.PGHOST' $SETTINGS_FILE ):5432/vizedb \
    -user=vize \
    -password="$(jq --raw-output '."galaxy.meteor.com".env.PGPASSWORD' $SETTINGS_FILE )" \
    migrate

# Deploy the Meteor app to Galaxy.
cd meteor-app
DEPLOY_HOSTNAME=galaxy.meteor.com \
    meteor deploy \
    vize-staging-0.meteorapp.com \
    --settings $SETTINGS_FILE
