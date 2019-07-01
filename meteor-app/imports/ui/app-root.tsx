import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import ScrollRestoration from "./components/scroll-restoration";
import Pages from "./pages";
import theme from "./theme";

function AppRoot(props) {
	return (
		<ApolloProvider client={props.apolloClient}>
			<ThemeProvider theme={theme}>
				<BrowserRouter>
					<ScrollRestoration>
						<Pages />
					</ScrollRestoration>
				</BrowserRouter>
			</ThemeProvider>
		</ApolloProvider>
	);
}

/* eslint-disable react/forbid-prop-types */
AppRoot.propTypes = {
	apolloClient: PropTypes.any.isRequired,
};

export default AppRoot;
