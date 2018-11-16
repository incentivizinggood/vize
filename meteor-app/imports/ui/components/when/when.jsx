export default function When(props) {
	if (props.cond) {
		return props.children;
	}
	return null;
}
