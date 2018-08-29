import { Meteor } from "meteor/meteor";
import React from "react";

import { withTracker } from "meteor/react-meteor-data";

import WorkerHeader from "/imports/ui/components/workerHeader.jsx";
import EmployerHeader from "/imports/ui/components/employerHeader.jsx";

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
