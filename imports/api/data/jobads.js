import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";
import { Companies } from "./companies.js";
import i18n from "meteor/universe:i18n";

SimpleSchema.extendOptions(["autoform"]); // gives us the "autoform" schema option

export const JobAds = new Mongo.Collection("JobAds", {
	idGeneration: "STRING",
});

JobAds.schema = new SimpleSchema(
	{
		_id: {
			type: String,
			optional: true,
			denyUpdate: true,
			autoValue: new Meteor.Collection.ObjectID(), // forces a correct value
			autoform: {
				omit: true,
			},
		},
		companyName: {
			// Filled in by user, or auto-filled by form, but in any
			type: String, // case, company names are indexed so we may as well use
			optional: false, // use this instead of companyID
			max: 100,
			index: true,
			custom() {
				if (Meteor.isClient && this.isSet) {
					Meteor.call(
						"companies.doesCompanyExist",
						this.value,
						(error, result) => {
							if (!result) {
								this.validationContext.addValidationErrors([
									{
										name: "companyName",
										type: "noCompanyWithThatName",
									},
								]);
							}
						}
					);
				} else if (Meteor.isServer && this.isSet) {
					if (Companies.findOne({ name: this.value }) === undefined) {
						return "noCompanyWithThatName";
					}
				}
			},
		},
		companyId: {
			type: String,
			optional: true,
			denyUpdate: true,
			index: true,
			autoValue() {
				if (Meteor.isServer && this.field("companyName").isSet) {
					const company = Companies.findOne({
						name: this.field("companyName").value,
					});
					if (company !== undefined) {
						return company._id;
					}
					// This should never happen, because
					// companies not in the database cannot
					// post jobs: that error is caught in
					// another custom validator
					return undefined;
				}
			},
			autoform: {
				omit: true,
			},
		},
		vizeApplyForJobUrl: {
			type: String,
			optional: true,
			denyUpdate: true,
			autoValue() {
				if (this.field("_id").isSet) {
					return Meteor.absoluteUrl(
						`apply-for-job/?id=${this.field("_id").value}`,
						{ secure: true }
					);
				}
			},
			autoform: {
				omit: true,
			},
		},
		jobTitle: {
			type: String,
			max: 100,
			optional: false,
		},
		locations: {
			// allows more than one location
			type: Array,
			minCount: 1, // must have at least an HQ or something
			optional: false,
		},
		"locations.$": {
			// restraints on members of the "locations" array
			type: String,
			max: 150,
		}, // more refined address-checking or validation? dunno, I don't see the need for it immediately
		/*
		QUESTION:
			How to support different currencies,
			when that becomes necessary?
	*/
		pesosPerHour: {
			type: String,
			optional: false,
			max: 30,
			// This bad boy matches a (peso).(centavo) string, or hyphen-separated
			// pair (range) of (peso).(centavo) amounts. Centavos are completely
			// optional on either side of the hyphen.
			regEx: /^[123456789]\d*(\.\d\d)?\s*(-\s*[123456789]\d*(\.\d\d)?\s*)?$/,
		},
		contractType: {
			type: String,
			optional: false,
			allowedValues: [
				i18n.__("common.forms.paj.contractTypes.fullTime"),
				i18n.__("common.forms.paj.contractTypes.partTime"),
				i18n.__("common.forms.paj.contractTypes.contractor"),
			],
		},
		jobDescription: {
			type: String,
			optional: false,
			max: 6000,
			autoform: {
				afFieldInput: {
					type: "textarea",
					rows: 6,
				},
			},
		},
		responsibilities: {
			type: String,
			optional: false,
			max: 6000,
			autoform: {
				afFieldInput: {
					type: "textarea",
					rows: 6,
				},
			},
		},
		qualifications: {
			type: String,
			optional: false,
			max: 6000,
			autoform: {
				afFieldInput: {
					type: "textarea",
					rows: 6,
				},
			},
		},
		datePosted: {
			type: Date,
			optional: true,
			denyUpdate: true,
			defaultValue: new Date(), // obviously, assumes it cannot possibly have been posted before it is posted
			autoform: {
				omit: true,
			},
		},
	},
	{ tracker: Tracker }
);

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

