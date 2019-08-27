import React from "react";

function LogoutButton(props) {
	return (
		<a href="/logout" style={{ cursor: "pointer" }} {...props}>
			{props.children}
		</a>
	);
}

export default LogoutButton;
