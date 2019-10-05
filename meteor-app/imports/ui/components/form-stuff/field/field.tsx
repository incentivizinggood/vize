import React from "react";
import * as Formik from "formik";
import { TextField } from "formik-material-ui";
import styled from "styled-components";


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

const FieldComponent: React.ComponentType<any> = ({ t: T, ...restProps }) => {
	if (T !== undefined) {
		return <T renderer={t => <FieldInner {...restProps} {...t} />} />;
	}

	return FieldInner(restProps);
};

// Added this margin so that error messages do not overlap with other fields
const Field = styled(FieldComponent)`
	margin-bottom: 7px !important;
`;

export default Field;
