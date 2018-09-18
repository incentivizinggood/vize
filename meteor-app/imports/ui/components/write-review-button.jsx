import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

const t = i18n.createTranslator();

class WriteReviewButton extends React.Component {
	render() {
		return (
			<a
				href={`/write-review/?id=${this.props.companyId}`}
				className="btn btn-primary  add_review replus"
			>
				<FontAwesomeIcon icon="plus" />&nbsp;
				{t("common.overview_tab.add_review")}
			</a>
		);
	}
}

WriteReviewButton.propTypes = {
	companyId: PropTypes.string.isRequired,
};

export default withUpdateOnChangeLocale(WriteReviewButton);
