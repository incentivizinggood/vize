import React from "react";
import * as Formik from "formik";
import { TextField } from "formik-material-ui";

import RatingField from "./rating-field";

const FieldInner: React.ComponentType<any> = ({ type, ...restProps }) => {
	if (type === "rating") {
		return <Formik.Field {...restProps} component={RatingField} />;
	}

	return (
		<Formik.Field
			{...restProps}
			type={type}
			component={TextField}
			fullWidth
		/>
	);
};

const Field: React.ComponentType<any> = ({ t: T, ...restProps }) => {
	if (T !== undefined) {
		return <T renderer={t => <FieldInner {...restProps} {...t} />} />;
	}

	return FieldInner(restProps);
};

export default Field;
