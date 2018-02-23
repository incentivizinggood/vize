import { Mongo } from "meteor/mongo";

export const Companies = new Mongo.Collection("CompanyProfiles", { idGeneration: 'MONGO' });

Companies.schema = new SimpleSchema({
    Name: { //Can we make this unique somehow, and maybe also indexed?
		//It would make using this collection a TON easier...
		//First attempt -> see fields below, should be self-explanatory
		type: String,
	 	optional: false,
		index: true, /* requires aldeed:collection2 and simpl-schema packages */
		unique: true, /* ditto */},
	DateEstablished: {
		type: Date,
		optional: true, },
	DateJoined: {
		type: Date,
		optional: true, },
	NumEmployees: {
		type: Number,
	 	decimal: true,
		optional: true,
		defaultValue: 0, },
	//We're going to need to re-vize (LOL)
	//these next five fields a bit
	Industry: {
		type: String,
		optional: true, },
	Locations: {
		type: String,
		optional: true,  },
	ContactInfo: {
		type: String,
		optional: true, },
	Email: {
		type: String, // is there a pre-made type for representing these?
		optional: false, },
	NumFlags: { // as in, the number of times this company has been "flagged" for some reason, Vize IT is free to decrease as issues are dealt with
		type: Number,
		min: 0,
		decimal: true,
		optional: true,
		defaultValue: 0, },
    // denormalizers
	// maybe add a mechanism to indicate
	// that no data is available?
    AvgSafety: {
		type: Number,
		min: 0, max: 5,
		decimal: false,
		optional: true, },
    AvgRespect: {
		type: Number,
		min: 0, max: 5,
		decimal: false,
		optional: true, },
	AvgBenefits: {
		type: Number,
		min: 0, max: 5,
		decimal: false,
		optional: true, },
	AvgSatisfaction: {
		type: Number,
		min: 0, max: 5,
		decimal: false,
		optional: true, },
    NumReviews: {
		type: Number,
		min: 0,
		decimal: true,
		optional: false,
		defaultValue: 0, },
	JobListings: {
		type: [Mongo.ObjectId], //_id fields of JobAd documents
		optional: true, },
	Reviews: {
		type: [Mongo.ObjectId], //_id fields of Review documents
		optional: true, },
});

if (Meteor.isServer) {
    Meteor.publish("CompanyProfiles", function() {
        return Companies.find({});
    });
}
