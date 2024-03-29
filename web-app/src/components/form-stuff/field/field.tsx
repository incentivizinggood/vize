import React from "react";
import * as Formik from "formik";
import { TextField, Checkbox } from "formik-material-ui";
import styled from "styled-components";
import InputAdornment from "@material-ui/core/InputAdornment";
import PrivacyIcon from "@material-ui/icons/Security";

import RatingField from "./rating-field";
import RadioButtonsField from "./radio-buttons-field";
import PhoneNumberInputMask from "./phone-number-input";

const FormikFieldWrapper = styled.div`
	margin-bottom: 1.5rem;
	margin-top: 20px;
	flex-grow: 1;
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
export const FieldHeading = styled.p`
	font-size: 0.9rem;
`;
function FieldInner({
	type,
	variant,
	label,
	required,
	flexDirection,
	display,
	width,
	...restProps
}: any): JSX.Element {
	if (type === "rating") {
		return (
			<Formik.Field
				{...restProps}
				component={RatingField}
				label={label}
			/>
		);
	}
	if (type === "radioButtons") {
		return (
			<Formik.Field
				className="verticleRadioField"
				{...restProps}
				label={label}
				width={width}
				display={display}
				flexDirection={flexDirection}
				component={RadioButtonsField}
			/>
		);
	}
	// if (type === "checkboxButtons") {
	// 	return <Formik.Field {...restProps} component={CheckboxButtonsField} />;
	// }
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
	if (type === "phoneNumber") {
		return (
			<FormikField
				{...restProps}
				type={type}
				component={TextField}
				InputProps={{ inputComponent: PhoneNumberInputMask }}
				InputLabelProps={{
					shrink: true,
				}}
				fullWidth
				color="primary"
			/>
		);
	}
	if (variant === "privacyTextField") {
		return (
			<FormikFieldWrapper>
				<FieldHeading>{label}</FieldHeading>
				<FormikField
					{...restProps}
					type={type}
					// label={label}
					className={"customInputClass"}
					variant={"outlined"}
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
			</FormikFieldWrapper>
		);
	}
	return (
		<FormikFieldWrapper>
			<FieldHeading>
				{label} {required && <span style={{ color: "red" }}>*</span>}
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

	return FieldInner(restProps);
}

// Added this margin so that error messages do not overlap with other fields
const Field = styled(FieldComponent)`
	margin-bottom: 7px !important;
`;

export default Field;
