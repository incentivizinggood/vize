import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { borderRadius } from "src/global-styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import SalaryBar from "./SalaryBar";

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
interface JobDetailsProps {
    position: string;
    pay: number;
    range: number[]
}
export default function JobDetails(props: JobDetailsProps): JSX.Element {
    const { position, pay, range } = props
    return (
        <StyledJobDetails >
            <ReviewHeader>
                <SalaryJobTitle>
                    {position}
                </SalaryJobTitle>
            </ReviewHeader>
            <AveeragePay>
                <GreyText>Average</GreyText>{" "}
                <span>: $ {pay} / week</span>
            </AveeragePay>
            <SalaryBar range={range}>
            </SalaryBar>
        </StyledJobDetails>
    );
}