import { Mongo } from "meteor/mongo";
import { Comments } from './comments.js';
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";
SimpleSchema.extendOptions(["autoform"]); // gives us the "autoform" schema option

String.prototype.wordCount = function(){
	return this.split(/\s+\b/).length;
};

//Constructor called - created new Collection named 'Reviews'
// Collection can be edited by the object Reviews
export const Reviews = new Mongo.Collection("Reviews", { idGeneration: 'MONGO'});

/*
	Desirable features:
	- Drop-down list of known companies to choose from
		- List gets refined or even auto-filled as user types
	- ...ditto for locations, especially once company name is known
	- LOL these are all things that go with the form,
		not the schema, silly me...
*/

//Schema for the Collection
const reviewsSchema = new SimpleSchema({
	companyName: {		//Filled in by user, or auto-filled by form, but in any
		type: String,	//case, company names are indexed so we may as well use
	 	optional: false,//use this instead of companyID
		index: true, },

	// BUG will eventually need a username, screenname, or userID to
	// tie reviews to users for the sake of logic and validation, but
	// that's tough to do now

	reviewTitle: { //title of the review
		type: String,
		optional: false,
		index: true, },
	//Pretty much copy-pasted from companies.js
	locations: { //where they worked for the company being reviewed
		type: Array,
		minCount: 1, //must have at least one
 		optional: false, },
	'locations.$': { //restraints on members of the "locations" array
		type: String, }, //more refined address-checking or validation? dunno, I don't see the need for it immediately
	jobTitle : {			//there are two categories -
		type: String,		//Line Worker and Upper Management, so type - String, perhaps, not sure
		optional: false, },	//NOTE: I can do this, but is it correct/necessary?
	dateJoinedCompany: {
		type: Date,
		optional: false, },
	dateLeftCompany: { //need to remind user that they can leave this empty if still employed
		type: Date,
		optional: true, },
	pros: {
		type: String,
		optional: false,
		custom: function() {
			if (Meteor.isClient && this.isSet) {
				Meteor.call("hasFiveWords", this.value, (error, result) => {
					if (!result) {
						console.log("needsFiveWords");
						this.validationContext.addValidationErrors([{
							name: "pros",
							type: "needsFiveWords",
						}]);
					}
				});
			}
			else if(Meteor.isServer && this.isSet) {
				if(this.value.wordCount() < 5) {
					return "needsFiveWords";
				}
			}
		}, },
	cons: {
		type: String,
		optional: false,
		custom: function() {
			if (Meteor.isClient && this.isSet ) {
				Meteor.call("hasFiveWords", this.value, (error, result) => {
					if (!result) {
						this.validationContext.addValidationErrors([{
							name: "cons",
							type: "needsFiveWords",
						}]);
					}
				});
			}
			else if(Meteor.isServer && this.isSet) {
				if(this.value.wordCount() < 5) {
					return "needsFiveWords";
				}
			}
		}, },
	wouldRecommendToOtherJobSeekers: {
		type: Boolean,
		optional: false,
		defaultValue: false, },

	/*
		We're eventually going to remove the
		defaultValue's and force the user to input them,
		this is just easier for testing right now.
	*/
	healthAndSafety: {
		type: Number,
		min: 0, max: 5,
		optional: false,
	 	defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	managerRelationship: { //"manager relationship", in case that isn't clear...
		type: Number,
		min: 0, max: 5,
		optional: false,
		defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	workEnvironment: {
		type: Number,
		min: 0, max: 5,
		optional: false,
		defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	benefits: {
		type: Number,
		min: 0, max: 5,
		optional: false,
	 	defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	overallSatisfaction: {
		type: Number,
		min: 0, max: 5,
		optional: false,
	 	defaultValue: 0,
		autoform: {
			omit: true,
		}, },
	additionalComments: { //need to make sure this displays a nice box
		type: String,
		optional: true,
		autoform: {
			afFieldInput: {
				type: "textarea",
				rows: 6,
			},
		}, },

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
		type: SimpleSchema.Integer,
		min: 0,
		defaultValue: 0,
		optional: true,
		autoform: {
			omit: true,
		}, },
	downvotes: {
		type: SimpleSchema.Integer,
		min: 0,
		defaultValue: 0,
		optional: true,
		autoform: {
			omit: true,
		}, },
	//** Each review has an array of comments attached with it.
	//** upvotes/downvotes and comments are not there in the form
	comments: {
		type: Array,
		optional: true,
		defaultValue: [],
		autoform: {
			omit: true,
		}, },
	'comments.$': {
		type: Object,
		custom() {
			Comments.schema.validate(this);
		}, }, //Custom validation with an external schema,
		//not sure if this works for now but it at least
		//reminds me of generally what needs to be done here.
}, { tracker: Tracker } );

reviewsSchema.messageBox.messages({
	//en? does that mean we can add internationalization
	//in this block of code?
	en: {
		needsFiveWords: "You should write at least 5 words in this field",
	},
});

Reviews.attachSchema(reviewsSchema, { replace: true });

// I dont think there is a needed for this code. Might be wrong.
if (Meteor.isServer) {
	Meteor.publish("Reviews", function() {
		return Reviews.find({});
	});
}
