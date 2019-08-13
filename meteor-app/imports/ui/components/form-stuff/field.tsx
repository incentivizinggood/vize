import React from "react";
import { Field as FormikField } from "formik";
import { TextField } from "formik-material-ui";
import { Rating } from "@material-ui/lab";

const RatingField = ({ field: { name, value, onChange, onBlur } }) => (
	<Rating name={name} value={value} onChange={onChange} />
);

const FieldInner: React.ComponentType<any> = ({ type, ...restProps }) => {
	if (type === "rating") {
		return <FormikField {...restProps} component={RatingField} />;
	}

	return (
		<FormikField
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
