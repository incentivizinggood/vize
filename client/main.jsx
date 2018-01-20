import React from "react";
import { render } from "react-dom";
import { Meteor } from "meteor/meteor";

import "./main.html";
import { siteRoutes } from "../imports/startup/client/routes.jsx";

Meteor.startup(() => {
    render(siteRoutes, document.getElementById("view-render"));
});
