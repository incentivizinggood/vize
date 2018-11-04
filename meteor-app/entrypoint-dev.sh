#!/bin/bash

function install-meteor {
	curl "https://install.meteor.com/?release=1.6.1.1" | sh
}

export PATH="$HOME/.meteor:$PATH"

meteor --version || install-meteor

meteor npm install && meteor --no-lint --no-release-check
