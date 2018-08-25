import { Meteor } from "meteor/meteor";
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
			type: SimpleSchema.Integer,
			optional: true,
			denyUpdate: true,
			autoform: {
				omit: true,
			},
		},
		companyName: {
			// Filled in by user, or auto-filled by form, but in any
			type: String, // case, company names are indexed so we may as well use
			optional: false, // use this instead of companyID
			max: 100,
			custom() {
				if (this.isSet) {
					if (Meteor.isClient) {
						Meteor.call(
							"companies.doesCompanyWithNameNotExist",
							this.value,
							(error, result) => {
								if (result) {
									this.validationContext.addValidationErrors([
										{
											name: "companyName",
											type: "noCompanyWithThatName",
										},
									]);
								}
							}
						);
					} else if (Meteor.isServer) {
						if (
							Meteor.call(
								"companies.doesCompanyWithNameNotExist",
								this.value
							)
						)
							return "noCompanyWithThatName";
					}
				}
			},
		},
		companyId: {
			type: SimpleSchema.Integer,
			optional: true,
			autoValue() {
				if (Meteor.isServer && this.field("companyName").isSet) {
					const company = Meteor.call(
						"companies.findOne",
						this.field("companyName").value
					);
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
			type: Object,
			autoform: {
				type: "location",
			},
		},
		"locations.$.city": {
			type: String,
			max: 150,
			optional: false,
		},
		"locations.$.address": {
			type: String,
			max: 150,
			optional: true,
		},
		"locations.$.industrialHub": {
			type: String,
			max: 150,
			optional: true,
		},
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
			allowedValues: ["Full time", "Part time", "Contractor"],
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

JobAds.attachSchema(JobAds.schema, { replace: true });

// This is used by the "Apply for a Job" form
JobAds.applicationSchema = new SimpleSchema(
	{
		jobId: {
			type: SimpleSchema.Integer,
			optional: false,
			custom() {
				if (this.isSet) {
					if (Meteor.isClient) {
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
					} else if (Meteor.isServer) {
						if (!Meteor.call("jobads.doesJobAdExist", this.value))
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
				if (this.isSet) {
					if (Meteor.isClient) {
						Meteor.call(
							"companies.doesCompanyWithNameNotExist",
							this.value,
							(error, result) => {
								if (result) {
									this.validationContext.addValidationErrors([
										{
											name: "companyName",
											type: "noCompanyWithThatName",
										},
									]);
								}
							}
						);
					} else if (Meteor.isServer) {
						if (
							Meteor.call(
								"companies.doesCompanyWithNameNotExist",
								this.value
							)
						)
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
