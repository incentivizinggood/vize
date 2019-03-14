import { Accounts } from "meteor/accounts-base";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
	uri: "/graphql",
	request: operation =>
		operation.setContext(() => ({
			headers: {
				// Store the login token in a header so that the app server
				// knows who the user is.
				authorization: Accounts._storedLoginToken(),
			},
		})),
});

export default client;
