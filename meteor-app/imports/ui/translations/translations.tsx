import React from "react";

import { i18n } from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";

export type Renderer<Message> = (message: Message) => JSX.Element;

export type TranslationComponentProps<Message> = Message extends (
	args: infer Args
) => infer Result
	? { renderer?: Renderer<Result> } & Args
	: { renderer?: Renderer<Message> };

/** A component that renders a different thing for each locale. */
export type TranslationComponent<Message> = React.ComponentType<
	TranslationComponentProps<Message>
>;

/** TranslationNodes may have children nodes. This occures when the node's
 * message is an Record, but not a function or a JSX.Element.
 */
export type TranslationChildren<Message> = Message extends
	| ((args: any) => any)
	| JSX.Element
	? void
	: Message extends Record<any, any>
	? {
			[P in keyof Message]: TranslationNode<Message[P]>;
	  }
	: void;

/**
 * Part of a tree of translations. Is a translation component and may have children.
 */
export type TranslationNode<Message> = TranslationComponent<Message> &
	TranslationChildren<Message>;

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
		const translationComponent: any = withUpdateOnChangeLocale(
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
				translationComponent[k] = makeTranslationComponent(
					rootMessage => getMessage(rootMessage)[k]
				);
			}
		}

		return translationComponent;
	}

	return makeTranslationComponent(x => x);
}

export default makeTranslationComponents;
