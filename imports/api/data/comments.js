import { Mongo } from "meteor/mongo";

export const Comments = new Mongo.Collection("Comments", { idGeneration: 'MONGO'});

Comments.schema = new SimpleSchema({
	username: {
		type: String,
		optional: false, },
	screenName: {
		type: String,
		optional: false, },
	//might need to change the screenName 'optional:true' for anonymous profiles
	datePosted: {
		type: Date,
		optional: true, },
	content: {
		type: String,
		optional: false, },
	//** Unsure if the comments will have upvotes and downvotes as well
	//** most probably no, so, might want to delete them.
	upvotes : {
		type: Number,
		defaultValue: 0, },
	downvotes: {
		type: Number,
		defaultValue: 0, }
});
