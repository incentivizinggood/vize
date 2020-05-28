import React from "react";
import * as Formik from "formik";
import { TextField } from "formik-material-ui";
import styled from "styled-components";
import InputAdornment from "@material-ui/core/InputAdornment";
import PrivacyIcon from "@material-ui/icons/Security";

import RatingField from "./rating-field";
import RadioButtonsField from "./radio-buttons-field";

const FormikField = styled(Formik.Field)`
	margin-top: 10px !important;
`;

const FieldInner: React.ComponentType<any> = ({
	type,
	variant,
	...restProps
}) => {
	if (type === "rating") {
		return <Formik.Field {...restProps} component={RatingField} />;
	}
	if (type === "radioButtons") {
		return <Formik.Field {...restProps} component={RadioButtonsField} />;
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
