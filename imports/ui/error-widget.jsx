import React from "react";
import PropTypes from "prop-types";

export default function ErrorWidget(props) {
	return (
		<div className="alert alert-danger">
			<strong>{props.err}</strong>
		</div>
	);
}

ErrorWidget.propTypes = {
	err: PropTypes.string.isRequired,
};
