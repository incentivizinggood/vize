import { Mongo } from "meteor/mongo";
import { Comments } from "./comments.js";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";
import { Companies } from "./companies.js";
import i18n from "meteor/universe:i18n";

SimpleSchema.extendOptions(["autoform"]); // gives us the "autoform" schema option

// Stole this code from an answer to a StackOverflow question,
// to use for validating pros and cons (which must have >= 5 words each),
// not sure how good of a long-term solution it is but it seems fine for now.
// https://stackoverflow.com/questions/6543917/count-number-of-words-in-string-using-javascript

String.prototype.wordCount = function() {
	return this.split(/\s+\b/).length;
};

// Constructor called - created new Collection named 'Reviews'
// Collection can be edited by the object Reviews
export const Reviews = new Mongo.Collection("Reviews", {
	idGeneration: "STRING",
});

/*
	Desirable features:
	- Drop-down list of known companies to choose from
		- List gets refined or even auto-filled as user types
	- ...ditto for locations, especially once company name is known
	- LOL these are all things that go with the form,
		not the schema, silly me
	- Unless I can configure allowedValues dynamically...
*/

// Schema for the Collection
Reviews.schema = new SimpleSchema(
	{
		_id: {
			type: String,
			optional: true,
			denyUpdate: true,
			autoValue: new Meteor.Collection.ObjectID(), // forces a correct value
			autoform: {
				omit: true,
			},
		},
		submittedBy: {
			// userId of the review author
			type: String,
			optional: true,
			denyUpdate: true,
			autoValue() {
				if (Meteor.isServer) {
					// userId is not normally part of the autoValue "this" context, but the collection2 package adds it automatically
					return this.userId;
				}
			},
			autoform: {
				omit: true,
			},
		},
		companyName: {
			// Filled in by user, or auto-filled by form, but in any
			type: String, // case, company names are indexed so we may as well use
			optional: false, // use this instead of companyID
			max: 100,
			index: true,
			custom() {
				if (Meteor.isClient && this.isSet) {
					Meteor.call(
						"companies.isNotSessionError",
						this.value,
						(error, result) => {
							if (!result) {
								this.validationContext.addValidationErrors([
									{
										name: "companyName",
										type: "sessionError",
									},
								]);
							}
						}
					);
				} else if (Meteor.isServer && this.isSet) {
					if (
						this.value ===
							i18n.__("common.forms.companyNotFound") ||
						this.value === i18n.__("common.forms.pleaseWait")
					) {
						return "sessionError";
					}
				}
			},
			/*
			After working so hard to get this right,
			here is why I have removed this custom validator:
			There is no way to skip custom validation. However,
			frontend wanted the insertion form to allow users
			to skip this step under certain circumstances. This
			would have been a cause for concern, except in the
			other circumstances this field is auto-filled from
			the collection and set to read-only. There thus
			seems to be no use case for this check. But I worked
			hard on it, so here it is in case I ever need to
			refer back to its code, or even use it again in the
			project, perhaps for testing.
		*/
			// custom: function() {
			// 	if (Meteor.isClient && this.isSet) {
			// 		Meteor.call("companies.doesCompanyExist", this.value, (error, result) => {
			// 			if (!result) {
			// 				this.validationContext.addValidationErrors([{
			// 					name: "companyName",
			// 					type: "noCompanyWithThatName",
			// 				}]);
			// 			}
			// 		});
			// 	}
			// 	else if (Meteor.isServer && this.isSet) {
			// 		if(!Companies.hasEntry(this.value)) {
			// 			return "noCompanyWithThatName";
			// 		}
			// 	}
			// },
		},
		companyId: {
			type: String,
			optional: true,
			denyUpdate: true, // Yes, the company might be "created" at some point, but then we should update this field by Mongo scripting, not with JS code
			index: true,
			autoValue() {
				if (Meteor.isServer && this.field("companyName").isSet) {
					const company = Companies.findOne({
						name: this.field("companyName").value,
					});
					if (company !== undefined) {
						return company._id;
					}
					return "This company does not have a Vize profile yet";
				}
			},
			autoform: {
				omit: true,
			},
		},

		// BUG will eventually need a username, screenname, or userID to
		// tie reviews to users for the sake of logic and validation, but
		// that's tough to do now
		// -> NOT REALLY, this information can be stored with the user
		//		and queried when needed

		reviewTitle: {
			// title of the review
			type: String,
			optional: false,
			max: 100,
			index: true,
		},
		// Pretty much copy-pasted from companies.js
		locations: {
			// where they worked for the company being reviewed
			type: Array,
			minCount: 1, // must have at least one
			optional: false,
		},
		"locations.$": {
			// restraints on members of the "locations" array
			type: String,
			max: 150,
		}, // more refined address-checking or validation? dunno, I don't see the need for it immediately
		jobTitle: {
			// there are two categories -
			type: String, // Line Worker and Upper Management, so type - String, perhaps, not sure
			max: 100,
			optional: false,
		}, // NOTE: I can do this, but is it correct/necessary?
		numberOfMonthsWorked: {
			type: SimpleSchema.Integer,
			optional: false,
			min: 0,
		},
		pros: {
			type: String,
			optional: false,
			max: 200,
			custom() {
				if (Meteor.isClient && this.isSet) {
					Meteor.call("hasFiveWords", this.value, (error, result) => {
						if (!result) {
							this.validationContext.addValidationErrors([
								{
									name: "pros",
									type: "needsFiveWords",
								},
							]);
						}
					});
				} else if (Meteor.isServer && this.isSet) {
					if (this.value.wordCount() < 5) {
						return "needsFiveWords";
					}
				}
			},
		},
		cons: {
			type: String,
			optional: false,
			max: 200,
			custom() {
				if (Meteor.isClient && this.isSet) {
					Meteor.call("hasFiveWords", this.value, (error, result) => {
						if (!result) {
							this.validationContext.addValidationErrors([
								{
									name: "cons",
									type: "needsFiveWords",
								},
							]);
						}
					});
				} else if (Meteor.isServer && this.isSet) {
					if (this.value.wordCount() < 5) {
						return "needsFiveWords";
					}
				}
			},
		},
		wouldRecommendToOtherJobSeekers: {
			type: Boolean,
			optional: false,
			defaultValue: false,
			autoform: {
				type: "boolean-radios",
				trueLabel: "Yes",
				falseLabel: "No",
			},
		},

		/*
		We're eventually going to remove the
		defaultValue's and force the user to input them,
		this is just easier for testing right now.
	*/
		healthAndSafety: {
			type: Number,
			min: 0,
			max: 5,
			optional: false,
			autoform: {
				// only possible because I added the starRating type
				// to AutoForm, see afInputStarRating.[js,html]
				type: "starRating",
			},
		},
		managerRelationship: {
			type: Number,
			min: 0,
			max: 5,
			optional: false,
			autoform: {
				type: "starRating",
			},
		},
		workEnvironment: {
			type: Number,
			min: 0,
			max: 5,
			optional: false,
			autoform: {
				type: "starRating",
			},
		},
		benefits: {
			type: Number,
			min: 0,
			max: 5,
			optional: false,
			autoform: {
				type: "starRating",
			},
		},
		overallSatisfaction: {
			type: Number,
			min: 0,
			max: 5,
			optional: false,
			autoform: {
				type: "starRating",
			},
		},
		additionalComments: {
			type: String,
			optional: true,
			max: 6000,
			autoform: {
				afFieldInput: {
					type: "textarea",
					rows: 6,
				},
			},
		},

		// These last ones have to do with internal bookkeeping
		// and the actual "life-cycle" of the review itself, and
		// therefore do not appear on the "Write a Review" form.
		// However, this is done via autoform.omit, which may
		// prevent us from using those fields easily in legitimate
		// contexts later, so I may want to refine that feature...

		datePosted: {
			type: Date,
			optional: true,
			denyUpdate: true,
			defaultValue: new Date(), // obviously, assumes it cannot possibly have been posted before it is posted
			autoform: {
				omit: true,
			},
		},
		upvotes: {
			type: SimpleSchema.Integer,
			min: 0,
			defaultValue: 0,
			optional: true,
			autoform: {
				omit: true,
			},
		},
		downvotes: {
			type: SimpleSchema.Integer,
			min: 0,
			defaultValue: 0,
			optional: true,
			autoform: {
				omit: true,
			},
		},
		//* * Each review has an array of comments attached with it.
		//* * upvotes/downvotes and comments are not there in the form
		Comments: {
			type: Array,
			optional: true,
			defaultValue: [],
			autoform: {
				omit: true,
			},
		},
		"Comments.$": {
			type: Object,
			custom() {
				Comments.schema.validate(this);
			},
		}, // Custom validation with an external schema,
		// not sure if this works for now but it at least
		// reminds me of generally what needs to be done here.
	},
	{ tracker: Tracker }
);

