import React from "react";
import ReactDOM from "react-dom";

import { Meteor } from "meteor/meteor";

import client from "imports/ui/startup/graphql";
import initHotjar from "imports/ui/startup/hotjar";
import "imports/ui/startup/i18n";
import AppRoot from "imports/ui/app-root";

Meteor.startup(() => {
	initHotjar();
	// Get the data for the currently logged in user.
	// This is nessisary for Meteor.user() to return extra fields such as role.
	// See also imports/api/data/users.js for the publication.
	Meteor.subscribe("userData");

	ReactDOM.render(
		<AppRoot apolloClient={client} />,
		document.getElementById("app-root")
	);
});
