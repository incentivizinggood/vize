import React from "react";
import * as lodash from "lodash";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

function getPath(object, path) {
	if (path === "") return object;
	return path.split(".").reduce((a, c) => a[c], object);
}

function joinPaths(a, b) {
	if (a === "") return b;
	if (b === "") return a;
	return `${a}.${b}`;
}

/**
 * A component that renders different thing for each locale.
 * @param translations A record with one element for each locale that we support.
 * @param restProps    If the translations are functions, they will be called with the other props.
 */
const I18nSwitch = withUpdateOnChangeLocale(
	({ translations, messageKey, renderer, args }) => {
		const locale = i18n.getLocale();

		const translation = getPath(translations[locale], messageKey);

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

	if (lodash.isObjectLike(getPath(defaultTranslation, messageKey))) {
		const keys = Object.keys(getPath(defaultTranslation, messageKey));
		keys.forEach(k => {
			kalbo[k] = minka(
				translations,
				defaultTranslation,
				joinPaths(messageKey, k)
			);
		});
	}

	return kalbo;
}

function makeTranslaties(translations) {
	const defaultTranslation = Object.values(translations)[0];

	return minka(translations, defaultTranslation, "");
}

export default makeTranslaties;
