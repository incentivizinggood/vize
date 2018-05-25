import { Votes } from "../imports/api/data/votes.js";
import i18n from "meteor/universe:i18n";

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
