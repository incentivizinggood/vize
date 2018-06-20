import React from "react";
import PropTypes from "prop-types";

import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator();

export default class WriteReviewButton extends React.Component {
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
		return (
			<a
				href={`/write-review/?id=${this.props.companyId}`}
				className="btn btn-primary  add_review replus"
			>
				<i className="fa fa-plus" aria-hidden="true" />{" "}
				{t("common.overview_tab.add_review")}
			</a>
		);
	}
}

WriteReviewButton.propTypes = {
	companyId: PropTypes.string.isRequired,
};
