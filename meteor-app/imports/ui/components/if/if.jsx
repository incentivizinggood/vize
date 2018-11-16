export default function If(props) {
	if (props.cond) {
		return props.children;
	}
	return null;
}
