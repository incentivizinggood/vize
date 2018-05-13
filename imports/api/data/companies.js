import { Mongo } from "meteor/mongo";
import { Reviews } from "./reviews.js"; // used when retrieving reviews for a given company
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";
SimpleSchema.extendOptions(["autoform"]); // gives us the "autoform" schema option

/*
	Questions:
	- How to prevent certain values from being
	set on insert? -> "denyInsert: true"
	- Would it be desirable to define autoValues
	such that newly-inserted companies could have
	their statistics (avg* fields, percentRecommended,
	etc.) calculated automatically if reviews have
	already been made about them?
	- On that note, would it be beneficial to have
	a "PSM" somewhere to "refresh" the statistics
	based on reviews?
*/

export const Companies = new Mongo.Collection("CompanyProfiles", { idGeneration: 'STRING' });

// Add helper functions directly to the Companies collection object
// convert _id or name into a proper Mongo-style selector
Companies.getSelector = function(companyIdentifier) {
	if(typeof companyIdentifier === "string")
		return {name: companyIdentifier};
	else if (typeof companyIdentifier === "object")
		// assumes type of Mongo.ObjectId for _id if not string for name
		return {_id: companyIdentifier}; // don't have to wrap _id in a selector, but should do so for security anyway
	else return undefined;
};

// simple existence check//
Companies.hasEntry = function (companyIdentifier) {
	// Test whether a company exists yet in the
	// CompanyProfiles collection.
	// Returns true if the company is found, false otherwise.
	return Companies.findOne(Companies.getSelector(companyIdentifier)) !== undefined;
};

// Is this safe? I want this cursor to be read-only,
// but I'm not sure it is...
Companies.findReviewsForCompany = function(companyIdentifier) {
	// Can find reviews for a company by name or _id.
	// This uses the LucidChart Reviews schema, but reviews.js has yet
	// to be updated to match (company_id vs companyID). BUG
	company = Companies.findOne(Companies.getSelector(companyIdentifier));
	return Reviews.find({companyName: company.name});
};

