import SimpleSchema from "simpl-schema";
import i18n from "meteor/universe:i18n";
import find from "lodash.find";

const regExpMessages = function(locale) {
	return Object.keys(SimpleSchema.RegEx).map(key => ({
		exp: SimpleSchema.RegEx[key],
		msg: i18n.__(`SimpleSchema.defaults.regExMsgStubs.${key}`, {
			_locale: locale,
		}),
	}));
};

const errorMessages = function(locale) {
	const errors = {
		required: i18n.__("SimpleSchema.defaults.required", {
			_locale: locale,
		}),
		minString: i18n.__("SimpleSchema.defaults.minString", {
			_locale: locale,
		}),
		maxString: i18n.__("SimpleSchema.defaults.maxString", {
			_locale: locale,
		}),
		minNumber: i18n.__("SimpleSchema.defaults.minNumber", {
			_locale: locale,
		}),
		maxNumber: i18n.__("SimpleSchema.defaults.maxNumber", {
			_locale: locale,
		}),
		minNumberExclusive: i18n.__(
			"SimpleSchema.defaults.minNumberExclusive",
			{ _locale: locale }
		),
		maxNumberExclusive: i18n.__(
			"SimpleSchema.defaults.maxNumberExclusive",
			{ _locale: locale }
		),
		minDate: i18n.__("SimpleSchema.defaults.minDate", { _locale: locale }),
		maxDate: i18n.__("SimpleSchema.defaults.maxDate", { _locale: locale }),
		badDate: i18n.__("SimpleSchema.defaults.badDate", { _locale: locale }),
		minCount: i18n.__("SimpleSchema.defaults.minCount", {
			_locale: locale,
		}),
		maxCount: i18n.__("SimpleSchema.defaults.maxCount", {
			_locale: locale,
		}),
		noDecimal: i18n.__("SimpleSchema.defaults.noDecimal", {
			_locale: locale,
		}),
		notAllowed: i18n.__("SimpleSchema.defaults.notAllowed", {
			_locale: locale,
		}),
		expectedType: i18n.__("SimpleSchema.defaults.expectedType", {
			_locale: locale,
		}),
		regEx({ label, regExp }) {
			// See if there's one where exp matches this expression
			let msgObj;
			let rem = regExpMessages(locale);
			if (regExp) {
				msgObj = find(rem, o => o.exp && o.exp.toString() === regExp);
			}

			const regExpMessage = msgObj
				? msgObj.msg
				: i18n.__("SimpleSchema.defaults.regExMsgStubs.msg", {
						_locale: locale,
				  });

			return `${label} ${regExpMessage}`;
		},

		keyNotInSchema: i18n.__("SimpleSchema.defaults.keyNotInSchema", {
			_locale: locale,
		}),
	};
	return errors;
};

const englishDefaults = errorMessages("en");
const spanishDefaults = errorMessages("es");

if (Meteor.isClient && Meteor.isDevelopment) {
	console.log(Meteor.isServer ? "SERVER env" : "CLIENT env");
	console.log(process.env.UNIVERSE_I18N_LOCALES);
	console.log("englishDefaults");
	console.log(englishDefaults);
	console.log("spanishDefaults");
	console.log(spanishDefaults);
}

SimpleSchema.setDefaultMessages({
	messages: {
		en: englishDefaults,
		es: spanishDefaults,
	},
});
