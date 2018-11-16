// @flow

import * as React from "react";

type Props = {
	cond: mixed,
	default?: true,
	children?: React.Node,
};

// A control structure for jsx code. <When/> will render its children if cond is
// truthy. If cond is falsy it renders nothing. <When/> can also be used inside
// a <Case/> to act as a switch case or an else-if.
function When(props: Props) {
	if (props.cond) {
		return props.children;
	}
	return null;
}

export default When;
