import * as React from "react";

type Renderer<Msg> = ((message: Msg) => JSX.Element) | React.Component<Msg>;

type TranslationComponentProps<Msg> = Msg extends (args: infer A) => infer R
	? { renderer?: Renderer<R> } & A
	: { renderer?: Renderer<Msg> };

type TranslationComponent<Msg> = React.Component<
	TranslationComponentProps<Msg>
>;

type TranslationComponents<Msgs> = {
	[P in keyof Msgs]: Msgs[P] extends Record<string, any>
		? TranslationComponent<Msgs[P]> & TranslationComponents<Msgs[P]>
		: TranslationComponent<Msgs[P]>
};

declare function makeTranslationComponents<Msgs>(
	translations: Record<string, Msgs>
): TranslationComponents<Msgs>;

export default makeTranslationComponents;
