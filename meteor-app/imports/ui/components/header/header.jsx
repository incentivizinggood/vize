import React from "react";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import withWindowWidth from "/imports/ui/hoc/window-width.jsx";
import NavBar from "./nav-bar.jsx";
import NavMenu from "./nav-menu.jsx";

function Header(props) {
	return props.windowWidth >= 1200 ? <NavBar /> : <NavMenu />;
}

export default withTracker(() => ({
	user: Meteor.user(),
}))(withWindowWidth(Header));
