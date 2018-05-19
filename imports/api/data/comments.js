import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

//AutoForm business
import { AutoForm } from "meteor/aldeed:autoform";
SimpleSchema.extendOptions(["autoform"]); // allows us to do a ton of cool stuff with forms

export const Comments = new Mongo.Collection("Comments", {
	idGeneration: "MONGO",
});

Comments.schema = new SimpleSchema({
	username: {
		type: String,
		optional: false,
	},
	screenName: {
		type: String,
		optional: false,
	},
	//might need to change the screenName 'optional:true' for anonymous profiles
	datePosted: {
		type: Date,
		optional: true,
	},
	content: {
		type: String,
		optional: false,
	},
	//** Unsure if the comments will have upvotes and downvotes as well
	//** most probably no, so, might want to delete them.
	upvotes: {
		type: Number,
		defaultValue: 0,
	},
	downvotes: {
		type: Number,
		defaultValue: 0,
	},
});

Comments.deny({
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
	Meteor.publish("Comments", function() {
		return Comments.find({});
	});
}
