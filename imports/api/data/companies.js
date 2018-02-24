import { Mongo } from "meteor/mongo";

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

if (Meteor.isServer) {
    Meteor.publish("CompanyProfiles", function() {
        return Companies.find({});
    });
}
