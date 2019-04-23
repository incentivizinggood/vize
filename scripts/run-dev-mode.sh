#!/bin/bash

set -e

/usr/bin/sudo \
	-p $'This script needs sudo permissions.\nPassword: ' \
	-v || exit 1

sid=()
finnish() {
	for i in "${sid[@]}"; do
		/usr/bin/sudo kill -s SIGINT $i
	done
	wait
}
trap finnish EXIT

/usr/bin/sudo -En docker-compose \
	-f docker-compose.yml \
	up --build &
sid+=($!)

export MONGO_URL="mongodb://localhost:27017/meteor"
export PGHOST=localhost
export PGPORT=5432
export PGUSER=meteor
export PGPASSWORD="123456789"
export PGDATABASE=meteor

cd meteor-app
meteor --no-lint --no-release-check &
sid+=($!)
cd ..

wait
