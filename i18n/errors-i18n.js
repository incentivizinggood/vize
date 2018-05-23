import SimpleSchema from "simpl-schema";
import i18n from "meteor/universe:i18n";
import find from "lodash.find";

const regExpMessages = [
	{
		exp: SimpleSchema.RegEx.Email,
		msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.Email"),
	},
	{
		exp: SimpleSchema.RegEx.EmailWithTLD,
		msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.EmailWithTLD"),
	},
	{
		exp: SimpleSchema.RegEx.Domain,
		msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.Domain"),
	},
	{
		exp: SimpleSchema.RegEx.WeakDomain,
		msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.WeakDomain"),
	},
	{
		exp: SimpleSchema.RegEx.IP,
		msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.IP"),
	},
	{
		exp: SimpleSchema.RegEx.IPv4,
		msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.IPv4"),
	},
	{
		exp: SimpleSchema.RegEx.IPv6,
		msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.IPv6"),
	},
	{
		exp: SimpleSchema.RegEx.Url,
		msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.Url"),
	},
	{
		exp: SimpleSchema.RegEx.Id,
		msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.Id"),
	},
	{
		exp: SimpleSchema.RegEx.ZipCode,
		msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.ZipCode"),
	},
	{
		exp: SimpleSchema.RegEx.Phone,
		msg: i18n.__("SimpleSchema.defaults.regExMsgStubs.Phone"),
	},
];

const errorMessages = {
	required: i18n.__("SimpleSchema.defaults.required"),
	minString: i18n.__("SimpleSchema.defaults.minString"),
	maxString: i18n.__("SimpleSchema.defaults.maxString"),
	minNumber: i18n.__("SimpleSchema.defaults.minNumber"),
	maxNumber: i18n.__("SimpleSchema.defaults.maxNumber"),
	minNumberExclusive: i18n.__("SimpleSchema.defaults.minNumberExclusive"),
	maxNumberExclusive: i18n.__("SimpleSchema.defaults.maxNumberExclusive"),
	minDate: i18n.__("SimpleSchema.defaults.minDate"),
	maxDate: i18n.__("SimpleSchema.defaults.maxDate"),
	badDate: i18n.__("SimpleSchema.defaults.badDate"),
	minCount: i18n.__("SimpleSchema.defaults.minCount"),
	maxCount: i18n.__("SimpleSchema.defaults.maxCount"),
	noDecimal: i18n.__("SimpleSchema.defaults.noDecimal"),
	notAllowed: i18n.__("SimpleSchema.defaults.notAllowed"),
	expectedType: i18n.__("SimpleSchema.defaults.expectedType"),
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
			: "failed regular expression validation";

		return `${label} ${regExpMessage}`;
	},

	keyNotInSchema: i18n.__("SimpleSchema.defaults.keyNotInSchema"),
};

SimpleSchema.setDefaultMessages({
	messages: {
		en: errorMessages,
		es: errorMessages,
	},
});

/*
	This function needs to set the message box
	language to the current locale. It should then
	be invoked every time the locale changes
	to automatically keep the message box language
	up to date.
*/
// const setMessageBoxLanguage = () => {

// };
//
// i18n.onChangeLocale(setMessageBoxLanguage);
// setMessageBoxLanguage();
