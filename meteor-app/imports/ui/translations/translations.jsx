import React from "react";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import { getAtPath, joinPaths } from "/imports/lib/property-path.ts";

/**
 * Made translation components for each message in a collection of translations.
 */
function makeTranslationComponents(translations) {
	// Pick a locale to use as the "default translations". This is only used for
	// computing the message paths and has no effect on how what is used as a
	// default locale in other places.
	const defaultTranslation = Object.values(translations)[0];

	function makeTranslationComponent(messagePath) {
		// A component that renders a different thing for each locale.
		const TranslationComponent = withUpdateOnChangeLocale(
			({ renderer, ...args }) => {
				// Get the version of the message that is for the current locale.
				const locale = i18n.getLocale();
				let message = getAtPath(translations[locale], messagePath);

				// Messages can be functions of the translation component's props.
				if (typeof message === "function") {
					message = message(args);
				}

				// Translation components may be given a custom renderer to use.
				// This is mainly ment for where some props of a component need
				// to be translated but not the whole component.
				if (typeof renderer === "function") {
					return renderer(message);
				} else if (renderer instanceof React.Component) {
					return React.createElement(renderer, message);
				} else if (renderer !== undefined) {
					console.error(
						"The renderer prop of a translation component must be a function or a React.Component."
					);
				}

				return message;
			}
		);

		// If the message is an object but not a React element (i.e. a group of
		// other messages), we recursivly make translation components for all of
		// its properties.
		const message = getAtPath(defaultTranslation, messagePath);
		if (
			message != null &&
			typeof message === "object" &&
			!React.isValidElement(message)
		) {
			Object.keys(message).forEach(k => {
				TranslationComponent[k] = makeTranslationComponent(
					joinPaths(messagePath, k)
				);
			});
		}

		return TranslationComponent;
	}

	return makeTranslationComponent("");
}

export default makeTranslationComponents;
