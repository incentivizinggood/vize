export function If(props) {
	console.warn("<If/> has been deprecated in favor of <When/> and <Case/>!");
	if (props.cond) {
		return props.children[0];
	}
	if (props.children.length > 1) {
		return props.children[1];
	}
	return null;
}

export function Then(props) {
	console.warn(
		"<Then/> has been deprecated in favor of <When/> and <Case/>!"
	);
	return props.children;
}

export function Else(props) {
	console.warn(
		"<Else/> has been deprecated in favor of <When/> and <Case/>!"
	);
	return props.children;
}
