import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { Reviews } from "./reviews.js";

/*
	All the votes for everything on Vize:
	Reviews, companies, comments, anything we decide
	that users should be able to vote on, all goes here.
	What it's about is determined by the voteSubject and
	references fields.
	The actual vote is the value field: true == up, false == down
*/

export const Votes = new Mongo.Collection("Votes", { idGeneration: "STRING" });

Votes.schema = new SimpleSchema(
	{
		_id: {
			type: String,
			optional: true,
			denyUpdate: true,
			autoValue: new Meteor.Collection.ObjectID(), // forces a correct value
		},
		submittedBy: {
			// userId of the review author
			type: String,
			index: true,
			denyUpdate: true,
			optional: false,
		},
		voteSubject: {
			type: String,
			index: true,
			optional: false,
			allowedValues: ["review", "comment"],
		},
		references: {
			type: String,
			index: true,
			optional: false,
		},
		value: {
			type: Boolean,
			optional: false,
		},
	},
	{ tracker: Tracker }
);

Votes.schema.labels({
	_id: i18n.__("SimpleSchema.labels.Votes._id"),
	submittedBy: i18n.__("SimpleSchema.labels.Votes.submittedBy"),
	voteSubject: i18n.__("SimpleSchema.labels.Votes.voteSubject"),
	references: i18n.__("SimpleSchema.labels.Votes.references"),
	value: i18n.__("SimpleSchema.labels.Votes.value"),
});

Votes.attachSchema(Votes.schema, { replace: true });

Votes.deny({
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
	Meteor.publish("Votes", function() {
		return Votes.find({});
	});
}
