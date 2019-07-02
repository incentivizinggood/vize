import React from "react";
import { Field } from "formik";
import styled from "styled-components";

const Label = styled.label`
	display: block;
`;

const ControlLabel = styled.span`
	margin-left: 10px;
`;

function RadioItem({ fieldName, value, label }) {
	return (
		<Label>
			<Field name={fieldName} type="radio" value={value} />
			<ControlLabel>{label}</ControlLabel>
		</Label>
	);
}

const Legend = styled.legend`
	font-weight: bold;

	/* Override the bootstrap styles. */
	font-size: inherit;
	margin: 0;
	padding: 0;
	border: none;
`;

function RadioGroup({ legend, children }) {
	return (
		<fieldset>
			<Legend>{legend}</Legend>
			{children}
		</fieldset>
	);
}

export { RadioItem, RadioGroup };
