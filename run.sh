#!/bin/bash
# This is a simple helper script to build and run the project
# without having to remember the long docker commands.

# This project can be run in different "modes". The default mode is dev.
case $1 in
"i")
	# Install/update the project's dependencies.
	echo "Installing project root npm packages"
	yarn install --frozen-lockfile
	cd meteor-app
	echo "Installing meteor-app npm packages"
	yarn install --frozen-lockfile
	echo "Generating code"
	yarn run gen
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
"build")
	echo "Building the Meteor app..."

	cd meteor-app
	meteor build --server-only ../dist
	cd ..

	;;
"deploy")
	ansible-playbook -i ansible/inventory.ini ansible/playbook.yml
	;;
*)
	echo '"'$1'" is not a mode in which this project can be run.'
	exit -1
	;;
esac
