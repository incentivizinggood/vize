import React from "react";

import i18n from "meteor/universe:i18n";

export default function withUpdateOnChangeLocale(WrappedComponent) {
	return class extends React.Component {
		componentDidMount() {
			// Ask to be updated "reactively".
			// universe:i18n cannot be trusted to do that automaticaly.
			this.i18nInvalidate = () => this.forceUpdate();
			i18n.onChangeLocale(this.i18nInvalidate);
		}

		componentWillUnmount() {
			i18n.offChangeLocale(this.i18nInvalidate);
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
}
