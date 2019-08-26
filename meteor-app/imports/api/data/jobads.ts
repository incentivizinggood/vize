import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";

SimpleSchema.extendOptions(["autoform"]); // gives us the "autoform" schema option

// This is used by the "Apply for a Job" form
export const JobApplicationSchema = new SimpleSchema(
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
			defaultValue: new Date(), // obviously, assumes it cannot possibly have been posted before it is posted
			autoform: {
				omit: true,
			},
		},
	},
	{ tracker: Tracker }
);
