import { Meteor } from "meteor/meteor";
import { CommentSchema } from "./comments";
import SimpleSchema from "simpl-schema";
import { Tracker } from "meteor/tracker";
import { AutoForm } from "meteor/aldeed:autoform";

SimpleSchema.extendOptions(["autoform"]); // gives us the "autoform" schema option

// Stole this code from an answer to a StackOverflow question,
// to use for validating pros and cons (which must have >= 5 words each),
// not sure how good of a long-term solution it is but it seems fine for now.
// https://stackoverflow.com/questions/6543917/count-number-of-words-in-string-using-javascript

String.prototype.wordCount = function() {
	return this.split(/\s+\b/).length;
};

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
export const ReviewSchema = new SimpleSchema(
	{
		_id: {
			type: SimpleSchema.Integer,
			optional: true,
			autoform: {
				omit: true,
			},
		},
		submittedBy: {
			// userId of the review author
			type: SimpleSchema.Integer,
			optional: true,
			autoform: {
				omit: true,
			},
		},
		companyName: {
			// Filled in by user, or auto-filled by form, but in any
			type: String, // case, company names are indexed so we may as well use
			optional: false, // use this instead of companyID
			max: 100,
			custom() {
				if (this.isSet) {
					if (Meteor.isClient) {
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
								} else if (!this.isNotASubmission) {
									/*
									So this else-if is the result of needing to
									distinguish between validation contexts but
									not being able to figure out how to extend
									the context from an AutoForm.
									!isNotASubmission means basically isASubmission,
									and code that needs to validate review objects
									for format only rather than for database
									consistency can pass the following object as
									the second argument to to validationContext.validate
									in order to disable the next check:
									{
										extendedCustomContext: {
											isNotASubmission: true
										}
									}
								*/
									Meteor.call(
										"reviews.checkForSecondReviewByUser",
										this.value,
										(error2, result2) => {
											if (!result2) {
												this.validationContext.addValidationErrors(
													[
														{
															name: "companyName",
															type:
																"secondReviewByUser",
														},
													]
												);
											}
										}
									);
								}
							}
						);
					} else if (Meteor.isServer) {
						if (
							!Meteor.call(
								"companies.isNotSessionError",
								this.value
							)
						)
							return "sessionError";
						else if (
							!this.isNotASubmission &&
							!Meteor.call(
								"reviews.checkForSecondReviewByUser",
								this.value
							)
						)
							return "secondReviewByUser";
					}
				}
			},
		},
		companyId: {
			type: SimpleSchema.Integer,
			optional: true,
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
		},
		location: {
			// where they worked for the company being reviewed
			type: Object,
			optional: false,
			autoform: {
				type: "location",
			},
		}, // more refined address-checking or validation? dunno, I don't see the need for it immediately
		"location.city": {
			type: String,
			max: 300,
			optional: false,
		},
		"location.address": {
			type: String,
			max: 300,
			optional: true,
		},
		"location.industrialHub": {
			type: String,
			max: 300,
			optional: true,
		},
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
			max: 600,
			autoform: {
				afFieldInput: {
					type: "textarea",
					rows: 6,
				},
			},
			custom() {
				if (this.isSet) {
					if (Meteor.isClient) {
						Meteor.call(
							"hasFiveWords",
							this.value,
							(error, result) => {
								if (!result) {
									this.validationContext.addValidationErrors([
										{
											name: "pros",
											type: "needsFiveWords",
										},
									]);
								}
							}
						);
					} else if (Meteor.isServer) {
						if (!Meteor.call("hasFiveWords", this.value))
							return "needsFiveWords";
					}
				}
			},
		},
		cons: {
			type: String,
			optional: false,
			max: 600,
			autoform: {
				afFieldInput: {
					type: "textarea",
					rows: 6,
				},
			},
			custom() {
				if (this.isSet) {
					if (Meteor.isClient) {
						Meteor.call(
							"hasFiveWords",
							this.value,
							(error, result) => {
								if (!result) {
									this.validationContext.addValidationErrors([
										{
											name: "cons",
											type: "needsFiveWords",
										},
									]);
								}
							}
						);
					} else if (Meteor.isServer) {
						if (!Meteor.call("hasFiveWords", this.value))
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
				CommentSchema.validate(this);
			},
		}, // Custom validation with an external schema,
		// not sure if this works for now but it at least
		// reminds me of generally what needs to be done here.
	},
	{ tracker: Tracker }
);
