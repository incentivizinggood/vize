import React from "react";
import { useLocation } from "react-router-dom";

// This component resets the scroll position to the top when ever the route is
// changed. In the future this component should be enhanced to restore previous
// scroll positions when going backward and forward through the history.
function ScrollRestoration() {
	const { pathname } = useLocation();

	React.useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
}

export default ScrollRestoration;
