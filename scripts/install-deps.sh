#!/bin/bash


# Stop this script if any command fails.
set -e

# Install/update the project's dependencies.
echo "Installing project root npm packages"
yarn install --frozen-lockfile --ignore-engines

cd meteor-app

echo "Installing meteor-app npm packages"
yarn install --frozen-lockfile --ignore-engines

echo "Generating code"
yarn run gen

cd ..