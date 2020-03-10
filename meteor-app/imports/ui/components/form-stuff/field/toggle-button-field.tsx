import React from "react";
import * as Formik from "formik";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import PrivacyIcon from "@material-ui/icons/Security";
import { FormHelperText } from "@material-ui/core";

import EmploymentStatusToggle from "./toggle-button-group";

import { translations } from "imports/ui/translations";
const T = translations.createReview;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		toggleButtonGroup: {
			marginRight: "5px",
		},
		formLabel: {
			marginLeft: "0px",
			marginRight: "0px",
			marginTop: "5px",
		},
		toggleButton: {
			width: "80px",
		},
		toggleButtonLabel: {
			fontWeight: "bold",
			fontSize: "14px",
		},
		toggleButtonSelected: {
			color: "white !important",
			backgroundColor: "rgb(0,122,255) !important",
		},
	})
);

// TODO: Abstract this component so that it can be used for other forms if needed.
// This abstraction will be done at the time that a toggle button needs to be done again
const ToggleButtonField = ({
	field: { name, value, onChange },
	form: { touched, errors },
}) => {
	const error = Formik.getIn(errors, name);
	const hasError = Formik.getIn(touched, name) && error;

	const classes = useStyles();

	console.log("checking val", value);
	console.log("checking name", name);
	console.log("checking touched", touched);

	return (
		<FormControl component="fieldset" hasError={hasError}>
			<span>
				<PrivacyIcon />{" "}
				<FormLabel required component="label">
					<T.fields.employmentStatus.label />
				</FormLabel>
			</span>

			<FormControlLabel
				className={classes.formLabel}
				control={
					<EmploymentStatusToggle
						name={name}
						value={value}
						onChange={onChange}
					/>
				}
				label="¿Eres un empleado actual o un ex empleado?"
			/>
			{hasError ? <FormHelperText error>{error}</FormHelperText> : null}
		</FormControl>
	);
};

export default ToggleButtonField;
