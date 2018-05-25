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
			type: String,
			optional: true,
			denyUpdate: true,
			autoValue: new Meteor.Collection.ObjectID(), // forces a correct value
			autoform: {
				omit: true,
			},
		},
		submittedBy: {
			// userId of the review author
			type: String,
			optional: true,
			denyUpdate: true,
			autoValue() {
				if (Meteor.isServer) {
					// userId is not normally part of the autoValue "this" context, but the collection2 package adds it automatically
					return this.userId;
				}
			},
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
				} else if (Meteor.isServer && this.isSet) {
					if (
						this.value ===
							i18n.__("common.forms.companyNotFound") ||
						this.value === i18n.__("common.forms.pleaseWait")
					) {
						return "sessionError";
					}
				}
			},
		},
		companyId: {
			type: String,
			optional: true,
			denyUpdate: true, // Yes, the company might be "created" at some point, but then we should update this field by Mongo scripting, not with JS code
			index: true,
			autoValue() {
				if (Meteor.isServer && this.field("companyName").isSet) {
					const company = Companies.findOne({
						name: this.field("companyName").value,
					});
					if (company !== undefined) {
						return company._id;
					}
					return "This company does not have a Vize profile yet";
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

Salaries.schema.labels({
	_id: i18n.__("SimpleSchema.labels.Salaries._id"),
	submittedBy: i18n.__("SimpleSchema.labels.Salaries.submittedBy"),
	companyName: i18n.__("SimpleSchema.labels.Salaries.companyName"),
	companyId: i18n.__("SimpleSchema.labels.Salaries.companyId"),
	jobTitle: i18n.__("SimpleSchema.labels.Salaries.jobTitle"),
	incomeType: i18n.__("SimpleSchema.labels.Salaries.incomeType"),
	incomeAmount: i18n.__("SimpleSchema.labels.Salaries.incomeAmount"),
	gender: i18n.__("SimpleSchema.labels.Salaries.gender"),
	datePosted: i18n.__("SimpleSchema.labels.Salaries.datePosted"),
});

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

Salaries.schema.messageBox.messages({
	en: englishSalaries,
	es: spanishSalaries,
});

i18n.onChangeLocale(function(newLocale) {
	if (Meteor.isDevelopment) console.log("SALARIES: " + newLocale);
	Salaries.schema.messageBox.setLanguage(newLocale);
});

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
