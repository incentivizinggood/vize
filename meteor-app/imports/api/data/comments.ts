import SimpleSchema from "simpl-schema";
import { AutoForm } from "meteor/aldeed:autoform";

SimpleSchema.extendOptions(["autoform"]); // allows us to do a ton of cool stuff with forms

const CommentSchema = new SimpleSchema({
	_id: {
		type: SimpleSchema.Integer,
		optional: false,
		autoform: {
			omit: true,
		},
	},
	submittedBy: {
		type: SimpleSchema.Integer,
		optional: false,
		autoform: {
			omit: true,
		},
	},
	refersto: {
		type: SimpleSchema.Integer,
		optional: false,
		autoform: {
			omit: true,
		},
	},
	datePosted: {
		type: Date,
		optional: true,
		autoform: {
			omit: true,
		},
	},
	content: {
		type: String,
		optional: false,
	},
	//* * Unsure if the comments will have upvotes and downvotes as well
	//* * most probably no, so, might want to delete them.
	upvotes: {
		type: Number,
		defaultValue: 0,
	},
	downvotes: {
		type: Number,
		defaultValue: 0,
	},
	username: {
		type: String,
		optional: true,
		autoform: {
			omit: true,
		},
	},
	screenName: {
		type: String,
		optional: true,
		autoform: {
			omit: true,
		},
	},
	// might need to change the screenName 'optional:true' for anonymous profiles
});
