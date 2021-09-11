import React, { useState, useEffect } from "react";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { Col } from "react-bootstrap";
import { colors, borderRadius } from "src/global-styles";

interface option {
	label: string;
	value: number;
}
interface FilterDropdownProps {
	options: Array<option>;
	value: number[] | number;
	updateValue: any;
	displayLabel: any;
}
const DropdownContainer = styled.div`
	margin-bottom: 10px;
	margin-right: 8px;
`;
const FilterButton = styled(Button)`
	background-color: ${(props) =>
		props.active
			? `${colors.secondaryColorGreen} !important`
			: `${colors.tertiaryColorLightBlue} !important`};
	color: ${(props) =>
		props.active ? `white !important` : `black !important`};
	padding: 12px 20px !important;
	border-radius: ${borderRadius.button} !important;
	text-transform: capitalize !important;
`;
const DropdownWrapper = styled.div`
	padding: 20px;
	.PrivateSwitchBase-root-1 {
		padding: 5px;
	}

	.MuiRadio-colorSecondary.Mui-checked {
		color: ${colors.secondaryColorGreen};
	}
	.MuiCheckbox-colorSecondary.Mui-checked {
		color: ${colors.secondaryColorGreen};
	}
	.MuiPopover-paper {
		margin-top: 8px;
	}
	display: flex;
	flex-direction: column;
`;
function FilterDropdown(props: FilterDropdownProps): JSX.Element {
	const { displayLabel, options, value, updateValue } = props;
	const [active, setActive] = useState(false);
	useEffect(() => {
		let active = false;
		if (typeof value === "number") {
			if (value) {
				active = true;
			}
		} else {
			if (value.length) {
				active = true;
			}
		}
		setActive(active);
	}, [value]);
	const handleChange = (event) => {
		updateValue(event.target.value);
	};
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const open = Boolean(anchorEl);
	return (
		<DropdownContainer>
			<FilterButton
				active={active}
				variant="contained"
				color="primary"
				onClick={handleClick}
			>
				{displayLabel}{" "}
				{open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
			</FilterButton>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "left",
				}}
			>
				<DropdownWrapper>
					{typeof value === "number" ? (
						<RadioGroup
							aria-label="gender"
							name="gender1"
							value={value}
							onChange={handleChange}
						>
							{options.map((v) => {
								return (
									<FormControlLabel
										key={v.value}
										control={
											<Radio
												checked={value === v.value}
											/>
										}
										label={v.label}
									/>
								);
							})}
						</RadioGroup>
					) : (
						options.map((v) => {
							return (
								<FormControlLabel
									key={v.value}
									value={v.value}
									control={
										<Checkbox
											checked={
												value.indexOf(v.value) > -1
											}
										/>
									}
									label={v.label}
								/>
							);
						})
					)}
				</DropdownWrapper>
			</Popover>
		</DropdownContainer>
	);
}

export default FilterDropdown;
