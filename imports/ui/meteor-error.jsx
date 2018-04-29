import React from "react";
import PropTypes from "prop-types";

export default class MeteorError extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="alert alert-danger">
  				<strong>{this.props.err}</strong>
			</div>
		);
	}
}

MeteorError.propTypes = {
	err: PropTypes.string.isRequired,
};
