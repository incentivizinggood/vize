import { i18n } from "meteor/universe:i18n";
import { ReactiveVar } from "meteor/reactive-var";

function lmd(code, name, icon) {
	return { code, name, icon };
}

const localeMetadata = [
	lmd("en-US", "English", "images/us.jpg"),
	lmd("es", "Español", "images/mx.jpg"),
];

function getClosestSupportedLocale(code) {
	const supportedLocales = localeMetadata.map(e => e.code);

	if (supportedLocales.indexOf(code) !== -1) {
		return code;
	}

	// Try to find a locale without the regional variant.
	const fallbackCode = code.split("-")[0];
	if (supportedLocales.indexOf(fallbackCode) !== -1) {
		return fallbackCode;
	}

	// English is the closest we have to a universal language.
	return "en-US";
}

function getDefaultLocale() {
	return getClosestSupportedLocale(
		(navigator.languages && navigator.languages[0]) ||
			navigator.language ||
			navigator.browserLanguage ||
			navigator.userLanguage ||
			"en-US"
	);
}

const currentLocale = new ReactiveVar(localeMetadata[0]);

function localeChanged(code) {
	const csl = getClosestSupportedLocale(code);
	if (csl !== code) {
		console.error(
			`The locale was set to ${code} but that is not supported. The closest supported locale is ${csl}.`
		);
	}
	currentLocale.set(localeMetadata.find(e => e.code === csl));
}

i18n.onChangeLocale(localeChanged);
i18n.setLocale(getDefaultLocale());

export {
	localeMetadata,
	currentLocale,
	getDefaultLocale,
	getClosestSupportedLocale,
};
