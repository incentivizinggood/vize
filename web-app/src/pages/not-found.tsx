import React from "react";

import PageWrapper from "src/components/page-wrapper";
import Banner, { BannerTitle } from "src/components/banner";
import { LinkButton } from "src/components/button";

/** The 404 page. */
export default function NotFoundPage(): JSX.Element {
	return (
		<PageWrapper title="Not Found">
			<Banner>
				<BannerTitle>404 - Page not found.</BannerTitle>
				<LinkButton to="/" $primary>
					Go to home page
				</LinkButton>
			</Banner>
		</PageWrapper>
	);
}
