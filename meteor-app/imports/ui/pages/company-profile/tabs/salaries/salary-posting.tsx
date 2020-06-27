import React from "react";
import styled from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";

const SalaryCardContainer = styled.div`
	display: flex;
	background-color: white;
	padding: 10px;
	height: 125px;
	margin-bottom: 0.10px

	box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
		0px 1px 1px 0px rgba(0, 0, 0, 0.14),
		0px 2px 1px -1px rgba(0, 0, 0, 0.12);
`;

const SalaryDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;

const SalariesTitleText = styled.h4`
	font-weight: bold;
	margin-bottom: 3px;
`;

const SalariesDetailsText = styled.h6`
	margin-top: 5px;
`;

const MinMaxSalariesTextContainter = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 12px;
	margin-top: -18px;
`;

type SalaryStatsProps = {
	salary: {
		jobTitle: string;
		totalAvgPay: number;
		totalMaxPay: number;
		totalMinPay: number;
		numSalaries: number;
	};
};

export default function SalaryPosting({ salary }: SalaryStatsProps) {
	const avgSalaryPercentage: number =
		salary.totalAvgPay / (salary.totalMinPay + salary.totalMaxPay);

	const salaryText: string =
		salary.numSalaries == 1 ? " Salario" : " Salarios";
	return (
		<SalaryCardContainer>
			<SalaryDetailsContainer>
				<SalariesTitleText>{salary.jobTitle}</SalariesTitleText>

				<SalariesDetailsText>
					Promedio: ${Math.round(salary.totalAvgPay)} / semana
				</SalariesDetailsText>
				<SalariesDetailsText
					style={{ color: "gray", fontSize: "12px" }}
				>
					{salary.numSalaries + salaryText}
				</SalariesDetailsText>
				<ProgressBar
					style={{ overflow: "visible", marginTop: "10px" }}
					label={`$${Math.round(salary.totalAvgPay)}`}
					now={avgSalaryPercentage * 100}
				/>
				<MinMaxSalariesTextContainter>
					<span> ${Math.round(salary.totalMinPay)} </span>
					<span> ${Math.round(salary.totalMaxPay)} </span>
				</MinMaxSalariesTextContainter>
			</SalaryDetailsContainer>
		</SalaryCardContainer>
	);
}
