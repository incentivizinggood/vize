import React from "react";
import { connect } from "formik";
import { withVizeFormikField } from "./vize-formik-hoc.jsx";

const VizeFormikInputText = ({field, form, ...props}) => withVizeFormikField(
	() => (
		<div>
			<input type="text" className="form-control" {...field} {...props} />
		</div>
	),
	props.name,
	props.labelGroupName
);

export default connect(VizeFormikInputText);
