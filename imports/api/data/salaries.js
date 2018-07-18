import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";
import { Companies } from "./companies.js";
import i18n from "meteor/universe:i18n";

SimpleSchema.extendOptions(["autoform"]); // gives us the "autoform" schema option

export const Salaries = new Mongo.Collection("Salaries", {
	idGeneration: "STRING",
});

/*
	Change this all from "Salaries" to "Incomes" or "Pay"?
*/
Salaries.schema = new SimpleSchema(
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
			index: true,
			custom() {
				if (this.isSet) {
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
							}
						}
					);
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
			type: String,
			max: 150,
			optional: false,
		},
		jobTitle: {
			type: String,
			max: 100,
			optional: false,
		},
		incomeType: {
			type: String,
			optional: false,
			allowedValues: [
				i18n.__("common.forms.ssd.payTypes.yearlySalary"),
				i18n.__("common.forms.ssd.payTypes.monthlySalary"),
				i18n.__("common.forms.ssd.payTypes.hourlyWage"),
			],
		},
		incomeAmount: {
			type: Number,
			optional: false,
			min: 0,
		},
		gender: {
			type: String,
			optional: true,
			allowedValues: [
				i18n.__("common.gender.male"),
				i18n.__("common.gender.female"),
			],
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

Salaries.attachSchema(Salaries.schema, { replace: true });

Salaries.deny({
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
	Meteor.publish("Salaries", function() {
		return Salaries.find({});
	});
}