const reviewLabels = function() {
	return {
		_id: i18n.__("SimpleSchema.labels.Reviews._id", {
			_locale: i18n.getLocale(),
		}),
		submittedBy: i18n.__("SimpleSchema.labels.Reviews.submittedBy", {
			_locale: i18n.getLocale(),
		}),
		companyName: i18n.__("SimpleSchema.labels.Reviews.companyName", {
			_locale: i18n.getLocale(),
		}),
		companyId: i18n.__("SimpleSchema.labels.Reviews.companyId", {
			_locale: i18n.getLocale(),
		}),
		reviewTitle: i18n.__("SimpleSchema.labels.Reviews.reviewTitle", {
			_locale: i18n.getLocale(),
		}),
		locations: i18n.__("SimpleSchema.labels.Reviews.locations", {
			_locale: i18n.getLocale(),
		}),
		jobTitle: i18n.__("SimpleSchema.labels.Reviews.jobTitle", {
			_locale: i18n.getLocale(),
		}),
		numberOfMonthsWorked: i18n.__(
			"SimpleSchema.labels.Reviews.numberOfMonthsWorked",
			{ _locale: i18n.getLocale() }
		),
		pros: i18n.__("SimpleSchema.labels.Reviews.pros", {
			_locale: i18n.getLocale(),
		}),
		cons: i18n.__("SimpleSchema.labels.Reviews.cons", {
			_locale: i18n.getLocale(),
		}),
		wouldRecommendToOtherJobSeekers: i18n.__(
			"SimpleSchema.labels.Reviews.wouldRecommendToOtherJobSeekers",
			{ _locale: i18n.getLocale() }
		),
		healthAndSafety: i18n.__(
			"SimpleSchema.labels.Reviews.healthAndSafety",
			{
				_locale: i18n.getLocale(),
			}
		),
		managerRelationship: i18n.__(
			"SimpleSchema.labels.Reviews.managerRelationship",
			{ _locale: i18n.getLocale() }
		),
		workEnvironment: i18n.__(
			"SimpleSchema.labels.Reviews.workEnvironment",
			{
				_locale: i18n.getLocale(),
			}
		),
		benefits: i18n.__("SimpleSchema.labels.Reviews.benefits", {
			_locale: i18n.getLocale(),
		}),
		overallSatisfaction: i18n.__(
			"SimpleSchema.labels.Reviews.overallSatisfaction",
			{ _locale: i18n.getLocale() }
		),
		additionalComments: i18n.__(
			"SimpleSchema.labels.Reviews.additionalComments",
			{ _locale: i18n.getLocale() }
		),
		datePosted: i18n.__("SimpleSchema.labels.Reviews.datePosted", {
			_locale: i18n.getLocale(),
		}),
		upvotes: i18n.__("SimpleSchema.labels.Reviews.upvotes", {
			_locale: i18n.getLocale(),
		}),
		downvotes: i18n.__("SimpleSchema.labels.Reviews.downvotes", {
			_locale: i18n.getLocale(),
		}),
	};
};

const reviewErrorMessages = function(locale) {
	return {
		needsFiveWords: i18n.__("SimpleSchema.custom.Reviews.needsFiveWords", {
			_locale: locale,
		}),
		noCompanyWithThatName: i18n.__(
			"SimpleSchema.custom.noCompanyWithThatName",
			{ _locale: locale }
		),
		sessionError: i18n.__("SimpleSchema.custom.sessionError", {
			_locale: locale,
		}),
	};
};

const englishReviews = reviewErrorMessages("en");
const spanishReviews = reviewErrorMessages("es");

Reviews.schema.labels(reviewLabels());

Reviews.schema.messageBox.messages({
	en: englishReviews,
	es: spanishReviews,
});

i18n.onChangeLocale(function(newLocale) {
	if (Meteor.isDevelopment) console.log("REVIEWS: " + newLocale);
	Reviews.schema.messageBox.setLanguage(newLocale);
	Reviews.schema.labels(reviewLabels());
});

Reviews.attachSchema(Reviews.schema, { replace: true });

Reviews.deny({
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
	Meteor.publish("Reviews", function() {
		return Reviews.find({});
	});
}
