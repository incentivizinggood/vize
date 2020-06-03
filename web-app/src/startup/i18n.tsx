import React from "react";

import usFlagIcon from "src/images/flags/us.jpg";
import mxFlagIcon from "src/images/flags/mx.jpg";

const localeMetadata = {
	en: { nativeName: "English", icon: usFlagIcon },
	es: { nativeName: "Español", icon: mxFlagIcon },
};

const defaultLocale: string = "es";

/* This is meant to match the fallbacks used by universe:i18n
 */
function getClosestSupportedLocale(code: string) {
	const supportedLocales = Object.keys(localeMetadata);
	let localeCanidate = code;

	// Try to use the given locale.
	if (supportedLocales.indexOf(localeCanidate) !== -1) {
		return localeCanidate;
	}

	// Try to find a locale without the regional variant.
	localeCanidate = code.replace(/-.+$/, "");
	if (supportedLocales.indexOf(localeCanidate) !== -1) {
		return localeCanidate;
	}

	// Try to use the default locale.
	localeCanidate = defaultLocale;
	if (supportedLocales.indexOf(localeCanidate) !== -1) {
		return localeCanidate;
	}

	// Use the default locale without the regional variant.
	localeCanidate = defaultLocale.replace(/-.+$/, "");
	return localeCanidate;
}

function getDefaultLocale() {
	return getClosestSupportedLocale(
		(navigator.languages && navigator.languages[0]) ||
			navigator.language ||
			"es"
	);
}

const LocaleContext = React.createContext<string>(getDefaultLocale());
const LocaleSetterContext = React.createContext<(locale: string) => void>(
	() => {}
);

const LocaleProvider: React.FunctionComponent = ({ children }) => {
	const [locale, setLocale] = React.useState(getDefaultLocale());
	return (
		<LocaleSetterContext.Provider value={setLocale}>
			<LocaleContext.Provider value={locale}>
				{children}
			</LocaleContext.Provider>
		</LocaleSetterContext.Provider>
	);
};

export {
	LocaleProvider,
	LocaleContext,
	LocaleSetterContext,
	localeMetadata,
	getDefaultLocale,
	getClosestSupportedLocale,
};
