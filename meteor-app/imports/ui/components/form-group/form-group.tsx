import React from "react";
import { Field, ErrorMessage, connect, getIn } from "formik";
import styled from "styled-components";

const HelpBlock = styled.span`
	display: block;
	margin-top: 5px;
	margin-bottom: 10px;
`;

const Label = styled.label`
	width: 100%;
`;

const ControlLabel = styled.span`
	color: ${props => (props.hasError ? props.theme.error : "inherit")};
`;

const FormControl = styled(Field)`
	display: block;
	width: 100%;
	height: 34px;
	padding: 6px 12px;

	border: 1px solid
		${props =>
			props.hasError ? props.theme.error : props.theme.onSurfaceWeak};
	border-radius: 4px;
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
`;

const FormGroupContainer = styled.div`
	margin-top: 5px;
`;

function FormGroup({ fieldName, type, placeholder, label, formik }) {
	const hasError =
		getIn(formik.touched, fieldName) && getIn(formik.errors, fieldName);

	return (
		<FormGroupContainer>
			<Label>
				<ControlLabel hasError={hasError}>{label}</ControlLabel>
				<FormControl
					type={type}
					placeholder={placeholder}
					name={fieldName}
					hasError={hasError}
				/>
			</Label>
			<ErrorMessage name={fieldName} component={HelpBlock} />
		</FormGroupContainer>
	);
}

export default connect(FormGroup);
