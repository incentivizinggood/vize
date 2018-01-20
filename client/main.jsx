import React from "react";
import { Meteor } from "meteor/meteor";

import "../imports/startup/client/router.jsx";

FlowRouter.wait();
Meteor.startup(() => {
    FlowRouter.initialize();
});
