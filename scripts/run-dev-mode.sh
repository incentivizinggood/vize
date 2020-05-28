#!/bin/bash


# Stop this script if any command fails.
set -e

echo 'Running in "dev" mode...'
echo 'Make sure to start the databases first.'

# Set environment variables for Meteor.
export PGHOST=localhost
export PGPORT=5432
export PGUSER=meteor
export PGPASSWORD="123456789"
export PGDATABASE=meteor

# Start up the Meteor app.
cd meteor-app
meteor --no-lint --no-release-check
cd ..