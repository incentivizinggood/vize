import { Reviews } from "../imports/api/data/reviews.js";
import i18n from "meteor/universe:i18n";

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

if (Meteor.isDevelopment) {
	console.log(Meteor.isServer ? "SERVER env" : "CLIENT env");
	console.log(process.env.UNIVERSE_I18N_LOCALES);
	console.log("english review error messages");
	console.log(englishReviews);
	console.log("spanish review error messages");
	console.log(spanishReviews);
}
Reviews.schema.labels(i18n.getTranslations("SimpleSchema.labels.Reviews"));

Reviews.schema.messageBox.messages({
	en: englishReviews,
	es: spanishReviews,
});

i18n.onChangeLocale(function(newLocale) {
	if (Meteor.isDevelopment) console.log("REVIEWS: " + newLocale);
	// console.log("REVIEWS: " + newLocale);
	Reviews.schema.messageBox.setLanguage(newLocale);
	Reviews.schema.labels(i18n.getTranslations("SimpleSchema.labels.Reviews"));
});
