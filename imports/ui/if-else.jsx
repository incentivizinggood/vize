export function If(props) {
	if (props.cond) {
		return props.children[0];
	}
	if (props.children.length > 1) {
		return props.children[1];
	}
	return null;
}

export function Then(props) {
	return props.children;
}

export function Else(props) {
	return props.children;
}
