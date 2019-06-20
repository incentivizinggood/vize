import React from "react";
import { Field } from "formik";
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

const FormControl = styled.input`
	display: block;
	width: 100%;
	height: auto;
	padding: 6px 12px;

	border: 1px solid
		${props =>
			props.hasError ? props.theme.error : props.theme.onSurfaceWeak};
	border-radius: 4px;
	box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
	background: transparent;

	transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;

	resize: none;
	overflow-y: scroll;
`;

const FormGroupContainer = styled.div`
	margin-top: 5px;
`;

function FormGroupRenderer({
	field,
	form: { touched, errors },
	type,
	label,
	...restProps
}) {
	const hasError = touched[field.name] && errors[field.name];

	// TODO: Refactor
	const foo =
		type === "textarea"
			? { as: "textarea" }
			: type === "select"
			? { as: "select" }
			: { type };

	return (
		<FormGroupContainer>
			<Label>
				<ControlLabel hasError={hasError}>{label}</ControlLabel>
				<FormControl
					{...restProps}
					{...field}
					{...foo}
					hasError={hasError}
				/>
			</Label>
			{hasError ? <HelpBlock>{errors[field.name]}</HelpBlock> : null}
		</FormGroupContainer>
	);
}

function FormGroup({ fieldName, ...props }) {
	return <Field name={fieldName} {...props} component={FormGroupRenderer} />;
}

export default FormGroup;