const companiesSchema = new SimpleSchema({
	_id: {
		type: String,
		optional: true,
		denyUpdate: true,
		autoValue: new Meteor.Collection.ObjectID(), // forces a correct value
		autoform: {
			omit: true,
		}, },
	vizeProfileUrl: {
		type: String,
		optional: true,
		denyUpdate: true,
		autoValue: function() {
			if(this.field("_id").isSet) {
				return process.env.ROOT_URL + "companyprofile/?id=" + this.field("_id").value;
			}
		},
		autoform: {
			omit: true,
		}, },
	vizeReviewUrl: {
		type: String,
		optional: true,
		denyUpdate: true,
		autoValue: function() {
			if(this.field("_id").isSet) {
				return process.env.ROOT_URL + "write-review/?id=" + this.field("_id").value;
			}
		},
		autoform: {
			omit: true,
		}, },
	vizeSalaryUrl: {
		type: String,
		optional: true,
		denyUpdate: true,
		autoValue: function() {
			if(this.field("_id").isSet) {
				return process.env.ROOT_URL + "submit-salary-data/?id=" + this.field("_id").value;
			}
		},
		autoform: {
			omit: true,
		}, },
	name: {
		type: String,
	 	optional: false,
		index: true, /* requires aldeed:collection2 and simpl-schema packages */
		unique: true, /* ditto */
		custom: function() {
			if (Meteor.isClient && this.isSet) {
				Meteor.call("companies.isCompanyNameAvailable", this.value, (error, result) => {
					if (!result) {
						this.validationContext.addValidationErrors([{
							name: "name",
							type: "nameTaken",
						}]);
					}
				});
			}
			else if (Meteor.isServer && this.isSet) {
				if(Companies.hasEntry(this.value)) {
					return "nameTaken";
				}
			} },
	},
	contactEmail: {
		type: String,
		optional: false,
		regEx: SimpleSchema.RegEx.Email, },
	dateEstablished: {
		type: Date,
		optional: true, },
	numEmployees: {
		type: String,
	 	allowedValues: ["1 - 50", "51 - 500", "501 - 2000", "2001 - 5000", "5000+"],
		optional: true, }, //should this be required?
	industry: {
		type: String, //could throw in allowedValues, might be helpful to define industry types -> ask Bryce?
		optional: true, }, //should this be required?
	locations: {
		type: Array, //allows more than one location
		minCount: 1, //must have at least an HQ or something
 		optional: false, },
	'locations.$': { //restraints on members of the "locations" array
		type: String, }, //more refined address-checking or validation? dunno, I don't see the need for it immediately
	otherContactInfo: {
		type: String, //dunno what this needs to be, leaving it to the user's discretion to "validate"
		optional: true, },
	websiteURL: {		// the COMPANY's actual website, not their
		type: String,	// little corner of the Vize web app
		optional: true, // should this be required?
		regEx: SimpleSchema.RegEx.Url,
	 	autoform: {
			afFieldInput: {
				type: "url",
			},
		}, },
	descriptionOfCompany: {
		type: String,
		optional: true,
		autoform: {
			type: "textarea",
			rows: 6,
		}, },
	// All fields after this point are only
	// ever used "internally" by the app,
	// for calculations or for other things
	// that are not editable by users.
	// Thus they have autoform.omit set to true.

	dateJoined: { // refers to the date the company "joined" Vize - what exactly does that mean?
		type: Date,
		optional: true,
		defaultValue: new Date(), // "current" date, i.e. this is a new
								// insertion and the company is just now joining
		autoform: {
			omit: true,
		}, },
	numFlags: { // as in, the number of times this company has been "flagged" for some reason,
				//Vize IT is free to decrease as issues are dealt with
		type: SimpleSchema.Integer,
		min: 0,
		optional: true,
		defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	// denormalizers - maybe add a mechanism to indicate that no data
	// is available, so they don't just show up with terrible ratings? -> "if numReviews == 0..."
	// NOTE everything from here to numReviews is an AVERAGE value, but the
	// names do not indicate that because I want them to have the same names
	// as the fields in the Reviews schema in case I have the opportunity to
	// abstract the ratings system out of both schemas.
	healthAndSafety: {
		type: Number,
		min: 0, max: 5,
		optional: true,
	 	defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	managerRelationship: { //"manager relationship", in case that isn't clear...
		type: Number,
		min: 0, max: 5,
		optional: true,
		defaultValue: 0,
		autoform: {
			omit: true,
	}, },
	workEnvironment: {
		type: Number,
		min: 0, max: 5,
		optional: true,
		defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	benefits: {
		type: Number,
		min: 0, max: 5,
		optional: true,
	 	defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	overallSatisfaction: {
		type: Number,
		min: 0, max: 5,
		optional: true,
	 	defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	numReviews: {
		type: SimpleSchema.Integer,
		min: 0,
		optional: true,
		defaultValue: 0,
	 	autoform: {
			omit: true,
		}, },
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
		min: 0, max: 1,
		optional: true,
		defaultValue: 0,
		autoform: {
			omit: true,
		}, },
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
		}, },
}, { tracker: Tracker } );

// Define custom error messages for custom validation functions
companiesSchema.messageBox.messages({
	//en? does that mean we can add internationalization
	//in this block of code?
	en: {
		nameTaken: "The name you provided is already taken",
	},
});

//db.CompanyProfiles.find({$text: {$search: "vize"}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}})

// Added line for autoforms and collection2 usage
Companies.attachSchema(companiesSchema, { replace: true });

if (Meteor.isServer) {
	console.log("SERVER: inside the companies.js isServer block");


//Created the index for the collection Companies, to search on the name text.
	Companies.rawCollection().createIndex({"name": "text"});

	Meteor.publish("CompanyProfiles", function() {
		//return Companies.find({$text: {$search: "vize"}}, {score: {$meta: "textScore"}}).sort({score:{$meta:"textScore"}});
		//return Companies.find({$text: {$search: "vize"}});
		return Companies.find({});
	});
}
