import { i18n } from "meteor/universe:i18n";

function lmd(code, name, icon) {
	return { code, name, icon };
}

const localeMetadata = [
	lmd("en", "English", "images/us.jpg"),
	lmd("es", "Español", "images/mx.jpg"),
];

function getDefaultLocale() {
	return (
		(navigator.languages && navigator.languages[0]) ||
		navigator.language ||
		navigator.browserLanguage ||
		navigator.userLanguage ||
		"en-US"
	);
}

function getClosestSupportedLocale(code) {
	const supportedLocales = i18n.getLanguages();

	if (supportedLocales.indexOf(code) !== -1) {
		return code;
	}

	// Try to find a locale without the regional variant.
	const fallbackCode = code.split("-")[0];
	if (supportedLocales.indexOf(fallbackCode) !== -1) {
		return fallbackCode;
	}

	// English is the closest we have to a universal language.
	return "en";
}

function getLocaleMetadata(code) {
	return localeMetadata.find(e => e.code === code);
}

i18n.setLocale("en");

export {
	localeMetadata,
	getDefaultLocale,
	getClosestSupportedLocale,
	getLocaleMetadata,
};
