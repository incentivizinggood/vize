import React from "react";

/* The "404" page.
 */
export default function NotFoundPage() {
	document.title = "Not Found";

	return (
		<div className="page not-found">
			<h1>404</h1>
			<h2>That page could not be found.</h2>
		</div>
	);
}
