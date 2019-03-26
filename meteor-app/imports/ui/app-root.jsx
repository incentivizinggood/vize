import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import ScrollRestoration from "./components/scroll-restoration";
import Pages from "./pages";

function AppRoot(props) {
	return (
		<ApolloProvider client={props.apolloClient}>
			<BrowserRouter>
				<ScrollRestoration>
					<Pages />
				</ScrollRestoration>
			</BrowserRouter>
		</ApolloProvider>
	);
}

/* eslint-disable react/forbid-prop-types */
AppRoot.propTypes = {
	apolloClient: PropTypes.any.isRequired,
};

export default AppRoot;
