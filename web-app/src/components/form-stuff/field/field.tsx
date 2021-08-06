import React from "react";
import * as Formik from "formik";
import { TextField } from "formik-material-ui";
import styled from "styled-components";
import InputAdornment from "@material-ui/core/InputAdornment";
import PrivacyIcon from "@material-ui/icons/Security";

import RatingField from "./rating-field";
import RadioButtonsField from "./radio-buttons-field";

const FormikFieldWrapper = styled.div`
	margin-bottom: 1.5rem;
	margin-top: 20px;
`;

const FormikField = styled(Formik.Field)`
	margin-top: 10px !important;
	border-radius: 10px;
	.MuiInputBase-formControl {
		background-color: #f0f8ff;
	}
	.MuiOutlinedInput-root {
		border-radius: 10px;
	}
	.MuiOutlinedInput-notchedOutline {
		border: 1px solid #dcdcdc !important;
	}
`;
const FieldHeading = styled.p`
	font-size: 0.9rem;
	.optional {
		color: red;
	}
`;
function FieldInner({
	type,
	variant,
	label,
	optional,
	flexDirection,
	display,
	width,
	...restProps
}: any): JSX.Element {
	if (type === "rating") {
		return <Formik.Field {...restProps} component={RatingField} />;
	}
	console.log(width);
	if (type === "radioButtons") {
		return (
			<Formik.Field
				{...restProps}
				label={label}
				width={width}
				display={display}
				flexDirection={flexDirection}
				component={RadioButtonsField}
			/>
		);
	}
	if (variant === "privacyTextField") {
		return (
			<FormikField
				{...restProps}
				type={type}
				variant="outlined"
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
		<FormikFieldWrapper>
			<FieldHeading>
				{label} <span className="optional">{optional}</span>
			</FieldHeading>
			<FormikField
				{...restProps}
				className={"customInputClass"}
				variant={"outlined"}
				type={type}
				component={TextField}
				fullWidth
			/>
		</FormikFieldWrapper>
	);
}

function FieldComponent({ t: T, ...restProps }: any): JSX.Element {
	if (T !== undefined) {
		return (
			<T renderer={(t: any) => <FieldInner {...restProps} {...t} />} />
		);
	}
	// debugger;

	return FieldInner(restProps);
}

// Added this margin so that error messages do not overlap with other fields
const Field = styled(FieldComponent)`
	margin-bottom: 7px !important;
`;

export default Field;
