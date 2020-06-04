import { Meteor } from "meteor/meteor";
import { WebApp } from "meteor/webapp";

import { app, onServerReady } from "imports/api/http/index";

// install the express server within meteor webapp connect
WebApp.rawConnectHandlers.use("/api", app);

Meteor.startup(() => {
	onServerReady();
});
