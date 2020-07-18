import React from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import ScrollRestoration from "./components/scroll-restoration";
import Pages from "./pages";
import { LocaleProvider } from "./startup/i18n";
import ReactPixel from "react-facebook-pixel";
import ReactGA from "react-ga";

// Don't run analytics if testing. If testing analytics, comment this out on local
if (
	document.location.hostname !== "localhost" &&
	document.location.hostname !== "vize-staging-0.meteorapp.com"
) {
	ReactGA.initialize("UA-119033355-1");
	ReactPixel.init("812485162458693");
}

interface AppRootProps {
	apolloClient: ApolloClient<{}>;
}

function AppRoot(props: AppRootProps) {
	ReactPixel.pageView();
	ReactGA.pageview(window.location.pathname + window.location.search);

	return (
		<LocaleProvider>
			<ApolloProvider client={props.apolloClient}>
				<BrowserRouter>
					<ScrollRestoration />
					<Pages />
				</BrowserRouter>
			</ApolloProvider>
		</LocaleProvider>
	);
}

export default AppRoot;
