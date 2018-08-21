import { Meteor } from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";
import i18n from "meteor/universe:i18n";
import PostgreSQL from "../graphql/connectors/postgresql.js";
import PgCompanyFunctions from "../models/helpers/postgresql/companies.js";

SimpleSchema.extendOptions(["autoform"]); // gives us the "autoform" schema option

export const Companies = new Mongo.Collection("CompanyProfiles", {
	idGeneration: "STRING",
});

Companies.schema = new SimpleSchema(
	{
		_id: {
			type: SimpleSchema.Integer,
			optional: true,
			denyUpdate: true,
			autoform: {
				omit: true,
			},
		},
		name: {
			type: String,
			optional: false,
			max: 100,
			index: true /* requires aldeed:collection2 and simpl-schema packages */,
			unique: true /* ditto */,
			custom() {
				if (this.isSet) {
					if (Meteor.isClient) {
						Meteor.call(
							"companies.doesCompanyWithNameNotExist",
							this.value,
							(error, result) => {
								console.log();
								if (!result) {
									this.validationContext.addValidationErrors([
										{
											name: "name",
											type: "nameTaken",
										},
									]);
								}
							}
						);
					} else if (Meteor.isServer) {
						if (
							!Meteor.call(
								"companies.doesCompanyWithNameNotExist",
								this.value
							)
						)
							return "nameTaken";
					}
				}
			},
		},
		contactEmail: {
			type: String,
			optional: false,
			max: 100,
			regEx: SimpleSchema.RegEx.EmailWithTLD,
			// autoform: {
			// 	afFieldInput: {
			// 		type: "email",
			// 	},
			// },
		},
		dateEstablished: {
			type: Date,
			optional: true,
		},
		numEmployees: {
			type: String,
			allowedValues: [
				"1 - 50",
				"51 - 500",
				"501 - 2000",
				"2001 - 5000",
				"5000+",
			],
			optional: true,
		}, // should this be required?
		industry: {
			type: String, // could throw in allowedValues, might be helpful to define industry types -> ask Bryce?
			max: 50,
			optional: true,
		}, // should this be required?
		locations: {
			type: Array, // allows more than one location
			minCount: 1, // must have at least an HQ or something
			optional: false,
		},
		"locations.$": {
			// restraints on members of the "locations" array
			type: String,
			max: 150,
		}, // more refined address-checking or validation? dunno, I don't see the need for it immediately
		otherContactInfo: {
			type: String, // dunno what this needs to be, leaving it to the user's discretion to "validate"
			max: 200,
			optional: true,
		},
		websiteURL: {
			// the COMPANY's actual website, not their
			type: String, // little corner of the Vize web app
			max: 250,
			optional: true, // should this be required?
			regEx: SimpleSchema.RegEx.Url,
			autoform: {
				afFieldInput: {
					type: "url",
				},
			},
		},
		descriptionOfCompany: {
			type: String,
			optional: true,
			max: 6000,
			autoform: {
				type: "textarea",
				rows: 6,
			},
		},
		// All fields after this point are only
		// ever used "internally" by the app,
		// for calculations or for other things
		// that are not editable by users.
		// Thus they have autoform.omit set to true.
		dateJoined: {
			// refers to the date the company "joined" Vize - what exactly does that mean?
			type: Date,
			optional: true,
			defaultValue: new Date(), // "current" date, i.e. this is a new
			// insertion and the company is just now joining
			autoform: {
				omit: true,
			},
		},
		numFlags: {
			// as in, the number of times this company has been "flagged" for some reason,
			// Vize IT is free to decrease as issues are dealt with
			type: SimpleSchema.Integer,
			min: 0,
			optional: true,
			defaultValue: 0,
			autoform: {
				omit: true,
			},
		},
		// denormalizers - maybe add a mechanism to indicate that no data
		// is available, so they don't just show up with terrible ratings? -> "if numReviews == 0..."
		// NOTE everything from here to numReviews is an AVERAGE value, but the
		// names do not indicate that because I want them to have the same names
		// as the fields in the Reviews schema in case I have the opportunity to
		// abstract the ratings system out of both schemas.
		healthAndSafety: {
			type: Number,
			min: 0,
			max: 5,
			optional: true,
			defaultValue: 0,
			autoform: {
				omit: true,
			},
		},
		managerRelationship: {
			// "manager relationship", in case that isn't clear...
			type: Number,
			min: 0,
			max: 5,
			optional: true,
			defaultValue: 0,
			autoform: {
				omit: true,
			},
		},
		workEnvironment: {
			type: Number,
			min: 0,
			max: 5,
			optional: true,
			defaultValue: 0,
			autoform: {
				omit: true,
			},
		},
		benefits: {
			type: Number,
			min: 0,
			max: 5,
			optional: true,
			defaultValue: 0,
			autoform: {
				omit: true,
			},
		},
		overallSatisfaction: {
			type: Number,
			min: 0,
			max: 5,
			optional: true,
			defaultValue: 0,
			autoform: {
				omit: true,
			},
		},
		numReviews: {
			type: SimpleSchema.Integer,
			min: 0,
			optional: true,
			defaultValue: 0,
			autoform: {
				omit: true,
			},
		},
		percentRecommended: {
			/*
				How this is calculated:
				When reviews are left, one of the required fields
				is basically a boolean "Would you recommend" box.
				Take the number of checked boxes among all
				reviews, divide by total number of reviews for
				this company.
			*/
			type: Number,
			min: 0,
			max: 1,
			optional: true,
			defaultValue: 0,
			autoform: {
				omit: true,
			},
		},
		avgNumMonthsWorked: {
			/*
				Calculated based on reviews left by
				workers who have left the company (i.e. have
				provided an end date for their employment),
				we use it as an indication of turnover rate.
			*/
			type: Number,
			min: 0,
			optional: true,
			defaultValue: 0,
			autoform: {
				omit: true,
			},
		},
	},
	{ tracker: Tracker }
);

// db.CompanyProfiles.find({$text: {$search: "vize"}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})

// Added line for autoforms and collection2 usage
Companies.attachSchema(Companies.schema, { replace: true });

Companies.deny({
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
	Companies.rawCollection().createIndex({ name: "text" });

	Meteor.publish("CompanyProfiles", function() {
		return Companies.find({});
	});
}
