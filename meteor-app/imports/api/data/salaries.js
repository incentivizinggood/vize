import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";

SimpleSchema.extendOptions(["autoform"]); // gives us the "autoform" schema option

export const SalarySchema = new SimpleSchema(
	{
		_id: {
			type: SimpleSchema.Integer,
			optional: true,
			autoform: {
				omit: true,
			},
		},
		submittedBy: {
			// userId of the review author
			type: SimpleSchema.Integer,
			optional: true,
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
							"companies.isNotSessionError",
							this.value,
							(error, result) => {
								if (!result) {
									this.validationContext.addValidationErrors([
										{
											name: "companyName",
											type: "sessionError",
										},
									]);
								} else if (!this.isNotASubmission) {
									// for an explanation of this check, see comment
									// on custom validator for this field in
									// imports/api/data/reviews.js
									Meteor.call(
										"salaries.checkForSecondSalaryByUser",
										this.value,
										(error2, result2) => {
											if (!result2) {
												this.validationContext.addValidationErrors(
													[
														{
															name: "companyName",
															type:
																"secondSalaryByUser",
														},
													]
												);
											}
										}
									);
								}
							}
						);
					} else if (Meteor.isServer) {
						if (
							!Meteor.call(
								"companies.isNotSessionError",
								this.value
							)
						)
							return "sessionError";
						else if (
							!this.isNotASubmission &&
							!Meteor.call(
								"salaries.checkForSecondSalaryByUser",
								this.value
							)
						)
							return "secondSalaryByUser";
					}
				}
			},
		},
		companyId: {
			type: SimpleSchema.Integer,
			optional: true,
			autoform: {
				omit: true,
			},
		},
		location: {
			type: Object,
			optional: false,
			autoform: {
				type: "location",
			},
		},
		"location.city": {
			type: String,
			max: 300,
			optional: false,
		},
		"location.address": {
			type: String,
			max: 300,
			optional: false,
		},
		"location.industrialHub": {
			type: String,
			max: 300,
			optional: true,
		},
		jobTitle: {
			type: String,
			max: 100,
			optional: false,
		},
		incomeType: {
			type: String,
			optional: false,
			allowedValues() {
				return ["Yearly Salary", "Monthly Salary", "Hourly Wage"];
			},
		},
		incomeAmount: {
			type: Number,
			optional: false,
			min: 0,
		},
		gender: {
			type: String,
			optional: true,
			allowedValues() {
				return ["Male", "Female"];
			},
		},
		datePosted: {
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
