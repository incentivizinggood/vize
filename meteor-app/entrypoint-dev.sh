#!/bin/bash

set -e

if [ "$(id -u)" = "0" ]; then
	echo "We is root"
	id
	env | sort
	echo "Changing user id"
	usermod -u $NODE_UID node
	echo "Changing group id"
	groupmod -g $NODE_GID node
	echo "switching user to node"
	gosu node /entrypoint-dev.sh
	id
	sleep 50d
	exit
fi
echo "We si not root"

id
exit

function install-meteor {
	# Meteor is stupid and tries to delete and move around it's dotfile during
	# installation. Because the dotfile is a volume, we have to trick the Meteor
	# installer into acting inside the dotfile instead of on the dotfile.
	# Normaly one would install meteor with just:
	# curl "https://install.meteor.com/?release=1.6.1.1" | sh
	echo "Cleaning out the Meteor dotfile..."
	rm -rfv ~/.meteor/*
	echo "Installing Meteor..."
	curl "https://install.meteor.com/?release=1.6.1.1" | HOME="$HOME/.meteor" sh
	mv ~/.meteor/.meteor/* ~/.meteor/
	rm -d ~/.meteor/.meteor
}

export PATH="$HOME/.meteor:$PATH"

meteor --version || install-meteor

meteor --no-lint --no-release-check
