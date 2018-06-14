import SimpleSchema from "simpl-schema";
import i18n from "meteor/universe:i18n";
import find from "lodash.find";
import merge from "lodash.merge";

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
