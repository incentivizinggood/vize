import React from "react";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

/**
 * A component that renders different thing for each locale.
 * @param translations A record with one element for each locale that we support.
 * @param restProps    If the translations are functions, they will be called with the other props.
 */
const I18nSwitch = withUpdateOnChangeLocale(
	({ translations, ...restProps }) => {
		const locale = i18n.getLocale();

		const translation = translations[locale];

		if (typeof translation === "function") {
			return translation(restProps);
		}

		return translation;
	}
);

function i18nSwitch(translations) {
	return props => <I18nSwitch translations={translations} {...props} />;
}

export { I18nSwitch, i18nSwitch };
