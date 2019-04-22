#!/bin/bash

set -e

# Change user id and group id to match the host OS.
usermod -u $NODE_UID node
groupmod -g $NODE_GID node

# Run the script as the node user.
# The su command does not work here for some reason.
gosu node /entrypoint-dev.sh
