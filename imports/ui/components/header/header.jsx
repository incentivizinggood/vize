import React from "react";

import { withTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";

import WorkerHeader from "./worker-header.jsx";
import EmployerHeader from "./employer-header.jsx";

function Header(props) {
	if (props.user) {
		if (props.user.role === "company") return <EmployerHeader />;
		if (props.user.role === "worker") return <WorkerHeader />;
	}
	return <WorkerHeader />;
}

export default withTracker(() => ({
	user: Meteor.user(),
}))(Header);
