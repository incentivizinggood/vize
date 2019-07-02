import React from "react";
import { Switch, Route } from "react-router-dom";

import ColorDemo from "./color-demo.jsx";
import FormDemo from "./form-demo.jsx";

function TestPage() {
	return (
		<Switch>
			<Route path="/test/color" component={ColorDemo} />
			<Route path="/test/form" component={FormDemo} />
		</Switch>
	);
}

export default TestPage;
