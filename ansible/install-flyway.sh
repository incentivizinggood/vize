#!/bin/bash
set -e

FLYWAY_URL='https://repo1.maven.org/maven2/org/flywaydb/flyway-commandline/6.0.0/flyway-commandline-6.0.0-linux-x64.tar.gz'

wget -qO- $FLYWAY_URL | tar xvz
