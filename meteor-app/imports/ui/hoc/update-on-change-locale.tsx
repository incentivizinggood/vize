import React from "react";

import { i18n } from "meteor/universe:i18n";

// Ask to be updated "reactively" when the locale changed.
// universe:i18n cannot be trusted to do that automaticaly.
export default function withUpdateOnChangeLocale<OuterProps>(
	WrappedComponent: React.ComponentType<OuterProps>
): React.ComponentType<OuterProps> {
	return class extends React.Component<OuterProps> {
		i18nInvalidate?: () => void;

		componentDidMount() {
			// Register a callback.
			// We use an arrow function to capture `this`.
			this.i18nInvalidate = () => this.forceUpdate();
			i18n.onChangeLocale(this.i18nInvalidate);
		}

		componentWillUnmount() {
			// Unregister the callback to avoid leaks.
			i18n.offChangeLocale(this.i18nInvalidate);
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
}
