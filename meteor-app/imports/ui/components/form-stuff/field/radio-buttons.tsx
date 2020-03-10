import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

import RadioButtonGroup from "./radio-button-group";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(3),
		},
	})
);

const RadioButtonsField = ({
	field,
	form: { touched, errors },
	name,
	options,
	...props
}) => {
	const classes = useStyles();
	const [value, setValue] = React.useState("FORMER");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};
	console.log("checking name", field.name);
	console.log("checking value", field.value);
	console.log("checking ops", options);
	console.log("checking errors", errors);
	//	console.log("checking name", name);

	return (
		<div>
			<RadioGroup
				defaultValue="FORMER"
				{...props}
				{...field}
				name={field.name}
			>
				{options.map(option => (
					<FormControlLabel
						value={option.props.value}
						control={<Radio />}
						label={option.props.label}
					/>
				))}
			</RadioGroup>
		</div>
		/*
		<div>
			<FormControl component="fieldset" className={classes.formControl}>
				<FormLabel component="legend">Gender</FormLabel>
				<RadioButtonGroup
					name={name}
					value={value}
					onChange={onChange}
				/>
			</FormControl>
		</div>*/
	);
};

export default RadioButtonsField;
