import { i18n } from "meteor/universe:i18n";

function getLang() {
	return (
		(navigator.languages && navigator.languages[0]) ||
		navigator.language ||
		navigator.browserLanguage ||
		navigator.userLanguage ||
		"en-US"
	);
}

i18n.setLocale("en");
