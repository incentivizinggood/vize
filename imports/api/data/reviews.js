import { Mongo } from "meteor/mongo";
import {Tracker} from "meteor/tracker";

//Constructor called - created new Collection named 'Reviews'
// Collection can be edited by the object Reviews
export const Reviews = new Mongo.Collection("Reviews", { idGeneration: 'MONGO'});
import {Comments} from './comments.js';

/*
	NEED TO MAKE THIS MORE ROBUST
*/
//Schema for the Collection
Reviews.schema = new SimpleSchema({
	companyID:{ // NEED TO TALK TO JULIAN ABOUT THIS
		// ** _id for the companies..will be obtained from the
		type: Mongo.ObjectId,	//company name and location fields of the reviews form.
	 	optional: false,
		index: true, },

	//** username and screenName are not there in the MVP, reviews will be completely anonymous.
	// username: {
	//   type: String,
	//   optional: false
	// },
	// screenName: {
	//   type: String,
	//   optional: false //not sure about this, might need to change for anonymous profiles
	// },
	pros: {
		type: String,
		optional: false, },
	cons:{
		type: String,
		optional: false, },
	additionalComments: {
		type: String,
		optional: true, },
	salary: {	// WILL TALK ABOUT THIS WITH JULIAN
		//** Salary for now is only one - hourly. Dont know what type it will be
		type: String, },
	jobTitle : {			//** Same for the jobTitle - there are two categories -
		type: String,
		optional: false, },	//Line Worker and Upper Management, so type - String, perhaps, not sure

	monthsWorked: { // WILL TALK ABOUT THIS WITH JULIAN
		type: String, },
	healthAndSafety: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: false, },
	workEnvironment: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: false, },
	benefits: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional:false, },
	managerRelationship: {
		type: Number,
		min: 0, max: 5,
		decimal: true,
		optional: false, },

	//These last ones have to do with internal bookkeeping
	//and the actual "life-cycle" of the review itself, and
	//therefore do not appear on the "Write a Review" form.

	//However, this is done via autoform.omit, which may
	//prevent us from using those fields easily in legitimate
	//contexts later, so I may want to refine that feature...

	datePosted: {
		type: Date,
		optional: true,
		defaultValue: new Date(), //obviously, assumes it cannot possibly have been posted before it is posted
		autoform: {
			omit: true,
		}, },
	upvotes: {
		type: Number,
		min: 0,
		defaultValue: 0,
		optional: true,
		decimal: false,
		autoform: {
			omit: true,
		}, },
	downvotes: {
		type: Number,
		min: 0,
		defaultValue: 0,
		optional: true,
		decimal: false,
		autoform: {
			omit: true,
		}, },
	//** Each review has an array of comments attached with it.
	//** upvotes/downvotes and comments are not there in the form
	comments: {
		type: [Comments],
		autoform: {
			omit: true,
		}, },
});

// I dont think there is a need for this code. Might be wrong.
if (Meteor.isServer) {
	Meteor.publish("Reviews", function() {
		return Reviews.find({});
	});
}
