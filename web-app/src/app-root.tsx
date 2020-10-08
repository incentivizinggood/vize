import React from "react";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";

import ScrollRestoration from "./components/scroll-restoration";
import Pages from "./pages";
import { LocaleProvider } from "./startup/i18n";

interface AppRootProps {
	apolloClient: ApolloClient<{}>;
}

function AppRoot(props: AppRootProps) {
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
