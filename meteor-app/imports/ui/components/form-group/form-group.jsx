import React from "react";
import { Field } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import i18n from "meteor/universe:i18n";

const t = i18n.createTranslator("common.loginRegister");

const FormGroup = ({ name, type, icon }) => (
	<div className="form-group">
		<label
			htmlFor={name}
			className="icon-addon addon-md"
			rel="tooltip"
			title={name}
		>
			<FontAwesomeIcon icon={icon} className="fa" />
			<Field
				type={type}
				placeholder={t(name)}
				className="form-control"
				name={name}
				id={name}
				required
			/>
		</label>
	</div>
);

export default FormGroup;
