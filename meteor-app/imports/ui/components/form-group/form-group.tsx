import React from "react";
import { Field, getIn, FieldProps } from "formik";
import styled from "styled-components";

const HelpBlock = styled.span`
	display: block;
	margin-top: 5px;
	margin-bottom: 10px;
`;

const Label = styled.label`
	width: 100%;
`;

const ControlLabel = styled.span<{ hasError: boolean }>`
	color: ${props => (props.hasError ? props.theme.error : "inherit")};
`;

const FormControl = styled.input<{ hasError: boolean }>`
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

type Foo = {
	type: string;
	label: React.ReactNode;
	placeholder?: string;
	children?: React.ReactNode;
};

type FormGroupRendererProps = FieldProps<any> & Foo;

function FormGroupRenderer({
	field,
	form: { touched, errors },
	type,
	label,
	...restProps
}: FormGroupRendererProps) {
	const error = getIn(errors, field.name);
	const hasError = getIn(touched, field.name) && error;

	// TODO: Refactor
	const foo: { as: "select" | "textarea" } | { type: typeof type } =
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
			{hasError ? <HelpBlock>{error}</HelpBlock> : null}
		</FormGroupContainer>
	);
}

type FormGroupProps = Foo & { fieldName: string };

function FormGroup({ fieldName, ...props }: FormGroupProps) {
	return <Field name={fieldName} {...props} component={FormGroupRenderer} />;
}

export default FormGroup;
