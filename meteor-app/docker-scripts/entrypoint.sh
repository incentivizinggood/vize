#!/bin/bash

set -e

# Change user id and group id to match the host OS.
# This is done so that we can share files with out messing up their ownership.
usermod -u $NODE_UID node
groupmod -g $NODE_GID node

# Run the script as the node user.
# The su command does not work here for some reason.
gosu node /docker-scripts/launch-dev-server.sh
