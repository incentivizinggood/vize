import { Meteor } from "meteor/meteor";
import { $ } from "meteor/jquery";
import ApolloClient from "apollo-client";
import { meteorClientConfig } from "meteor/apollo";

/* The FlowRouter is automaticaly initialized on Meteor.startup.
 * The routes only need to be imported here. No other code is needed.
 */
import "../imports/startup/client/router.jsx";
import "../imports/startup/client/i18n.js";

const client = new ApolloClient(meteorClientConfig());

Meteor.startup(() => {
	$.getScript("js/prettySticky.js", function() {});
	$.getScript("js/bootstrap-multiselect.js", function() {});
});
