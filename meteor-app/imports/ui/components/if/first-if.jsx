import React from "react";

class FirstIf extends React.Component {
	render() {
		let first = null;

		React.Children.forEach(this.props.children, child => {
			if (
				first === null &&
				React.isValidElement(child) &&
				child.props.cond
			) {
				first = child;
			}
		});

		return first !== null ? React.cloneElement(first) : null;
	}
}

export default FirstIf;
