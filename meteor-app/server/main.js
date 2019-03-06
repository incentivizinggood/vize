import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

import { app, onServerReady } from "/imports/api";

// install the express server within meteor webapp connect
WebApp.rawConnectHandlers.use(app);

Meteor.startup(() => {
	onServerReady();
});
