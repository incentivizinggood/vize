#!/bin/bash

set -e

# Starting and stoping docker-compose need root privaleges. Cache the
# authentication now so that the password does not need to entered at an odd
# place in the script.
/usr/bin/sudo \
	-p $'This script needs sudo permissions.\nPassword: ' \
	-v || exit 1

# Keep a list of all the backgrounded process ids.
sid=()

# Clean up the backgrounded processes.
shutdown() {
	for i in "${sid[@]}"; do
		# Send the same signal as crtl+c sends.
		/usr/bin/sudo kill -s SIGINT $i
	done
	wait
}
trap shutdown EXIT

# Start up the docker compose services.
/usr/bin/sudo -En docker-compose \
	-f docker-compose.yml \
	up --build &
sid+=($!)

# Set environment variables for Meteor.
export MONGO_URL="mongodb://localhost:27017/meteor"
export PGHOST=localhost
export PGPORT=5432
export PGUSER=meteor
export PGPASSWORD="123456789"
export PGDATABASE=meteor

# Start up the Meteor app.
cd meteor-app
meteor --no-lint --no-release-check &
sid+=($!)
cd ..

# Do not exit untill all of the background processes finish.
wait
