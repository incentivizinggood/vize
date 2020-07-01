#!/bin/bash


# Stop this script if any command fails.
set -e

# Set environment variables for development mode.
export PGHOST=localhost
export PGPORT=5432
export PGUSER=meteor
export PGPASSWORD="123456789"
export PGDATABASE=meteor

exec $@