import { Mongo } from "meteor/mongo";
import {Tracker} from "meteor/tracker";

//Constructor called - created new Collection named 'Reviews'
// Collection can be edited by the object Reviews
export const Reviews = new Mongo.Collection("Reviews", { idGeneration: 'MONGO'});
import {Comments} from './comments.js';


//Schema for the Collection
Reviews.schema = new SimpleSchema({
	companyID:{ 				// ** _id for the companies..will be obtained from the
		type: Mongo.ObjectId,	//company name and location fields of the reviews form.
	 	optional: false,
		index: true, },

	//** uername and screenName are not there in the MVP, reviews will be completely anonymous.
	// username: {
	//   type: String,
	//   optional: false
	// },
	// screenName: {
	//   type: String,
	//   optional: false //not sure about this, might need to change for anonymous profiles
	// },

	datePosted: {
		type: Date, },
	pros: {
		type: String, },
	cons:{
		type: String, },
	additionalComments: {
		type: String, },
	salary: {	//** Salary for now is only one - hourly. Dont know what type it will be
		type: String, },
	jobTitle : {			//** Same for the jobTitle - there are two categories -
		type: String, },	//Line Worker and Upper Management, so type - String, perhaps, not sure

	monthsWorked: {
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

	upvotes: {
		type: Number,
		min: 0, },
	downvotes: {
		type: Number,
		min: 0, },
	//** Each review has an array of comments attached with it.
	//** upvotes/downvotes and comments are not there in the form
	comments: {
		type: [Comments], },
});

// I dont think there is a need for this code. Might be wrong.
if (Meteor.isServer) {
	Meteor.publish("Reviews", function() {
		return Reviews.find({});
	});
}
