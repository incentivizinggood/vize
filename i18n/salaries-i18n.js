import { Salaries } from "../imports/api/data/salaries.js";
import i18n from "meteor/universe:i18n";

const salaryLabels = function() {
	return {
		_id: i18n.__("SimpleSchema.labels.Salaries._id"),
		submittedBy: i18n.__("SimpleSchema.labels.Salaries.submittedBy", {
			_locale: i18n.getLocale(),
		}),
		companyName: i18n.__("SimpleSchema.labels.Salaries.companyName", {
			_locale: i18n.getLocale(),
		}),
		companyId: i18n.__("SimpleSchema.labels.Salaries.companyId", {
			_locale: i18n.getLocale(),
		}),
		jobTitle: i18n.__("SimpleSchema.labels.Salaries.jobTitle", {
			_locale: i18n.getLocale(),
		}),
		incomeType: i18n.__("SimpleSchema.labels.Salaries.incomeType", {
			_locale: i18n.getLocale(),
		}),
		incomeAmount: i18n.__("SimpleSchema.labels.Salaries.incomeAmount", {
			_locale: i18n.getLocale(),
		}),
		gender: i18n.__("SimpleSchema.labels.Salaries.gender", {
			_locale: i18n.getLocale(),
		}),
		datePosted: i18n.__("SimpleSchema.labels.Salaries.datePosted", {
			_locale: i18n.getLocale(),
		}),
	};
};

const salaryErrors = function(locale) {
	return {
		noCompanyWithThatName: i18n.__("common.forms.companyNotFound", {
			_locale: locale,
		}),
		sessionError: i18n.__("SimpleSchema.custom.sessionError", {
			_locale: locale,
		}),
	};
};

const englishSalaries = salaryErrors("en");
const spanishSalaries = salaryErrors("es");

//if (Meteor.isDevelopment) {
console.log(Meteor.isServer ? "SERVER env" : "CLIENT env");
console.log(process.env);
console.log("english salary error messages");
console.log(englishSalaries);
console.log("spanish salary error messages");
console.log(spanishSalaries);
//}

Salaries.schema.labels(salaryLabels());

Salaries.schema.messageBox.messages({
	en: englishSalaries,
	es: spanishSalaries,
});

i18n.onChangeLocale(function(newLocale) {
	// if (Meteor.isDevelopment) console.log("SALARIES: " + newLocale);
	console.log("SALARIES: " + newLocale);
	Salaries.schema.messageBox.setLanguage(newLocale);
	Salaries.schema.labels(salaryLabels());
});
