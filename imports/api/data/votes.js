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

const voteLabels = function() {
	return {
		_id: i18n.__("SimpleSchema.labels.Votes._id", {
			_locale: i18n.getLocale(),
		}),
		submittedBy: i18n.__("SimpleSchema.labels.Votes.submittedBy", {
			_locale: i18n.getLocale(),
		}),
		voteSubject: i18n.__("SimpleSchema.labels.Votes.voteSubject", {
			_locale: i18n.getLocale(),
		}),
		references: i18n.__("SimpleSchema.labels.Votes.references", {
			_locale: i18n.getLocale(),
		}),
		value: i18n.__("SimpleSchema.labels.Votes.value", {
			_locale: i18n.getLocale(),
		}),
	};
};

Votes.schema.labels(voteLabels());

i18n.onChangeLocale(function(newLocale) {
	if (Meteor.isDevelopment) console.log("VOTES: " + newLocale);
	Votes.schema.labels(voteLabels());
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
