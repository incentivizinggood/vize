#!/bin/bash

set -e

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

# Install Meteor if it is not already installed.
meteor --version || install-meteor

# Enshure dependencies are installed.
npm i

# Start the dev server.
meteor --no-lint --no-release-check
