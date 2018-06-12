import React from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";

class AppRoot extends React.Component {
	render() {
		return <>{this.props.currentPage}</>;
	}
}

AppRoot.propTypes = {
	currentPage: PropTypes.element,
};

AppRoot.defaultProps = { currentPage: null };

const AppRootContainer = withTracker(({ currentPage }) => ({
	currentPage: currentPage.get(),
}))(AppRoot);

export default AppRootContainer;
