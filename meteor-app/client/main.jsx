import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import { $ } from "meteor/jquery";

/* The FlowRouter is automaticaly initialized on Meteor.startup.
 * The routes only need to be imported here. No other code is needed.
 */
import "/imports/startup/client/font-awesome.js";
import AppRoot from "../imports/ui/app-root.jsx";
import "../imports/startup/client/i18n.js";
import client from "../imports/startup/client/graphql.js";

Meteor.startup(() => {
	$.getScript("js/prettySticky.js", function() {});
	$.getScript("js/bootstrap-multiselect.js", function() {});

	(function(h, o, t, j, a, r) {
		h.hj =
			h.hj ||
			function() {
				(h.hj.q = h.hj.q || []).push(arguments);
			};
		h._hjSettings = { hjid: 1168709, hjsv: 6 };
		a = o.getElementsByTagName("head")[0];
		r = o.createElement("script");
		r.async = 1;
		r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
		a.appendChild(r);
	})(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");

	// Get the data for the currently logged in user.
	// This is nessisary for Meteor.user() to return extra fields such as role.
	// See also /imports/api/data/users.js for the publication.
	Meteor.subscribe("userData");

	ReactDOM.render(
		<AppRoot apolloClient={client} />,
		document.getElementById("app-root")
	);
});
