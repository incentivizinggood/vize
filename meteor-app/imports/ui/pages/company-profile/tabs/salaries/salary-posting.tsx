import React from "react";
import styled from "styled-components";
import ProgressBar from "react-bootstrap/ProgressBar";

import { translations } from "imports/ui/translations";

const T = translations.legacyTranslationsNeedsRefactor;

const SalaryCardContainer = styled.div`
	display: flex;
	flex-direction: column;

	background-color: white;

	min-height: 120px;
	margin-bottom: 12px;
	width: 100%;

	border-bottom: 1px solid #dee0e3;

	&:last-of-type {
		border: none;
		margin-bottom: 0px;
	}
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

	const SalaryText = () => {
		if (salary.numSalaries == 1) {
			return <T.salary_tab.salary />;
		} else {
			return <T.salary_tab.salaries />;
		}
	};

	return (
		<SalaryCardContainer>
			<SalariesTitleText>{salary.jobTitle}</SalariesTitleText>

			<SalariesDetailsText>
				Promedio: ${Math.round(salary.totalAvgPay)} / semana
			</SalariesDetailsText>
			<SalariesDetailsText style={{ color: "gray" }}>
				{salary.numSalaries} <SalaryText />
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
		</SalaryCardContainer>
	);
}
