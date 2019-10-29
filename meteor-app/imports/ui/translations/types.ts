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
