import React from "react";
import { Field, ErrorMessage, connect, getIn } from "formik";
import styled from "styled-components";

const FormGroupContainer = connect(({ name, formik, children }) => {
	const touch = getIn(formik.touched, name);
	const error = getIn(formik.errors, name);
	return (
		<div
			className={
				!!touch && !!error ? "form-group has-error" : "form-group"
			}
		>
			{children}
		</div>
	);
});

const HelpBlock = ({ children }) => (
	<span className="help-block">{children}</span>
);

const Label = styled.label`
	width: 100%;
`;

const FormGroup = ({ fieldName, type, placeholder, label }) => (
	<FormGroupContainer name={fieldName}>
		<Label>
			<span className="control-label">{label}</span>
			<Field
				type={type}
				placeholder={placeholder}
				className="form-control"
				name={fieldName}
			/>
		</Label>
		<ErrorMessage name={fieldName} component={HelpBlock} />
	</FormGroupContainer>
);

export default FormGroup;
