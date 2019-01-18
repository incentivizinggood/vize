import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import Pages from "./pages";

function AppRoot(props) {
	return (
		<ApolloProvider client={props.apolloClient}>
			<BrowserRouter>
				<Pages />
			</BrowserRouter>
		</ApolloProvider>
	);
}

/* eslint-disable react/forbid-prop-types */
AppRoot.propTypes = {
	apolloClient: PropTypes.any.isRequired,
};

export default AppRoot;
