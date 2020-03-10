import React from "react";
import * as Formik from "formik";

import ToggleButton from "@material-ui/lab/ToggleButton";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
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

const ToggleButton = ({
	field: { value, onChange, onBlur },
	form: { errors, touched, setFieldValue },
	label,
	className,
	...props
}: RatingFieldProps) => {
	//const error = Formik.getIn(errors, name);
	//	const hasError = Formik.getIn(touched, name) && error;

	const classes = useStyles();

	console.log("checking val", value);
	console.log("checking name", name);
	return (
		<div>
			<ToggleButton
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				classes={{
					root: classes.toggleButton,
					label: classes.toggleButtonLabel,
					selected: classes.toggleButtonSelected,
				}}
			>
				{label}
			</ToggleButton>
		</div>
	);
};

/*
// Checkbox input
const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        className={classNames("radio-button")}
      />
      <label htmlFor={id}>{label}</label>
      {touched[name] && <InputFeedback error={errors[name]} />}
    </div>
  );
};
*/

export default ToggleButton;
