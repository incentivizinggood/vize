#!/bin/bash
# This is a simple helper script to build and run the project
# without having to remember the long docker commands.

# This project can be run in different "modes". The default mode is dev.
case $1 in
"i")
	# Install/update the project's dependencies.
	echo "Installing project root npm packages"
	npm ci
	cd meteor-app
	echo "Installing meteor-app npm packages"
	npm ci
	echo "Generating code"
	npm run gen
	cd ..
	;;
"dev" | "")
	echo 'Running in "dev" mode...'
	echo 'Make sure to start the databases first.'

	# Set environment variables for Meteor.
	export MONGO_URL="mongodb://localhost:27017/meteor"
	export PGHOST=localhost
	export PGPORT=5432
	export PGUSER=meteor
	export PGPASSWORD="123456789"
	export PGDATABASE=meteor

	# Start up the Meteor app.
	cd meteor-app
	meteor --no-lint --no-release-check
	cd ..
	;;
"db")
	echo "Running database(s)..."
	sudo docker-compose \
		-f docker-compose.yml \
		up --build
	;;
"deploy")
	SETTINGS_FILE="$(realpath $2)"
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
	;;
*)
	echo '"'$1'" is not a mode in which this project can be run.'
	exit -1
	;;
esac
