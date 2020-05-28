#!/bin/bash

# This script gets information about the current version of the app.
# This is used to tell us what version is running on a server.

# Stop this script if any command fails.
set -e

COMMIT_HASH=$(git rev-parse HEAD)

# The current time as an ISO 8601 timestamp.
CURRENT_TIME=$(date -Is --utc)

# The current time in a human readable format.
CURRENT_TIME_HR=$(date '+%Y %b %d</b> at <b>%l:%M%P %Z')

echo "<!DOCTYPE html>
<html>
<head>
	<title>Version Info</title>
</head>
<body>
	<h1>Version Info</h1>
	<p>
		This version was deployed on
		<time datetime='$CURRENT_TIME'><b>$CURRENT_TIME_HR</b></time>
		from the commit
		<a href='https://github.com/incentivizinggood/vize/commit/$COMMIT_HASH' target='_blank'>
			$COMMIT_HASH
		</a>.
	</p>
	The output from <code>git status</code> was
	<br/>
	<pre style='border: 1px black solid; padding:0.5em; display:inline-block'>$(git status)</pre>
	<br/>
</body>" > meteor-app/public/version.html
