import React from "react";
import ReactGA from "react-ga";
import ReactPixel from "react-facebook-pixel";
import { useLocation } from "react-router-dom";

/**
 * Don't run analytics if testing.
 * If testing analytics, set this to true manually.
 */
export const analyticsEnabled = document.location.hostname === "www.vize.mx";

if (analyticsEnabled) {
	ReactGA.initialize("UA-119033355-1");
	ReactPixel.init("812485162458693");
}

function sendPageView(path: string): void {
	if (!analyticsEnabled) return;

	ReactGA.set({ page: path });
	ReactGA.pageview(path);

	ReactPixel.pageView();
}

export function sendEvent(args: ReactGA.EventArgs): void {
	if (!analyticsEnabled) return;

	const { action, ...data } = args;

	ReactGA.event(args);
	ReactPixel.track(action, data);
}

export function usePageView(): void {
	// Normally guard clauses in hooks would cause bugs, but because
	// analyticsEnabled is a global constant this should be fine.
	if (!analyticsEnabled) return;

	const location = useLocation();

	React.useEffect(() => {
		const currentPath = location.pathname + location.search;
		sendPageView(currentPath);
	}, [location.pathname, location.search]);
}
