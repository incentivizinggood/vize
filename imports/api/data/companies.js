import { Mongo } from "meteor/mongo";
import { Reviews } from "./reviews.js"; // used when retrieving reviews for a given company

/*
	How to prevent certain values from being
	set on insert?
*/

export const Companies = new Mongo.Collection("CompanyProfiles", { idGeneration: 'MONGO' });

Companies.schema = new SimpleSchema({
	name: {
		type: String,
	 	optional: false,
		index: true, /* requires aldeed:collection2 and simpl-schema packages */
		unique: true, /* ditto */},
	contactEmail: {
		type: String, // is there a pre-made type for representing these?
		optional: false,
		regEx: SimpleSchema.RegEx.Email, },
	dateEstablished: {
		type: Date,
		optional: true, },
	numEmployees: {
		type: String,
	 	allowedValues: ["1 - 50", "51 - 500", "501 - 2000", "2001 - 5000", "5000+"],
		optional: true, },
	//We're going to need to re-vize (LOL)
	//these next three fields a bit
	industry: {
		type: String,
		optional: true, },
	locations: {
		type: [String], //allows more than one location
		optional: true, },
	otherContactInfo: {
		type: String,
		optional: true, },
	websiteURL: {
		type: String,
		optional: true,
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
	avgRespect: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: true,
		defaultValue: 0,
		autoform: {
			omit: true,
		}},
	avgBenefits: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: true,
	 	defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	avgSatisfaction: {
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
