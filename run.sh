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
	echo "Installing Meteor packages"
	meteor lint
	cd ..
	;;
"dev" | "")
	# Don't compile the meteor-app. Just run meteor in a container with volumes.
	# This is a strange way of using docker. Because the normal way is so slow
	# with Meteor, this way was made so that we can use Meteor's dev mode and
	# cache build artifacts. This makes building and rebuilding much faster
	# than prod mode, but it is not suitable for use in production deployments.
	echo 'Running in "dev" mode...'
	./scripts/run-dev-mode.sh
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
