import { Meteor } from "meteor/meteor";
import { $ } from "meteor/jquery";

/* The FlowRouter is automaticaly initialized on Meteor.startup.
 * The routes only need to be imported here. No other code is needed.
 */
import "../imports/startup/client/router.jsx";
import "../imports/startup/client/i18n.js";

Meteor.startup(() => {
	console.log("Client starting.");
	$.getScript("js/prettySticky.js", function() {});
	$.getScript("js/bootstrap-multiselect.js", function() {});
});
