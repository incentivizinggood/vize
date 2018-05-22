import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";
import { Companies } from "./companies.js";
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
			//Filled in by user, or auto-filled by form, but in any
			type: String, //case, company names are indexed so we may as well use
			optional: false, //use this instead of companyID
			max: 100,
			index: true,
			custom: function() {
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
					if (!Companies.hasEntry(this.value)) {
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
			autoValue: function() {
				if (Meteor.isServer && this.field("companyName").isSet) {
					let company = Companies.findOne({
						name: this.field("companyName").value,
					});
					if (company !== undefined) {
						return company._id;
					} else {
						// This should never happen, because
						// companies not in the database cannot
						// post jobs: that error is caught in
						// another custom validator
						return undefined;
					}
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
			autoValue: function() {
				if (this.field("_id").isSet) {
					return Meteor.absoluteUrl(
						"apply-for-job/?id=" + this.field("_id").value,
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
			//allows more than one location
			type: Array,
			minCount: 1, //must have at least an HQ or something
			optional: false,
		},
		"locations.$": {
			//restraints on members of the "locations" array
			type: String,
			max: 150,
		}, //more refined address-checking or validation? dunno, I don't see the need for it immediately
		/*
		QUESTION:
			How to support different currencies,
			when that becomes necessary?
	*/
		pesosPerHour: {
			type: String,
			optional: false,
			max: 30,
			//This bad boy matches a (peso).(centavo) string, or hyphen-separated
			//pair (range) of (peso).(centavo) amounts. Centavos are completely
			//optional on either side of the hyphen.
			regEx: /^[123456789]\d*(\.\d\d)?\s*(-\s*[123456789]\d*(\.\d\d)?\s*)?$/,
			autoform: {
				afFieldInput: {
					placeholder:
						"Enter a value, $.c, or a range of values, $.c - $.c",
				},
			},
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
					placeholder:
						"Please enter a formal description of this job",
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
					placeholder:
						"Please summarize the responsibilities that come with this job",
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
					placeholder:
						"Please describe the qualifications necessary for this job",
				},
			},
		},
		datePosted: {
			type: Date,
			optional: true,
			denyUpdate: true,
			defaultValue: new Date(), //obviously, assumes it cannot possibly have been posted before it is posted
			autoform: {
				omit: true,
			},
		},
	},
	{ tracker: Tracker }
);

JobAds.schema.messageBox.messages({
	//en? does that mean we can add internationalization
	//in this block of code?
	en: {
		noCompanyWithThatName:
			"There is no company with that name in our database",
	},
});

JobAds.attachSchema(JobAds.schema, { replace: true });

// This is used by the "Apply for a Job" form
JobAds.applicationSchema = new SimpleSchema(
	{
		jobId: {
			type: String,
			optional: false,
			custom: function() {
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
			custom: function() {
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
					if (!Companies.hasEntry(this.value)) {
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
			autoform: {
				afFieldInput: {
					placeholder: "Enter your full name here",
				},
			},
		},
		email: {
			type: String,
			optional: false,
			max: 100,
			regEx: SimpleSchema.RegEx.EmailWithTLD,
			autoform: {
				afFieldInput: {
					type: "email",
					placeholder:
						"Input an email address the company can contact you at",
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
					placeholder:
						"Input phone number the company can contact you with",
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
					placeholder:
						"Things that would normally go in a cover letter may go in this field, otherwise you may type any message you like here and it will get sent to the company as part of your application",
				},
			},
		},
		dateSent: {
			type: Date,
			optional: true,
			denyUpdate: true,
			defaultValue: new Date(), //obviously, assumes it cannot possibly have been posted before it is posted
			autoform: {
				omit: true,
			},
		},
	},
	{ tracker: Tracker }
);

JobAds.applicationSchema.messageBox.messages({
	//en? does that mean we can add internationalization
	//in this block of code?
	en: {
		invalidJobId:
			"Please provide a valid job id for the job you wish to apply to",
		noCompanyWithThatName:
			"There is no company with that name in our database",
	},
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
