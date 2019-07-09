#!/bin/bash

# Install/update the project's dependencies.
echo "Installing project root npm packages"
yarn install --frozen-lockfile

cd meteor-app

echo "Installing meteor-app npm packages"
yarn install --frozen-lockfile

echo "Generating code"
yarn run gen

cd ..