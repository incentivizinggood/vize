import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

export default function CheckboxButtonsField({
	field,
	form: { touched, errors },
	name,
	options,
	label,
	...props
}: any): JSX.Element {
	const [value, setValue] = React.useState("FORMER");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};

	return (
		<FormControl component="fieldset" style={{ marginTop: "15px" }}>
			<span>
				<FormLabel
					required
					component="label"
					style={{
						fontWeight: "bold",
						color: "black",
					}}
				>
					{label}
				</FormLabel>
			</span>
			<FormGroup {...props} {...field} name={field.name}>
				{options.map((option: any) => (
					<FormControlLabel
						value={option.props.value}
						control={<Checkbox color="primary" />}
						label={option.props.label}
						style={{ marginBottom: "-8px" }}
					/>
				))}
			</FormGroup>
		</FormControl>
	);
}
