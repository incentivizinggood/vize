import React from "react";
import { Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { i18n } from "meteor/universe:i18n";

const t = i18n.createTranslator("common.loginRegister");

const FormGroup = ({ name, type, icon }) => (
	<div className="form-group">
		<label className="icon-addon addon-md" title={name}>
			<FontAwesomeIcon icon={icon} className="fa" />
			<Field
				type={type}
				placeholder={t(name)}
				className="form-control"
				name={name}
			/>
		</label>
		<ErrorMessage name={name} />
	</div>
);

export default FormGroup;
