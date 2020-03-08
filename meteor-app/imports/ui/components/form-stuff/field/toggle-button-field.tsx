import React from "react";
import * as Formik from "formik";
import styled from "styled-components";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import PrivacyIcon from "@material-ui/icons/Security";

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
const CurrentFormerToggle = ({
	field: { name, value, onChange },
	form: { touched, errors },
}: RatingFieldProps) => {
	const error = Formik.getIn(errors, name);
	const hasError = Formik.getIn(touched, name) && error;

	const [currentFormer, setCurrentFormer] = React.useState("former");
	const classes = useStyles();

	const handleCurrentFormer = (event, newStatus) => {
		if (newStatus !== null) {
			setCurrentFormer(newStatus);
		}
	};

	return (
		<FormControl component="fieldset">
			<span>
				<PrivacyIcon />{" "}
				<FormLabel required component="label">
					<T.fields.employmentStatus.label />
				</FormLabel>
			</span>

			<FormControlLabel
				className={classes.formLabel}
				control={
					<ToggleButtonGroup
						value={currentFormer}
						exclusive
						onChange={handleCurrentFormer}
						classes={{
							root: classes.toggleButtonGroup,
						}}
					>
						<ToggleButton
							value="former"
							aria-label="ex"
							classes={{
								root: classes.toggleButton,
								label: classes.toggleButtonLabel,
								selected: classes.toggleButtonSelected,
							}}
						>
							<T.fields.employmentStatus.former />
						</ToggleButton>
						<ToggleButton
							value="current"
							aria-label="actual"
							classes={{
								root: classes.toggleButton,
								label: classes.toggleButtonLabel,
								selected: classes.toggleButtonSelected,
							}}
						>
							<T.fields.employmentStatus.current />
						</ToggleButton>
					</ToggleButtonGroup>
				}
				label="¿Eres un empleado actual o un ex empleado?"
			/>
		</FormControl>
	);
};

export default CurrentFormerToggle;
