import React from "react";
import { doVizeFormikFieldBoilerplate } from "./vize-formik-hoc.jsx";

const VizeFormikInputText = ({field, form, ...props}) => (
	<div>
		<input type="text" {...field} {...props} />
	</div>
);

export default doVizeFormikFieldBoilerplate(VizeFormikInputText);
