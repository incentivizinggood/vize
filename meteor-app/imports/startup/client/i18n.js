import find from "lodash.find";
import merge from "lodash.merge";
import { i18n } from "meteor/universe:i18n";
import { ReactiveVar } from "meteor/reactive-var";
import { Template } from "meteor/templating";
import SimpleSchema from "simpl-schema";

import { CompanySchema } from "/imports/api/data/companies.js";
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

// Regex error messages are special.
// They need a function to resolve the human readable text.
function createRegExErrorMessages(locale) {
	const regExpMessages = Object.keys(SimpleSchema.RegEx).map(key => ({
		exp: SimpleSchema.RegEx[key],
		msg: i18n.getTranslation(
			`SimpleSchema.messages.defaults.regExMsgStubs.${key}`,
			{
				_locale: locale,
			}
		),
	}));
	return {
		regEx({ label, regExp }) {
			// See if there's one where exp matches this expression
			let msgObj;
			if (regExp) {
				msgObj = find(
					regExpMessages,
					o => o.exp && o.exp.toString() === regExp
				);
			}

			const regExpMessage = msgObj
				? msgObj.msg
				: i18n.getTranslation(
						"SimpleSchema.messages.defaults.regExMsgStubs.msg",
						{
							_locale: locale,
						}
				  );

			return `${label} ${regExpMessage}`;
		},
	};
}

function setUpI18nOnSchema(schema, schemaName) {
	// Define a callback function.
	function thisSchemaSetLocale(locale) {
		// universe:i18n is designed to use incremental loading.
		// We need to add the messages of this locale in case it is a new one.
		schema.messageBox.messages({
			[locale]: merge(
				i18n.getTranslations("SimpleSchema.messages.defaults", locale),
				createRegExErrorMessages(locale),
				i18n.getTranslations(
					`SimpleSchema.messages.${schemaName}`,
					locale
				)
			),
		});
		schema.messageBox.setLanguage(locale);
		schema.labels(
			i18n.getTranslations(`SimpleSchema.labels.${schemaName}`, locale)
		);

		/*
			WARNING

			What follows is a load of nonsense, made necessary
			only because meteor/universe:i18n has an INANE way
			of parsing translation files that makes it darn near
			impossible to add i18n for 1) array items and
			2) anything with any sort of field nesting. Why does
			this come up? Because the new location implementations
			fall into one or the other of those cases depending on
			the schema. So now I have to do this hackishly.

			Thanks, Meteor.
		*/

		if (schemaName === "Companies" || schemaName === "JobAds") {
			schema.labels({
				"locations.$": i18n.__(
					"SimpleSchema.labels.LocationSubFields.locationArrayItem"
				),
				"locations.$.city": i18n.__(
					"SimpleSchema.labels.LocationSubFields.locationArrayItemCity"
				),
				"locations.$.address": i18n.__(
					"SimpleSchema.labels.LocationSubFields.locationArrayItemAddress"
				),
				"locations.$.industrialHub": i18n.__(
					"SimpleSchema.labels.LocationSubFields.locationArrayItemIndustrialHub"
				),
			});
		} else if (schemaName === "Reviews" || schemaName === "Salaries") {
			schema.labels({
				"location.city": i18n.__(
					"SimpleSchema.labels.LocationSubFields.locationCity"
				),
				"location.address": i18n.__(
					"SimpleSchema.labels.LocationSubFields.locationAddress"
				),
				"location.industrialHub": i18n.__(
					"SimpleSchema.labels.LocationSubFields.locationIndustrialHub"
				),
			});
		}
	}
	thisSchemaSetLocale(getDefaultLocale());
	i18n.onChangeLocale(thisSchemaSetLocale);
}

setUpI18nOnSchema(CompanySchema, "Companies");
setUpI18nOnSchema(JobAds.schema, "JobAds");
setUpI18nOnSchema(JobAds.applicationSchema, "JobApplications");
setUpI18nOnSchema(Reviews.schema, "Reviews");
setUpI18nOnSchema(Salaries.schema, "Salaries");
setUpI18nOnSchema(Votes.schema, "Votes");

// This is used on input forms whenever I couldn't
// figure out an easier way to do things. I thin it was
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
