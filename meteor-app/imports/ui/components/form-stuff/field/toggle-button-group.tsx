import React from "react";
import * as Formik from "formik";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import PrivacyIcon from "@material-ui/icons/Security";
import { FormHelperText } from "@material-ui/core";

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
function EmploymentStatusToggle() {
	const [employmentStatusState, setEmploymentStatus] = React.useState(
		"FORMER"
	);
	const classes = useStyles();

	const handleEmploymentStatus = (event, newStatus) => {
		if (newStatus !== null) {
			setEmploymentStatus(newStatus);
		}
	};

	console.log("emp State", employmentStatusState);

	return (
		<div>
			<ToggleButtonGroup
				name="employmentStatus"
				value={employmentStatusState}
				exclusive
				onChange={(event, newValue) => {
					setEmploymentStatus(newValue);
				}}
				classes={{
					root: classes.toggleButtonGroup,
				}}
			>
				<ToggleButton
					name="FORMER"
					value="FORMER"
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
					name="CURRENT"
					value="CURRENT"
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
		</div>
	);
}
export default EmploymentStatusToggle;
