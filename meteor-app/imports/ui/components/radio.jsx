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

// This should be a <legend> instead of a <div>,
// but Bootstrap interfears with the style of legends.
const Legend = styled.div`
	font-weight: bold;
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
