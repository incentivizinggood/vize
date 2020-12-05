import React from "react";

import PageWrapper from "src/components/page-wrapper";
import Banner, { BannerTitle } from "src/components/banner";
import { LinkButton } from "src/components/button";
import { makeTranslationHook } from "src/translations/translations";

const useTranslations = makeTranslationHook({
	en: {
		title: "404 - Page not found",
		goHome: "Go to home page",
	},
	es: {
		title: "404 - Página no encontrada",
		goHome: "Ir a la página de inicio",
	},
});

/** The 404 page. */
export default function NotFoundPage(): JSX.Element {
	const t = useTranslations();

	return (
		<PageWrapper title={t.title}>
			<Banner>
				<BannerTitle>{t.title}</BannerTitle>
				<LinkButton to="/" $primary>
					{t.goHome}
				</LinkButton>
			</Banner>
		</PageWrapper>
	);
}
