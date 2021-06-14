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
	checkboxes,
	...restProps
}: any): JSX.Element {
	return (
		<FormikCheckboxWrapper>
			<ChecckboxHeading>
				{label}
				<span className="optional">{optional}</span>
			</ChecckboxHeading>

			{checkboxes.map((c: any) => (
				<FormControlLabel
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
		</FormikCheckboxWrapper>
	);
}

export default CustomCheckbox;
