import React from "react";
import ReactDOM from "react-dom";

import client from "src/startup/graphql";
import initHotjar from "src/startup/hotjar";
import "src/startup/i18n";
import AppRoot from "src/app-root";

initHotjar();

ReactDOM.render(
	<AppRoot apolloClient={client} />,
	document.getElementById("app-root")
);
