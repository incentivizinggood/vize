import { Reviews } from "../imports/api/data/reviews.js";
import i18n from "meteor/universe:i18n";

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

//if (Meteor.isDevelopment) {
console.log("english review error messages");
console.log(englishReviews);
console.log("spanish review error messages");
console.log(spanishReviews);
//}
Reviews.schema.labels(reviewLabels());

Reviews.schema.messageBox.messages({
	en: englishReviews,
	es: spanishReviews,
});

i18n.onChangeLocale(function(newLocale) {
	// if (Meteor.isDevelopment) console.log("REVIEWS: " + newLocale);
	console.log("REVIEWS: " + newLocale);
	Reviews.schema.messageBox.setLanguage(newLocale);
	Reviews.schema.labels(reviewLabels());
});
