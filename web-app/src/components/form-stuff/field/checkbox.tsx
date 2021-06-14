import React from "react";
import * as Formik from "formik";
import styled from "styled-components";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import RadioButtonUncheckedOutlinedIcon from "@material-ui/icons/RadioButtonUncheckedOutlined";

const FormikCheckboxWrapper = styled.div``;

const FormikCheckbox = styled(Formik.Field)``;
const ChecckboxHeading = styled.p``;
function CustomCheckbox({
	name,
	label,
	optional,
	...restProps
}: any): JSX.Element {
	return (
		<FormikCheckboxWrapper>
			<ChecckboxHeading>
				{label}
				<span className="optional">{optional}</span>
			</ChecckboxHeading>

			<FormControlLabel
				control={
					<Checkbox
						{...restProps}
						icon={<RadioButtonUncheckedOutlinedIcon />}
						checkedIcon={<CheckCircleOutlineIcon />}
						name={name}
						color="secondary"
					/>
				}
				label={label}
			/>
		</FormikCheckboxWrapper>
	);
}

export default CustomCheckbox;
