
import React from "react";
import styled from "styled-components";
import { colors, borderRadius } from "src/global-styles";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
interface FilterButtonProps {
    displayLabel: string;
    active: boolean;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    open: boolean;
}
const StyledFilterButton = styled(Button)`
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

export default function FilterButton(props: FilterButtonProps): JSX.Element {
    const { displayLabel, active, handleClick, open } = props;
    return <StyledFilterButton
        active={displayLabel !== "Any Time" && active ? active : false}
        variant="contained"
        color="primary"
        onClick={handleClick}
    >
        {displayLabel}{" "}
        {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
    </StyledFilterButton>
}