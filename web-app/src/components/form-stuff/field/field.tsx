import React from "react";
import * as Formik from "formik";
import { TextField, Checkbox } from "formik-material-ui";
import styled from "styled-components";
import InputAdornment from "@material-ui/core/InputAdornment";
import PrivacyIcon from "@material-ui/icons/Security";

import RatingField from "./rating-field";
import RadioButtonsField from "./radio-buttons-field";

const FormikField = styled(Formik.Field)`
	margin-top: 10px !important;
`;

// Added this margin so that error messages do not overlap with other fields
const Field = styled(FieldComponent)`
	margin-bottom: 9px;
`;

function FieldInner({ type, variant, ...restProps }: any): JSX.Element {
	if (type === "rating") {
		return <Formik.Field {...restProps} component={RatingField} />;
	}
	if (type === "radioButtons") {
		return <Formik.Field {...restProps} component={RadioButtonsField} />;
	}
	if (type === "checkboxButtons") {
		return <Formik.Field {...restProps} component={CheckboxButtonsField} />;
	}
	if (type === "checkbox") {
		return (
			<Formik.Field
				{...restProps}
				type={type}
				component={Checkbox}
				color="primary"
			/>
		);
	}
	if (variant === "privacyTextField") {
		return (
			<FormikField
				{...restProps}
				type={type}
				component={TextField}
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<PrivacyIcon />
						</InputAdornment>
					),
				}}
			/>
		);
	}

	return (
		<FormikField
			{...restProps}
			type={type}
			component={TextField}
			fullWidth
		/>
	);
}

function FieldComponent({ t: T, ...restProps }: any): JSX.Element {
	if (T !== undefined) {
		return (
			<T renderer={(t: any) => <FieldInner {...restProps} {...t} />} />
		);
	}

	return FieldInner(restProps);
}

export default Field;
