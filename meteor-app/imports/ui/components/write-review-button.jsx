import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

const t = i18n.createTranslator();

function WriteReviewButton(props) {
	return (
		<Link
			to={`/write-review/?id=${props.companyId}`}
			className={props.classField}
		>
			<FontAwesomeIcon icon={faPlus} />
			&nbsp;
			{t("common.overview_tab.add_review")}
		</Link>
	);
}

WriteReviewButton.propTypes = {
	companyId: PropTypes.string.isRequired,
	classField: PropTypes.string.isRequired,
};

export default withUpdateOnChangeLocale(WriteReviewButton);
