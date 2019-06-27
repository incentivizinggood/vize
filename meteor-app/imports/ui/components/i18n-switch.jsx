import React from "react";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

/**
 * A component that renders different thing for each locale.
 * @param translations A record with one element for each locale that we support.
 * @param restProps    If the translations are functions, they will be called with the other props.
 */
const I18nSwitch = withUpdateOnChangeLocale(
	({ translations, messageKey, renderer, args }) => {
		const locale = i18n.getLocale();

		const translation = translations[locale][messageKey];

		const message =
			typeof translation === "function" ? translation(args) : translation;

		return renderer !== undefined ? renderer(message) : message;
	}
);

/*
Make recursive / Support nesting of messages.
Add renderer prop to I18nSwitch.
 */

function makeTranslaties(translations) {
	const keys = Object.keys(Object.values(translations)[0]);

	return keys.reduce(
		(acc, messageKey) => ({
			...acc,
			[messageKey]: ({ renderer, ...args }) => (
				<I18nSwitch
					renderer={renderer}
					args={args}
					translations={translations}
					messageKey={messageKey}
				/>
			),
		}),
		{}
	);
}

export default makeTranslaties;
