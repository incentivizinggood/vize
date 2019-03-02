import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "mdbreact/dist/css/mdb.css";

import Pages from "./pages";

const options = {
	// you can also just use 'bottom center'
	position: positions.BOTTOM_CENTER,
	timeout: 5000,
	offset: "30px",
	// you can also just use 'scale'
	transition: transitions.SCALE,
};

function AppRoot(props) {
	return (
		<ApolloProvider client={props.apolloClient}>
			<BrowserRouter>
				<AlertProvider template={AlertTemplate} {...options}>
					<Pages />
				</AlertProvider>
			</BrowserRouter>
		</ApolloProvider>
	);
}

/* eslint-disable react/forbid-prop-types */
AppRoot.propTypes = {
	apolloClient: PropTypes.any.isRequired,
};

export default AppRoot;
