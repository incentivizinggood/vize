import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";

/* The FlowRouter is automaticaly initialized on Meteor.startup.
 * The routes only need to be imported here. No other code is needed.
 */
import "/imports/startup/client/font-awesome.js";
import AppRoot from "../imports/ui/app-root.jsx";
import "../imports/startup/client/i18n.js";
import client from "../imports/startup/client/graphql.js";

Meteor.startup(() => {
	// Get the data for the currently logged in user.
	// This is nessisary for Meteor.user() to return extra fields such as role.
	// See also /imports/api/data/users.js for the publication.
	Meteor.subscribe("userData");

	ReactDOM.render(
		<AppRoot apolloClient={client} />,
		document.getElementById("app-root")
	);
});
