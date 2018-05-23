import SimpleSchema from "simpl-schema";
import i18n from "meteor/universe:i18n";

const errorMessages = {
	required: i18n.__("SimpleSchema.errors.required"),
	minString: i18n.__("SimpleSchema.errors.minString"),
	maxString: i18n.__("SimpleSchema.errors.maxString"),
	minNumber: i18n.__("SimpleSchema.errors.minNumber"),
	maxNumber: i18n.__("SimpleSchema.errors.maxNumber"),
	minNumberExclusive: i18n.__("SimpleSchema.errors.minNumberExclusive"),
	maxNumberExclusive: i18n.__("SimpleSchema.errors.maxNumberExclusive"),
	minDate: i18n.__("SimpleSchema.errors.minDate"),
	maxDate: i18n.__("SimpleSchema.errors.maxDate"),
	badDate: i18n.__("SimpleSchema.errors.badDate"),
	minCount: i18n.__("SimpleSchema.errors.minCount"),
	maxCount: i18n.__("SimpleSchema.errors.maxCount"),
	noDecimal: i18n.__("SimpleSchema.errors.noDecimal"),
	notAllowed: i18n.__("SimpleSchema.errors.notAllowed"),
	expectedString: i18n.__("SimpleSchema.errors.expectedString"),
	expectedNumber: i18n.__("SimpleSchema.errors.expectedNumber"),
	expectedBoolean: i18n.__("SimpleSchema.errors.expectedBoolean"),
	expectedArray: i18n.__("SimpleSchema.errors.expectedArray"),
	expectedObject: i18n.__("SimpleSchema.errors.expectedObject"),
	expectedConstructor: i18n.__("SimpleSchema.errors.expectedConstructor"),
	"RegEx.msg": i18n.__("SimpleSchema.errors.RegEx.msg"),
	"RegEx.Email": i18n.__("SimpleSchema.errors.RegEx.Email"),
	"RegEx.WeakEmail": i18n.__("SimpleSchema.errors.RegEx.WeakEmail"),
	"RegEx.Domain": i18n.__("SimpleSchema.errors.RegEx.Domain"),
	"RegEx.WeakDomain": i18n.__("SimpleSchema.errors.RegEx.WeakDomain"),
	"RegEx.IP": i18n.__("SimpleSchema.errors.RegEx.IP"),
	"RegEx.IPv4": i18n.__("SimpleSchema.errors.RegEx.IPv4"),
	"RegEx.IPv6": i18n.__("SimpleSchema.errors.RegEx.IPv6"),
	"RegEx.Url": i18n.__("SimpleSchema.errors.RegEx.Url"),
	"RegEx.Id": i18n.__("SimpleSchema.errors.RegEx.Id"),
	keyNotInSchema: i18n.__("SimpleSchema.errors.keyNotInSchema"),
};

const registerSchemaMessages = () => {
	SimpleSchema.setDefaultMessages({
		messages: {
			en: errorMessages,
			es: errorMessages,
		},
	});
};

i18n.onChangeLocale(registerSchemaMessages);
registerSchemaMessages();
