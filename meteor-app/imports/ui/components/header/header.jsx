import { Meteor } from "meteor/meteor";
import React from "react";

import { withTracker } from "meteor/react-meteor-data";

import WorkerHeader from "./worker-header.jsx";
import EmployerHeader from "./employer-header.jsx";
import FadableNav from "./fadable-nav.jsx";

function Header(props) {
	return (
		<div className="top-nav">
			<FadableNav animated={props.navIsAnimated}>
				<div className="container container--ui-fix">
					{props.user && props.user.role === "company" ? (
						<EmployerHeader />
					) : (
						<WorkerHeader />
					)}
				</div>
			</FadableNav>
		</div>
	);
}

export default withTracker(() => ({
	user: Meteor.user(),
}))(Header);
