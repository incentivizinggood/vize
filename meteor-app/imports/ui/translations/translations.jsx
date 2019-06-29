import React from "react";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import { getAtPath, joinPaths } from "/imports/lib/property-path.ts";

/**
 * A component that renders different thing for each locale.
 * @param translations A record with one element for each locale that we support.
 * @param restProps    If the translations are functions, they will be called with the other props.
 */
const I18nSwitch = withUpdateOnChangeLocale(
	({ translations, messageKey, renderer, args }) => {
		const locale = i18n.getLocale();

		const translation = getAtPath(translations[locale], messageKey);

		const message =
			typeof translation === "function" ? translation(args) : translation;

		return renderer !== undefined ? renderer(message) : message;
	}
);

function minka(translations, defaultTranslation, messageKey) {
	console.log("minka", translations, defaultTranslation, messageKey);

	function kalbo({ renderer, ...args }) {
		return (
			<I18nSwitch
				renderer={renderer}
				args={args}
				translations={translations}
				messageKey={messageKey}
			/>
		);
	}

	// If the message is an object but not a React element (i.e. a group of
	// other messages), we recursivly make translation compoents for all of its
	// enteries.
	const message = getAtPath(defaultTranslation, messageKey);
	if (
		message != null &&
		typeof message === "object" &&
		!React.isValidElement(message)
	) {
		Object.keys(message).forEach(k => {
			kalbo[k] = minka(
				translations,
				defaultTranslation,
				joinPaths(messageKey, k)
			);
		});
	}

	return kalbo;
}

function makeTranslationComponents(translations) {
	const defaultTranslation = Object.values(translations)[0];

	return minka(translations, defaultTranslation, "");
}

export default makeTranslationComponents;
