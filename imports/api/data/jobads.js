import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";
import { Companies } from "./companies.js";
SimpleSchema.extendOptions(["autoform"]); // gives us the "autoform" schema option

export const JobAds = new Mongo.Collection("JobAds", { idGeneration: 'MONGO'});

const jobAdsSchema = new SimpleSchema({
	companyName: {		//Filled in by user, or auto-filled by form, but in any
		type: String,	//case, company names are indexed so we may as well use
	 	optional: false,//use this instead of companyID
		index: true,
		custom: function() {
			if (Meteor.isClient && this.isSet) {
				Meteor.call("companies.doesCompanyExist", this.value, (error, result) => {
					if (!result) {
						this.validationContext.addValidationErrors([{
							name: "companyName",
							type: "noCompanyWithThatName",
						}]);
					}
				});
			}
			else if (Meteor.isServer && this.isSet) {
				if(!Companies.hasEntry(this.value)) {
					return "noCompanyWithThatName";
				}
			}
		}, },
	jobTitle: {
		type: String,
		optional: false, },
	locations: { //allows more than one location
		type: Array,
		minCount: 1, //must have at least an HQ or something
 		optional: false, },
	'locations.$': { //restraints on members of the "locations" array
		type: String, }, //more refined address-checking or validation? dunno, I don't see the need for it immediately
	/*
		QUESTION:
			How to support different currencies,
			when that becomes necessary?
	*/
	pesosPerHour: {
		type: String,
		optional: false,
		//This bad boy matches a (peso).(centavo) string, or hyphen-separated
		//pair (range) of (peso).(centavo) amounts. Centavos are completely
		//optional on either side of the hyphen.
		regEx: /^[123456789]\d*(\.\d\d)?\s*(-\s*[123456789]\d*(\.\d\d)?\s*)?$/,
		autoform: {
			afFieldInput: {
				placeholder: "Enter a value, $.c, or a range of values, $.c - $.c",
			},
		}, },
	contractType: {
		type: String,
		optional: false,
		allowedValues: ["Full time", "Part time", "Contractor"],
	},
	jobDescription: { //need to make sure this displays a nice box
		type: String,
		optional: false,
		autoform: {
			afFieldInput: {
				type: "textarea",
				rows: 6,
				placeholder: "Please enter a formal description of this job",
			},
		}, },
	responsibilities: { //need to make sure this displays a nice box
		type: String,
		optional: false,
		autoform: {
			afFieldInput: {
				type: "textarea",
				rows: 6,
				placeholder: "Please summarize the responsibilities that come with this job"
			},
		}, },
	qualifications: { //need to make sure this displays a nice box
		type: String,
		optional: false,
		autoform: {
			afFieldInput: {
				type: "textarea",
				rows: 6,
				placeholder: "Please describe the qualifications necessary for this job",
			},
		}, },
}, { tracker: Tracker } );

jobAdsSchema.messageBox.messages({
	//en? does that mean we can add internationalization
	//in this block of code?
	en: {
		noCompanyWithThatName: "There is no company with that name in our database",
	},
});

JobAds.attachSchema(jobAdsSchema, { replace: true });

if (Meteor.isServer) {
	Meteor.publish("JobAds", function() {
		return JobAds.find({});
	});
}
