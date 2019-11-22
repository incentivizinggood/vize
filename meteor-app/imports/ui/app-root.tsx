import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import ScrollRestoration from "./components/scroll-restoration";
import Pages from "./pages";
import theme from "./theme";
import { LocaleProvider } from "./startup/i18n";
import ReactPixel from 'react-facebook-pixel';

function AppRoot(props) {
	const options = {
	    autoConfig: true, 	// set pixel's autoConfig
	    debug: false, 		// enable logs
	};
	ReactPixel.init(process.env.FBPIXEL, options);
	ReactPixel.pageView();
	return (
		<LocaleProvider>
			<ApolloProvider client={props.apolloClient}>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<ScrollRestoration>
							<Pages />
						</ScrollRestoration>
					</BrowserRouter>
				</ThemeProvider>
			</ApolloProvider>
		</LocaleProvider>
	);
}

/* eslint-disable react/forbid-prop-types */
AppRoot.propTypes = {
	apolloClient: PropTypes.any.isRequired,
};

export default AppRoot;
