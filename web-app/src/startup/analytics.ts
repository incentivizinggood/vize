import React from "react";
import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";
import { useLocation } from "react-router-dom";

/** Don't run analytics if testing.
 * If testing analytics, test this to true manually.
 */
export const analyticsEnabled = document.location.hostname === "www.vize.mx";

if (analyticsEnabled) {
	ReactGA.initialize("UA-119033355-1");
	ReactPixel.init("812485162458693");
}

function sendPageView(path: string): void {
	ReactGA.set({ page: path });
	ReactGA.pageview(path);

	ReactPixel.pageView();
}

export function usePageView(): void {
	const location = useLocation();

	React.useEffect(() => {
		const currentPath = location.pathname + location.search;
		sendPageView(currentPath);
	}, [location.pathname, location.search]);
}
