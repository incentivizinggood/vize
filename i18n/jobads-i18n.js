import { JobAds } from "../imports/api/data/jobads.js";
import i18n from "meteor/universe:i18n";

const jobAdLabels = function() {
	return {
		_id: i18n.__("SimpleSchema.labels.JobAds._id", {
			_locale: i18n.getLocale(),
		}),
		companyName: i18n.__("SimpleSchema.labels.JobAds.companyName", {
			_locale: i18n.getLocale(),
		}),
		companyId: i18n.__("SimpleSchema.labels.JobAds.companyId", {
			_locale: i18n.getLocale(),
		}),
		vizeApplyForJobUrl: i18n.__(
			"SimpleSchema.labels.JobAds.vizeApplyForJobUrl",
			{ _locale: i18n.getLocale() }
		),
		jobTitle: i18n.__("SimpleSchema.labels.JobAds.jobTitle", {
			_locale: i18n.getLocale(),
		}),
		locations: i18n.__("SimpleSchema.labels.JobAds.locations", {
			_locale: i18n.getLocale(),
		}),
		pesosPerHour: i18n.__("SimpleSchema.labels.JobAds.pesosPerHour", {
			_locale: i18n.getLocale(),
		}),
		contractType: i18n.__("SimpleSchema.labels.JobAds.contractType", {
			_locale: i18n.getLocale(),
		}),
		jobDescription: i18n.__("SimpleSchema.labels.JobAds.jobDescription", {
			_locale: i18n.getLocale(),
		}),
		responsibilities: i18n.__(
			"SimpleSchema.labels.JobAds.responsibilities",
			{ _locale: i18n.getLocale() }
		),
		qualifications: i18n.__("SimpleSchema.labels.JobAds.qualifications", {
			_locale: i18n.getLocale(),
		}),
		datePosted: i18n.__("SimpleSchema.labels.JobAds.datePosted", {
			_locale: i18n.getLocale(),
		}),
	};
};

const jobAdErrors = function(locale) {
	return {
		noCompanyWithThatName: i18n.__(
			"SimpleSchema.custom.noCompanyWithThatName",
			{ _locale: locale }
		),
	};
};

const englishJobAds = jobAdErrors("en");
const spanishJobAds = jobAdErrors("es");

//if (Meteor.isDevelopment) {
console.log(Meteor.isServer ? "SERVER env" : "CLIENT env");
console.log(process.env.UNIVERSE_I18N_LOCALES);
console.log("english job ad error messages");
console.log(englishJobAds);
console.log("spanish job ad error messages");
console.log(spanishJobAds);
//}

JobAds.schema.labels(jobAdLabels());

JobAds.schema.messageBox.messages({
	en: englishJobAds,
	es: spanishJobAds,
});

const jobAppLabels = function() {
	return {
		jobId: i18n.__("SimpleSchema.labels.JobApplications.jobId", {
			_locale: i18n.getLocale(),
		}),
		companyName: i18n.__(
			"SimpleSchema.labels.JobApplications.companyName",
			{ _locale: i18n.getLocale() }
		),
		fullName: i18n.__("SimpleSchema.labels.JobApplications.fullName", {
			_locale: i18n.getLocale(),
		}),
		email: i18n.__("SimpleSchema.labels.JobApplications.email", {
			_locale: i18n.getLocale(),
		}),
		phoneNumber: i18n.__(
			"SimpleSchema.labels.JobApplications.phoneNumber",
			{ _locale: i18n.getLocale() }
		),
		coverLetterAndComments: i18n.__(
			"SimpleSchema.labels.JobApplications.coverLetterAndComments",
			{ _locale: i18n.getLocale() }
		),
		dateSent: i18n.__("SimpleSchema.labels.JobApplications.dateSent", {
			_locale: i18n.getLocale(),
		}),
	};
};

const jobAppErrors = function(locale) {
	return {
		invalidJobId: i18n.__(
			"SimpleSchema.custom.JobApplications.invalidJobId",
			{ _locale: locale }
		),
		noCompanyWithThatName: i18n.__(
			"SimpleSchema.custom.noCompanyWithThatName",
			{ _locale: locale }
		),
	};
};

const englishJobApps = jobAppErrors("en");
const spanishJobApps = jobAppErrors("es");

//if (Meteor.isDevelopment) {
console.log(Meteor.isServer ? "SERVER env" : "CLIENT env");
console.log(process.env.UNIVERSE_I18N_LOCALES);
console.log("english job app error messages");
console.log(englishJobApps);
console.log("spanish job app error messages");
console.log(spanishJobApps);
//}

JobAds.applicationSchema.labels(jobAppLabels());

JobAds.applicationSchema.messageBox.messages({
	en: englishJobApps,
	es: spanishJobApps,
});

i18n.onChangeLocale(function(newLocale) {
	// if (Meteor.isDevelopment)
	// 	console.log("JOBADS AND JOBAPPLICATIONS: " + newLocale);
	console.log("JOBADS AND JOBAPPLICATIONS: " + newLocale);
	JobAds.schema.messageBox.setLanguage(newLocale);
	JobAds.applicationSchema.messageBox.setLanguage(newLocale);
	JobAds.schema.labels(jobAdLabels());
	JobAds.applicationSchema.labels(jobAppLabels());
});
