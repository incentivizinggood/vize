import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { borderRadius } from "src/global-styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import SalaryBar from "./salary-bar";

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 35,
		borderRadius: 16,
	},
	colorPrimary: {
		backgroundColor:
			theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
	},
	bar: {
		borderRadius: 16,
		backgroundColor: "#1a90ff",
	},
}))(LinearProgress);
const StyledJobDetails = styled.div`
	padding: 15px;
	margin-top: 10px;
	border-radius: ${borderRadius.container};
	border: 1px solid #efefef;
	background-color: #f9f9f9;
`;

const ReviewHeader = styled.div`
	display: flex;
	justify-content: space-between;
`;
const SalaryJobTitle = styled.h4`
	font-weight: bold;
`;

const AveeragePay = styled.div`
	margin-top: 5px;
	margin-bottom: 20px;
`;
const GreyText = styled.span`
	color: grey;
`;
const SalaryRangeValues = styled.span`
	display: flex;
	justify-content: space-between;
`;
interface SalaryComponentProps {
	jobTitle: string;
	numSalariesJobTitle: number;
	totalAvgPay: number;
	totalMinPay: number;
	totalMaxPay: number;
}
export default function SalaryComponent({
	jobTitle,
	numSalariesJobTitle,
	totalAvgPay,
	totalMinPay,
	totalMaxPay,
}: SalaryComponentProps): JSX.Element {
	return (
		<StyledJobDetails>
			<ReviewHeader>
				<SalaryJobTitle>{jobTitle}</SalaryJobTitle>
			</ReviewHeader>
			<AveeragePay>
				<GreyText>Average</GreyText>{" "}
				<span>: $ {totalAvgPay} / week</span>
			</AveeragePay>
			<SalaryBar range={range}></SalaryBar>
		</StyledJobDetails>
	);
}
