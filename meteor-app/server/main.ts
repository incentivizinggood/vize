import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

import { app, onServerReady } from "imports/api/http/index";
// Import all of the collection and method definitions.
// These files need to be run to initialize the MongoDB connections.
import "imports/api/data";

// install the express server within meteor webapp connect
WebApp.rawConnectHandlers.use(app);

Meteor.startup(() => {
	onServerReady();
});
