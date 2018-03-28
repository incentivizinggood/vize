import { Mongo } from "meteor/mongo";
import { Reviews } from "./reviews.js"; // used when retrieving reviews for a given company
export const Companies = new Mongo.Collection("CompanyProfiles", { idGeneration: 'MONGO' });

Companies.schema = new SimpleSchema({
	name: { //Can we make this unique somehow, and maybe also indexed?
		//It would make using this collection a TON easier...
		//First attempt -> see fields below, should be self-explanatory
		type: String,
	 	optional: false,
		index: true, /* requires aldeed:collection2 and simpl-schema packages */
		unique: true, /* ditto */},
	dateEstablished: {
		type: Date,
		optional: true, },
	dateJoined: {
		type: Date,
		optional: true, },
	numEmployees: {
		type: Number,
	 	decimal: false,
		optional: true,
		defaultValue: 0, },
	//We're going to need to re-vize (LOL)
	//these next five fields a bit
	industry: {
		type: String,
		optional: true, },
	locations: {
		type: String,
		optional: true,  },
	contactInfo: {
		type: String,
		optional: true, },
	email: {
		type: String, // is there a pre-made type for representing these?
		optional: false, },
	numFlags: { // as in, the number of times this company has been "flagged" for some reason,
				//Vize IT is free to decrease as issues are dealt with
		type: Number,
		min: 0,
		decimal: false,
		optional: true,
		defaultValue: 0, },
	// denormalizers
	// maybe add a mechanism to indicate
	// that no data is available?
	avgSafety: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: true, },
	avgRespect: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: true, },
	avgBenefits: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: true, },
	avgSatisfaction: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: true, },
	numReviews: {
		type: Number,
		min: 0,
		decimal: false,
		optional: false,
		defaultValue: 0, },
});

// Add helper functions directly to the Companies collection object
// convert _id or name into a proper Mongo-style selector
Companies.getSelector = function(companyIdentifier) {
	if(typeof companyIdentifier === "string")
		return {name: companyIdentifier};
	else if (typeof companyIdentifier === "object")
		// assumes type of Mongo.ObjectId for _id if not string for name
		return companyIdentifier; // don't have to wrap _id in a selector
	else return undefined;
};

// simple existence check
Companies.hasEntry = function (companyIdentifier) {
	// Test whether a company exists yet in the
	// CompanyProfiles collection.
	// Returns true if the company is found, false otherwise.
	return Companies.findOne(Companies.getSelector(companyIdentifier)) !== undefined;
};

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
