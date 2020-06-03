import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import PrivacyIcon from "@material-ui/icons/Security";

const RadioButtonsField: React.FC<any> = ({
	field,
	form: { touched, errors },
	name,
	options,
	label,
	...props
}) => {
	const [value, setValue] = React.useState("FORMER");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	return (
		<FormControl component="fieldset">
			<span>
				<PrivacyIcon /> {"  "}
				<FormLabel required component="label">
					{label}
				</FormLabel>
			</span>
			<RadioGroup {...props} {...field} name={field.name}>
				{options.map((option: any) => (
					<FormControlLabel
						value={option.props.value}
						control={<Radio color="primary" />}
						label={option.props.label}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
};

export default RadioButtonsField;
