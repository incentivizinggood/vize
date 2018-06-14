import merge from "lodash.merge";
import i18n from "meteor/universe:i18n";
import { Reviews } from "../imports/api/data/reviews.js";

function setUpI18nOnSchema(schema, schemaName) {
	// Define a callback function.
	function thisSchemaSetLocale(locale) {
		// universe:i18n is designed to use incremental loading.
		// We need to add the messages of this locale in case it is a new one.
		schema.messageBox.messages({
			[locale]: merge(
				i18n.getTranslations("SimpleSchema.defaults", locale),
				i18n.getTranslations("SimpleSchema.custom", locale),
				i18n.getTranslations(
					`SimpleSchema.custom.${schemaName}`,
					locale
				)
			),
		});
		schema.messageBox.setLanguage(locale);
		schema.labels(
			i18n.getTranslations(`SimpleSchema.labels.${schemaName}`)
		);
	}
	thisSchemaSetLocale("en");
	i18n.onChangeLocale(thisSchemaSetLocale);
}

setUpI18nOnSchema(Reviews.schema, "Reviews");
