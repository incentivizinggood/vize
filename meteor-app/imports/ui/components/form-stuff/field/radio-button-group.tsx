import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		formControl: {
			margin: theme.spacing(3),
		},
	})
);

export default function RadioButtonGroup() {
	const classes = useStyles();
	const [value, setValue] = React.useState("female");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	return (
		<div>
			<RadioGroup
				aria-label="gender"
				name={name}
				value={value}
				onChange={handleChange}
			>
				<FormControlLabel
					value="female"
					control={<Radio />}
					label="Female"
				/>
				<FormControlLabel
					value="male"
					control={<Radio />}
					label="Male"
				/>
			</RadioGroup>
		</div>
	);
}
