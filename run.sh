#!/bin/bash

# This project can be run in different "modes". The default mode is dev.
case $1 in
"i")
	exec ./scripts/install-deps.sh
	;;
"dev" | "")
	exec ./scripts/run-dev-mode.sh
	;;
"db")
	exec ./scripts/run-databases.sh
	;;
"deploy")
	exec ./scripts/deploy.sh "$2"
	;;
*)
	echo '"'$1'" is not a mode in which this project can be run.'
	exit -1
	;;
esac
