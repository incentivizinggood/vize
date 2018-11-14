import { connect } from "formik";

function IfFormik(props) {
	if (props.cond(props.formik)) {
		return props.children;
	}
	return null;
}

export default connect(IfFormik);
