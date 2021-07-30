import React from "react";
import * as Formik from "formik";
import styled from "styled-components";
import { Box, Checkbox, FormControlLabel } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";

const FormikCheckboxWrapper = styled.div`
	margin: 1.5rem 0;
	.customCheckbox {
		width: 40%;
	}
`;

const FormikCheckbox = styled(Formik.Field)``;
const CheckboxHeading = styled.p`
	font-size: 0.9rem;
`;
function CustomCheckbox({
	name,
	label,
	optional,
	flexDirection,
	checkboxes,
	display,
	...restProps
}: any): JSX.Element {
	return (
		<FormikCheckboxWrapper>
			<CheckboxHeading>
				{label}
				<span className="optional">{optional}</span>
			</CheckboxHeading>
			<Box display={display} flexDirection={flexDirection}>
				{checkboxes.map((c: any) => (
					<FormControlLabel
					className="customCheckbox"
						control={
							<Checkbox
								{...c}
								icon={<RadioButtonUncheckedOutlinedIcon />}
								checkedIcon={<CheckCircleOutlineIcon />}
								name={c._name}
								color="secondary"
							/>
						}
						label={c.label}
					/>
				))}
			</Box>
		</FormikCheckboxWrapper>
	);
}

export default CustomCheckbox;
