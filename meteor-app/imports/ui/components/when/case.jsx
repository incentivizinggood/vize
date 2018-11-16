import React from "react";

class Case extends React.Component {
	render() {
		let activeCase = null;

		React.Children.forEach(this.props.children, child => {
			if (activeCase === null && React.isValidElement(child)) {
				if (this.props.cond !== undefined) {
					if (this.props.cond === child.props.cond)
						activeCase = child;
				} else if (child.props.cond) {
					activeCase = child;
				} else if (child.props.default) {
					activeCase = child;
				}
			}
		});

		if (activeCase !== null) {
			return React.cloneElement(activeCase, { cond: true });
		}
		return null;
	}
}

export default Case;
