import React from "react";
import PropTypes from "prop-types";
import { ApolloProvider } from "react-apollo";
import { withTracker } from "meteor/react-meteor-data";

function AppRoot(props) {
	return (
		<ApolloProvider client={props.apolloClient}>
			{props.currentPage}
		</ApolloProvider>
	);
}

/* eslint-disable react/forbid-prop-types */
AppRoot.propTypes = {
	currentPage: PropTypes.element,
	apolloClient: PropTypes.any.isRequired,
};

AppRoot.defaultProps = { currentPage: null };

const AppRootContainer = withTracker(({ currentPage, apolloClient }) => ({
	currentPage: currentPage.get(),
	apolloClient,
}))(AppRoot);

export default AppRootContainer;
