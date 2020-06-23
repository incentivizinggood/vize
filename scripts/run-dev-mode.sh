#!/bin/bash


# Stop this script if any command fails.
set -e

echo 'Running in "dev" mode...'
echo 'Make sure to start the databases first.'

./scripts/with-dev-env-vars.sh yarn watch