import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import PrivacyIcon from "@material-ui/icons/Security";
import { Box } from "@material-ui/core";

export default function RadioButtonsField({
	field,
	form: { touched, errors },
	name,
	options,
	title,
	label,
	width,
	display,
	...props
}: any): JSX.Element {
	const [value, setValue] = React.useState("FORMER");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};
	return (
		<FormControl component="fieldset">
			<span>
				{/* <PrivacyIcon /> {"  "} */}
				<FormLabel required component="label">
					{label}
				</FormLabel>
			</span>
			<RadioGroup {...props} {...field} name={field.name}>
				<Box display={display}>
					{options.map((option: any) => (
						<FormControlLabel
							style={{ width: width }}
							value={option.props.value}
							control={<Radio color="primary" />}
							label={option.props.label}
						/>
					))}
				</Box>
			</RadioGroup>
		</FormControl>
	);
}
