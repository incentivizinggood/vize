import React from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import { $ } from "meteor/jquery";

/* The FlowRouter is automaticaly initialized on Meteor.startup.
 * The routes only need to be imported here. No other code is needed.
 */
import { currentPage } from "../imports/startup/client/router.jsx";
import AppRoot from "../imports/ui/app-root.jsx";
import "../imports/startup/client/i18n.js";
import "../imports/startup/client/graphql.js";

Meteor.startup(() => {
	$.getScript("js/prettySticky.js", function() {});
	$.getScript("js/bootstrap-multiselect.js", function() {});

	ReactDOM.render(
		<AppRoot currentPage={currentPage} />,
		document.getElementById("app-root")
	);
});
