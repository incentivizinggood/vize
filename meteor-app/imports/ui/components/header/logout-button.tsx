import React from "react";

import { logout } from "imports/ui/auth";

function LogoutButton(props) {
	return (
		<a onClick={logout} style={{ cursor: "pointer" }} {...props}>
			{props.children}
		</a>
	);
}

export default LogoutButton;
