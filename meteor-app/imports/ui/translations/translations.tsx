import React from "react";

import { LocaleContext } from "imports/ui/startup/i18n";

import { TranslationNode } from "./types";

/**
 * Made translation components for each message in a collection of translations.
 */
function makeTranslationComponents<RootMessage>(
	translations: Record<string, RootMessage>
): TranslationNode<RootMessage> {
	// Note: The implimentation of this function requiers more complex typing
	// than TypeScript supports. Therefore, we must use the "any" type in some
	// places.

	// Pick a locale to use as the "default translations". This is only used for
	// computing the message paths and has no effect on what is used as a
	// default locale in other places.
	const defaultTranslation = Object.values(translations)[0];

	function makeTranslationComponent(
		getMessage: (rootMessage: RootMessage) => any
	) {
		// A component that renders a different thing for each locale.
		const TranslationComponent: any = ({ renderer, ...args }: any) => {
			// Get the version of the message that is for the current locale.
			const locale = React.useContext(LocaleContext);
			let message = getMessage(translations[locale]);

			// Messages can be functions of the translation component's props.
			if (typeof message === "function") {
				message = message(args);
			}

			// Translation components may be given a custom renderer to use.
			// This is mainly meant for where some props of a component need
			// to be translated but not the whole component.
			if (typeof renderer === "function") {
				return renderer(message);
			} else if (renderer !== undefined) {
				console.error(
					"The renderer prop of a translation component must be a function."
				);
			}

			return message;
		};

		// If the message is an object but not a React element (i.e. a group of
		// other messages), we recursively make translation components for all
		// of its properties.
		const message = getMessage(defaultTranslation);
		if (
			message != null &&
			typeof message === "object" &&
			!React.isValidElement(message)
		) {
			for (const k of Object.keys(message)) {
				TranslationComponent[k] = makeTranslationComponent(
					rootMessage => getMessage(rootMessage)[k]
				);
			}
		}

		return TranslationComponent;
	}

	return makeTranslationComponent(x => x);
}

export default makeTranslationComponents;
