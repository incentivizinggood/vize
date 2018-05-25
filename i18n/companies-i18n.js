import { Companies } from "../imports/api/data/companies.js";
import i18n from "meteor/universe:i18n";

const companyLabels = function() {
	return {
		_id: i18n.__("SimpleSchema.labels.Companies._id", {
			_locale: i18n.getLocale(),
		}),
		vizeProfileUrl: i18n.__(
			"SimpleSchema.labels.Companies.vizeProfileUrl",
			{ _locale: i18n.getLocale() }
		),
		vizeReviewUrl: i18n.__("SimpleSchema.labels.Companies.vizeReviewUrl", {
			_locale: i18n.getLocale(),
		}),
		vizeSalaryUrl: i18n.__("SimpleSchema.labels.Companies.vizeSalaryUrl", {
			_locale: i18n.getLocale(),
		}),
		vizePostJobUrl: i18n.__(
			"SimpleSchema.labels.Companies.vizePostJobUrl",
			{ _locale: i18n.getLocale() }
		),
		name: i18n.__("SimpleSchema.labels.Companies.name", {
			_locale: i18n.getLocale(),
		}),
		contactEmail: i18n.__("SimpleSchema.labels.Companies.contactEmail", {
			_locale: i18n.getLocale(),
		}),
		dateEstablished: i18n.__(
			"SimpleSchema.labels.Companies.dateEstablished",
			{ _locale: i18n.getLocale() }
		),
		numEmployees: i18n.__("SimpleSchema.labels.Companies.numEmployees", {
			_locale: i18n.getLocale(),
		}),
		industry: i18n.__("SimpleSchema.labels.Companies.industry", {
			_locale: i18n.getLocale(),
		}),
		locations: i18n.__("SimpleSchema.labels.Companies.locations", {
			_locale: i18n.getLocale(),
		}),
		otherContactInfo: i18n.__(
			"SimpleSchema.labels.Companies.otherContactInfo",
			{ _locale: i18n.getLocale() }
		),
		websiteURL: i18n.__("SimpleSchema.labels.Companies.websiteURL", {
			_locale: i18n.getLocale(),
		}),
		descriptionOfCompany: i18n.__(
			"SimpleSchema.labels.Companies.descriptionOfCompany",
			{ _locale: i18n.getLocale() }
		),
		dateJoined: i18n.__("SimpleSchema.labels.Companies.dateJoined", {
			_locale: i18n.getLocale(),
		}),
		numFlags: i18n.__("SimpleSchema.labels.Companies.numFlags", {
			_locale: i18n.getLocale(),
		}),
		healthAndSafety: i18n.__(
			"SimpleSchema.labels.Companies.healthAndSafety",
			{ _locale: i18n.getLocale() }
		),
		managerRelationship: i18n.__(
			"SimpleSchema.labels.Companies.managerRelationship",
			{ _locale: i18n.getLocale() }
		),
		workEnvironment: i18n.__(
			"SimpleSchema.labels.Companies.workEnvironment",
			{ _locale: i18n.getLocale() }
		),
		benefits: i18n.__("SimpleSchema.labels.Companies.benefits", {
			_locale: i18n.getLocale(),
		}),
		overallSatisfaction: i18n.__(
			"SimpleSchema.labels.Companies.overallSatisfaction",
			{ _locale: i18n.getLocale() }
		),
		numReviews: i18n.__("SimpleSchema.labels.Companies.numReviews", {
			_locale: i18n.getLocale(),
		}),
		percentRecommended: i18n.__(
			"SimpleSchema.labels.Companies.percentRecommended",
			{ _locale: i18n.getLocale() }
		),
		avgNumMonthsWorked: i18n.__(
			"SimpleSchema.labels.Companies.avgNumMonthsWorked",
			{ _locale: i18n.getLocale() }
		),
	};
};

const companyErrorMessages = function(locale) {
	return {
		nameTaken: i18n.__("SimpleSchema.custom.Companies.nameTaken", {
			_locale: locale,
		}),
	};
};

const englishCompanies = companyErrorMessages("en");
const spanishCompanies = companyErrorMessages("es");

//if (Meteor.isDevelopment) {
console.log(Meteor.isServer ? "SERVER env" : "CLIENT env");
console.log(process.env.UNIVERSE_I18N_LOCALES);
console.log("english company error messages");
console.log(englishCompanies);
console.log("spanish company error messages");
console.log(spanishCompanies);
//}

Companies.schema.labels(companyLabels());

// Define custom error messages for custom validation functions
Companies.schema.messageBox.messages({
	en: englishCompanies,
	es: spanishCompanies,
});

i18n.onChangeLocale(function(newLocale) {
	// if (Meteor.isDevelopment) console.log("COMPANIES: " + newLocale);
	console.log("COMPANIES: " + newLocale);
	Companies.schema.messageBox.setLanguage(newLocale);
	Companies.schema.labels(companyLabels());
});
