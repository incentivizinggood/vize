import find from "lodash.find";
import merge from "lodash.merge";
import { i18n } from "meteor/universe:i18n";
import { ReactiveVar } from "meteor/reactive-var";
import SimpleSchema from "simpl-schema";

import { Companies } from "/imports/api/data/companies.js";
import { JobAds } from "/imports/api/data/jobads.js";
import { Reviews } from "/imports/api/data/reviews.js";
import { Salaries } from "/imports/api/data/salaries.js";
import { Votes } from "/imports/api/data/votes.js";

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
			"en"
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

function setUpI18nOnSchema(schema, schemaName) {
	const regExpMessages = function(locale) {
		return Object.keys(SimpleSchema.RegEx).map(key => ({
			exp: SimpleSchema.RegEx[key],
			msg: i18n.__(`SimpleSchema.defaults.regExMsgStubs.${key}`, {
				_locale: locale,
			}),
		}));
	};

	const errorMessages = function(locale) {
		return merge(i18n.getTranslations("SimpleSchema.defaults"), {
			regEx({ label, regExp }) {
				// See if there's one where exp matches this expression
				let msgObj;
				if (regExp) {
					msgObj = find(
						regExpMessages(locale),
						o => o.exp && o.exp.toString() === regExp
					);
				}

				const regExpMessage = msgObj
					? msgObj.msg
					: i18n.__("SimpleSchema.defaults.regExMsgStubs.msg", {
							_locale: locale,
					  });

				return `${label} ${regExpMessage}`;
			},
		});
	};

	// Define a callback function.
	function thisSchemaSetLocale(locale) {
		// universe:i18n is designed to use incremental loading.
		// We need to add the messages of this locale in case it is a new one.
		schema.messageBox.messages({
			[locale]: merge(
				errorMessages(locale),
				i18n.getTranslations("SimpleSchema.defaults", locale),
				i18n.getTranslations("SimpleSchema.custom", locale),
				i18n.getTranslations(
					`SimpleSchema.custom.${schemaName}`,
					locale
				)
			),
		});
		schema.messageBox.setLanguage(locale);
		schema.labels(
			i18n.getTranslations(`SimpleSchema.labels.${schemaName}`)
		);
	}
	thisSchemaSetLocale(getDefaultLocale());
	i18n.onChangeLocale(thisSchemaSetLocale);
}

setUpI18nOnSchema(Companies.schema, "Companies");
setUpI18nOnSchema(JobAds.schema, "JobAds");
setUpI18nOnSchema(JobAds.applicationSchema, "JobApplications");
setUpI18nOnSchema(Reviews.schema, "Reviews");
setUpI18nOnSchema(Salaries.schema, "Salaries");
setUpI18nOnSchema(Votes.schema, "Votes");

export {
	localeMetadata,
	reactiveGetLocale,
	getDefaultLocale,
	getClosestSupportedLocale,
};
