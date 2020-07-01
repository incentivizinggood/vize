import React from "react";

import { logout } from "src/auth";

type LogoutButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

function LogoutButton(props: LogoutButtonProps) {
	return (
		<a onClick={logout} style={{ cursor: "pointer" }} {...props}>
			{props.children}
		</a>
	);
}

export default LogoutButton;
