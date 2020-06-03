import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import ScrollRestoration from "./components/scroll-restoration";
import Pages from "./pages";
import theme from "./theme";
import { LocaleProvider } from "./startup/i18n";
import ReactPixel from "react-facebook-pixel";
import ReactGA from "react-ga";

const options = {
	autoConfig: true, // set pixel's autoConfig
	debug: true, // enable logs
};

// Don't run analytics if testing. If testing analytics, comment this out on local
if (
	document.location.hostname !== "localhost" &&
	document.location.hostname !== "vize-staging-0.meteorapp.com"
) {
	ReactGA.initialize("UA-119033355-1");
	ReactPixel.init("812485162458693");
}

function AppRoot(props) {
	ReactPixel.pageView();
	ReactGA.pageview(window.location.pathname + window.location.search);

	return (
		<LocaleProvider>
			<ApolloProvider client={props.apolloClient}>
				<ThemeProvider theme={theme}>
					<BrowserRouter>
						<ScrollRestoration />
						<Pages />
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
