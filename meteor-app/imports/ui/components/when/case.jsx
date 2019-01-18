// @flow
import * as React from "react";

import When from "./when.jsx";

type Props = {
	cond?: mixed,
	children: React.ChildrenArray<React.Element<typeof When>>,
};

// A control structure for jsx code. <Case/> will render the first <When/>
// inside it that has a true cond. <Case/> can also work as a switch if it is
// given a cond property.
class Case extends React.Component<Props> {
	// We actualy want cond to not have a default.
	static defaultProps = {
		cond: undefined,
	};

	render() {
		// The <When/> that should be rendered, if any.
		let activeCase: React.Element<typeof When> | null = null;

		// Search the children for the <When/> that should be rendered.
		React.Children.forEach(this.props.children, child => {
			if (
				activeCase === null &&
				((this.props.cond !== undefined
					? // This <Case/> is acting like a switch from C.
					  this.props.cond === child.props.cond
					: // This <Case/> is acting like an else-if chain.
					  child.props.cond) ||
					// The default <When/> is always rendered if we get to it.
					child.props.default)
			)
				activeCase = child;
		});

		if (activeCase === null) {
			// There is no <When/> that should be rendered.
			return null;
		}

		// In case activeCase.cond is a falsy value, replace cond with true.
		// This guaranties that the children of activeCase will render.
		return React.cloneElement(activeCase, { cond: true });
	}
}

export default Case;