JobAds.schema.labels(jobAdLabels());

JobAds.schema.messageBox.messages({
	en: englishJobAds,
	es: spanishJobAds,
});

JobAds.attachSchema(JobAds.schema, { replace: true });

// This is used by the "Apply for a Job" form
JobAds.applicationSchema = new SimpleSchema(
	{
		jobId: {
			type: String,
			optional: false,
			custom() {
				if (Meteor.isClient && this.isSet) {
					Meteor.call(
						"jobads.doesJobAdExist",
						this.value,
						(error, result) => {
							if (!result) {
								this.validationContext.addValidationErrors([
									{
										name: "jobId",
										type: "invalidJobId",
									},
								]);
							}
						}
					);
				} else if (Meteor.isServer && this.isSet) {
					if (JobAds.findOne(this.value) === undefined) {
						return "invalidJobId";
					}
				}
			},
			autoform: {
				afFieldInput: {
					type: "hidden",
					readonly: true,
				},
			},
		},
		companyName: {
			// Always auto-filled by form
			type: String,
			optional: false,
			max: 100,
			custom() {
				if (Meteor.isClient && this.isSet) {
					Meteor.call(
						"companies.doesCompanyExist",
						this.value,
						(error, result) => {
							if (!result) {
								this.validationContext.addValidationErrors([
									{
										name: "companyName",
										type: "noCompanyWithThatName",
									},
								]);
							}
						}
					);
				} else if (Meteor.isServer && this.isSet) {
					if (Companies.findOne({ name: this.value }) === undefined) {
						return "noCompanyWithThatName";
					}
				}
			},
		},
		// The following fields are personal information
		// entered by the applicant
		fullName: {
			type: String,
			optional: false,
			max: 150,
		},
		email: {
			type: String,
			optional: false,
			max: 100,
			regEx: SimpleSchema.RegEx.EmailWithTLD,
			autoform: {
				afFieldInput: {
					type: "email",
				},
			},
		},
		phoneNumber: {
			type: String,
			optional: false,
			max: 20,
			regEx: SimpleSchema.RegEx.Phone,
			autoform: {
				afFieldInput: {
					type: "tel",
				},
			},
		},
		coverLetterAndComments: {
			type: String,
			optional: true,
			max: 6000,
			autoform: {
				afFieldInput: {
					type: "textarea",
					rows: 6,
				},
			},
		},
		dateSent: {
			type: Date,
			optional: true,
			denyUpdate: true,
			defaultValue: new Date(), // obviously, assumes it cannot possibly have been posted before it is posted
			autoform: {
				omit: true,
			},
		},
	},
	{ tracker: Tracker }
);

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
if (Meteor.isClient && Meteor.isProduction) {
	i18n.loadLocale("es");
}
const spanishJobApps = jobAppErrors("es");

JobAds.applicationSchema.labels(jobAppLabels());

JobAds.applicationSchema.messageBox.messages({
	en: englishJobApps,
	es: spanishJobApps,
});

i18n.onChangeLocale(function(newLocale) {
	if (Meteor.isDevelopment)
		console.log("JOBADS AND JOBAPPLICATIONS: " + newLocale);
	JobAds.schema.messageBox.setLanguage(newLocale);
	JobAds.applicationSchema.messageBox.setLanguage(newLocale);
	JobAds.schema.labels(jobAdLabels());
	JobAds.applicationSchema.labels(jobAppLabels());
});

JobAds.deny({
	insert() {
		return true;
	},
	update() {
		return true;
	},
	remove() {
		return true;
	},
});

if (Meteor.isServer) {
	Meteor.publish("JobAds", function() {
		return JobAds.find({});
	});
}
