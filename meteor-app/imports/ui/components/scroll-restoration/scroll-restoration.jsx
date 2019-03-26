import React from "react";
import { withRouter } from "react-router-dom";

// This component resets the scroll position to the top when ever the route is
// changed. In the future this component should be enhanced to restore previous
// scroll positions when going backward and forward through the history.
class ScrollRestoration extends React.Component {
	componentDidUpdate(prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.scrollTo(0, 0);
		}
	}

	render() {
		return this.props.children;
	}
}

export default withRouter(ScrollRestoration);
