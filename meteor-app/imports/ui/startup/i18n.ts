import { i18n } from "meteor/universe:i18n";
import { ReactiveVar } from "meteor/reactive-var";

i18n.setOptions({
	defaultLocale: "es",
});

const localeMetadata = {
	en: { nativeName: "English", icon: "/images/flags/us.jpg" },
	es: { nativeName: "Español", icon: "/images/flags/mx.jpg" },
};

/* This is ment to match the fallbacks used by universe:i18n
 */
function getClosestSupportedLocale(code) {
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
	localeCanidate = i18n.options.defaultLocale;
	if (supportedLocales.indexOf(localeCanidate) !== -1) {
		return localeCanidate;
	}

	// Use the default locale without the regional variant.
	localeCanidate = i18n.options.defaultLocale.replace(/-.+$/, "");
	return localeCanidate;
}

function getDefaultLocale() {
	return getClosestSupportedLocale(
		(navigator.languages && navigator.languages[0]) ||
			navigator.language ||
			navigator.browserLanguage ||
			navigator.userLanguage ||
			"es"
	);
}

const currentLocale = new ReactiveVar(getDefaultLocale());

function localeChanged(code) {
	const csl = getClosestSupportedLocale(code);
	if (csl !== code) {
		console.error(
			`The locale was set to ${code} but that is not supported. The closest supported locale is ${csl}.`
		);
	}
	currentLocale.set(csl);
}

i18n.onChangeLocale(localeChanged);
i18n.setLocale(getDefaultLocale());

function reactiveGetLocale() {
	return currentLocale.get();
}

// This is used on input forms whenever I couldn't
// figure out an easier way to do things. I think it was
// either/both field labels and selector drop-downs
// that need this for reactive translation. Look at the
// code in /imports/ui if you want to be sure.
const reactiveCommonTranslator = i18n.createReactiveTranslator("common");

export {
	localeMetadata,
	reactiveGetLocale,
	getDefaultLocale,
	getClosestSupportedLocale,
	reactiveCommonTranslator,
};
