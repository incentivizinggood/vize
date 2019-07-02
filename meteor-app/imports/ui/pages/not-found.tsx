import React from "react";

import PageWrapper from "imports/ui/components/page-wrapper";

/* The "404" page.
 */
export default function NotFoundPage() {
	return (
		<PageWrapper title="Not Found">
			<h1>404</h1>
			<h2>That page could not be found.</h2>
		</PageWrapper>
	);
}
