import SimpleSchema from "simpl-schema";
import i18n from "meteor/universe:i18n";
import find from "lodash.find";

const regExpMessages = function(locale) {
	return [
		{
			exp: SimpleSchema.RegEx.Email,
			msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.Email", {
				_locale: locale,
			}),
		},
		{
			exp: SimpleSchema.RegEx.EmailWithTLD,
			msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.EmailWithTLD", {
				_locale: locale,
			}),
		},
		{
			exp: SimpleSchema.RegEx.Domain,
			msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.Domain", {
				_locale: locale,
			}),
		},
		{
			exp: SimpleSchema.RegEx.WeakDomain,
			msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.WeakDomain", {
				_locale: locale,
			}),
		},
		{
			exp: SimpleSchema.RegEx.IP,
			msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.IP", {
				_locale: locale,
			}),
		},
		{
			exp: SimpleSchema.RegEx.IPv4,
			msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.IPv4", {
				_locale: locale,
			}),
		},
		{
			exp: SimpleSchema.RegEx.IPv6,
			msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.IPv6", {
				_locale: locale,
			}),
		},
		{
			exp: SimpleSchema.RegEx.Url,
			msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.Url", {
				_locale: locale,
			}),
		},
		{
			exp: SimpleSchema.RegEx.Id,
			msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.Id", {
				_locale: locale,
			}),
		},
		{
			exp: SimpleSchema.RegEx.ZipCode,
			msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.ZipCode", {
				_locale: locale,
			}),
		},
		{
			exp: SimpleSchema.RegEx.Phone,
			msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.Phone", {
				_locale: locale,
			}),
		},
	];
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
