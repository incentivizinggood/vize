#!/bin/sh
# This is a simple helper script to build and run the project
# without having to remember the long docker commands.

# This project can be run in different "modes". The default mode is dev.
case $1 in
"i")
	# Install/update the project's dependencies.
	echo "Installing project root npm packages"
	npm i
	cd meteor-app
	echo "Installing meteor-app npm packages"
	npm i
	echo "Installing flow-typed library definitions"
	./node_modules/.bin/flow-typed install --overwrite
	echo "Installing Meteor packages"
	meteor lint
	cd ..
	;;
"prod")
	# This is the "proper" way to build and run a docker stack. This will
	# compile the meteor-app without caching between compiles and thus is VERY
	# slow. Most of the time you will want to use the dev mode instead.
	echo 'Running in "prod" mode...'
	sudo docker-compose \
		-f docker-compose.prod.yml \
		-f docker-compose.yml \
		up --build
	;;
"dev" | "")
	# Don't compile the meteor-app. Just run meteor in a container with volumes.
	# This is a strange way of using docker. Because the normal way is so slow
	# with Meteor, this way was made so that we can use Meteor's dev mode and
	# cache build artifacts. This makes building and rebuilding much faster
	# than prod mode, but it is not suitable for use in production deployments.
	echo 'Running in "dev" mode...'
	sudo docker-compose \
		-f docker-compose.dev.yml \
		-f docker-compose.yml \
		up --build
	;;
*)
	echo '"'$1'" is not a mode in which this project can be run.'
	exit -1
	;;
esac
