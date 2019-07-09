import React from "react";

import { i18n } from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";

type Renderer<Msg> = (message: Msg) => JSX.Element;

type TranslationComponentProps<Msg> = Msg extends (args: infer A) => infer R
	? { renderer?: Renderer<R> } & A
	: { renderer?: Renderer<Msg> };

type TranslationComponent<Msg> = React.ComponentType<
	TranslationComponentProps<Msg>
>;

type TranslationComponents<Msgs> = {
	[P in keyof Msgs]: Msgs[P] extends ((a: any) => any) | JSX.Element
		? TranslationComponent<Msgs[P]>
		: Msgs[P] extends Record<string, any>
		? TranslationComponent<Msgs[P]> & TranslationComponents<Msgs[P]>
		: TranslationComponent<Msgs[P]>
};

/**
 * Made translation components for each message in a collection of translations.
 */
function makeTranslationComponents<Msgs>(
	translations: Record<string, Msgs>
): TranslationComponents<Msgs> {
	// Pick a locale to use as the "default translations". This is only used for
	// computing the message paths and has no effect on how what is used as a
	// default locale in other places.
	const defaultTranslation = Object.values(translations)[0];

	function makeTranslationComponent(getMessage: (msgs: Msgs) => any) {
		// A component that renders a different thing for each locale.
		const TranslationComponent: any = withUpdateOnChangeLocale(
			({ renderer, ...args }: any) => {
				// Get the version of the message that is for the current locale.
				const locale = i18n.getLocale();
				let message = getMessage(translations[locale]);

				// Messages can be functions of the translation component's props.
				if (typeof message === "function") {
					message = message(args);
				}

				// Translation components may be given a custom renderer to use.
				// This is mainly ment for where some props of a component need
				// to be translated but not the whole component.
				if (typeof renderer === "function") {
					return renderer(message);
				} else if (renderer !== undefined) {
					console.error(
						"The renderer prop of a translation component must be a function."
					);
				}

				return message;
			}
		);

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
					msgs => getMessage(msgs)[k]
				);
			}
		}

		return TranslationComponent;
	}

	return makeTranslationComponent(x => x);
}

export default makeTranslationComponents;
