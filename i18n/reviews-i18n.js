import merge from "lodash.merge";
import i18n from "meteor/universe:i18n";
import { Reviews } from "../imports/api/data/reviews.js";

const reviewErrorMessages = locale => ({
	[locale]: merge(
		i18n.getTranslations("SimpleSchema.custom", locale),
		i18n.getTranslations("SimpleSchema.custom.Reviews", locale)
	),
});

Reviews.schema.messageBox.messages(reviewErrorMessages("en"));
Reviews.schema.messageBox.setLanguage("en");
Reviews.schema.labels(i18n.getTranslations("SimpleSchema.labels.Reviews"));

i18n.onChangeLocale(function(newLocale) {
	if (Meteor.isDevelopment) console.log("REVIEWS: " + newLocale);
	// console.log("REVIEWS: " + newLocale);
	console.log(reviewErrorMessages(newLocale));
	Reviews.schema.messageBox.messages(reviewErrorMessages(newLocale));
	Reviews.schema.messageBox.setLanguage(newLocale);
	Reviews.schema.labels(i18n.getTranslations("SimpleSchema.labels.Reviews"));
});
