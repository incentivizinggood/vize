import React from "react";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import PrivacyIcon from "@material-ui/icons/Security";
import { Box } from "@material-ui/core";
import styled from "styled-components";

export default function RadioButtonsField({
	field,
	form: { touched, errors },
	name,
	options,
	title,
	label,
	width,
	display,
	showPrivacyIcon,
	...props
}: any): JSX.Element {
	const [value, setValue] = React.useState("FORMER");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue((event.target as HTMLInputElement).value);
	};
	return (
		<FormControl component="fieldset" style={{ marginBottom: "15px" }}>
			<span>
				{showPrivacyIcon && (
					<PrivacyIcon style={{ marginRight: "5px" }} />
				)}

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
			<RadioGroup {...props} {...field} name={field.name}>
				{options.map((option: any, index: number) => (
					<FormControlLabel
						value={option.props.value}
						style={{ marginBottom: "-3px" }}
						control={<Radio color="primary" />}
						label={option.props.label}
						key={index}
					/>
				))}
			</RadioGroup>
		</FormControl>
	);
}
