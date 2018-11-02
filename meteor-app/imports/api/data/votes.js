import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";

/*
	All the votes for everything on Vize:
	Reviews, companies, comments, anything we decide
	that users should be able to vote on, all goes here.
	What it's about is determined by the voteSubject and
	references fields.
	The actual vote is the value field: true == up, false == down
*/

export const VoteSchema = new SimpleSchema(
	{
		submittedBy: {
			// userId of the review author
			type: SimpleSchema.Integer,
			optional: false,
		},
		voteSubject: {
			type: String,
			optional: false,
			allowedValues: ["review", "comment"],
		},
		references: {
			type: SimpleSchema.Integer,
			optional: false,
		},
		value: {
			type: Boolean,
			optional: false,
		},
	},
	{ tracker: Tracker }
);
