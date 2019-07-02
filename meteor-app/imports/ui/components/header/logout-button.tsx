import React from "react";

import { Meteor } from "meteor/meteor";

function LogoutButton(props) {
	return (
		<a onClick={Meteor.logout} style={{ cursor: "pointer" }} {...props}>
			{props.children}
		</a>
	);
}

export default LogoutButton;
