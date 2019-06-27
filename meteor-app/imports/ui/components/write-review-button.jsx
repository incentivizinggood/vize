import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import { LinkButton } from "/imports/ui/components/button";

const t = i18n.createTranslator();

function WriteReviewButton(props) {
	return (
		<LinkButton
			to={`/write-review/${
				props.companyId ? `?id=${props.companyId}` : ""
			}`}
			primary
		>
			<FontAwesomeIcon icon={faPlus} />
			&nbsp;
			{t("common.overview_tab.add_review")}
		</LinkButton>
	);
}

WriteReviewButton.propTypes = {
	companyId: PropTypes.string,
};

WriteReviewButton.defaultProps = {
	companyId: undefined,
};

export default withUpdateOnChangeLocale(WriteReviewButton);
