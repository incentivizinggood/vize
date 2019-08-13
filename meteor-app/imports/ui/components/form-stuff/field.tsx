import React from "react";
import { Field as FormikField } from "formik";
import { TextField } from "formik-material-ui";

const Field: React.ComponentType<any> = ({ t: T, ...restProps }) =>
	T === undefined ? (
		<FormikField {...restProps} component={TextField} fullWidth />
	) : (
		<T
			renderer={t => (
				<FormikField
					{...restProps}
					{...t}
					component={TextField}
					fullWidth
				/>
			)}
		/>
	);

export default Field;
