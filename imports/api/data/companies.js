import { Mongo } from "meteor/mongo";
import { Reviews } from "./reviews.js"; // used when retrieving reviews for a given company

/*
	Questions:
	- How to prevent certain values from being
	set on insert?
	- Would it be desirable to define autoValues
	such that newly-inserted companies could have
	their statistics (avg* fields, percentRecommended,
	etc.) calculated automatically if reviews have
	already been made about them?
	- On that note, would it be beneficial to have
	a "PSM" somewhere to "refresh" the statistics
	based on reviews?
*/

export const Companies = new Mongo.Collection("CompanyProfiles", { idGeneration: 'MONGO' });

Companies.schema = new SimpleSchema({
	name: {
		type: String,
	 	optional: false,
		index: true, /* requires aldeed:collection2 and simpl-schema packages */
		unique: true, /* ditto */},
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
	//We're going to need to re-vize (LOL)
	//these next three fields a bit
	industry: {
		type: String, //could throw in allowedValues, might be helpful
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
	websiteURL: {
		type: String,
		optional: true, //should this be required?
		regEx: SimpleSchema.RegEx.Url, },

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
		type: Number,
		min: 0,
		decimal: false,
		optional: true,
		defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	// denormalizers - maybe add a mechanism to indicate that no data
	// is available, so they don't just show up with terrible ratings?
	avgHealthAndSafety: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: true,
	 	defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	avgMgrRelationship: { //"average manager relationship", in case that isn't clear...
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: true,
		defaultValue: 0,
		autoform: {
			omit: true,
	}, },
	avgWorkEnvironment: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: true,
		defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	avgBenefits: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: true,
	 	defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	avgOverallSatisfaction: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: true,
	 	defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	numReviews: {
		type: Number,
		min: 0,
		decimal: false,
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
		decimal: true,
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
		decimal: true,
		defaultValue: 0,
		autoform: {
			omit: true,
		}, },
});

// Added line for autoforms and collection2 usage
Companies.attachSchema(Companies.schema);

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
	return Reviews.find({companyID: company._id});
};

if (Meteor.isServer) {
	Meteor.publish("CompanyProfiles", function() {
		return Companies.find({});
	});
}
