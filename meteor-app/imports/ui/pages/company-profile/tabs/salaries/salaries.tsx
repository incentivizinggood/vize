import React from "react";
import styled from "styled-components";
import { forSize } from "imports/ui/responsive.js";

import { translations } from "imports/ui/translations";

import SalaryPosting from "./salary-posting";
import { SectionHeaderContainer } from "../../components";
import { AddSalaryButton } from "imports/ui/components/button";

const T = translations.legacyTranslationsNeedsRefactor;

const SalariesCountText = styled.h3`
	color: black;
	display: flex;
	justify-content: center;
	flex-direction: column;
	font-weight: bold;

	${forSize.phoneOnly} {
		text-align: center;
		margin-top: 5px;
		margin-bottom: 15px;
	}
`;

type SalaryTabProps = {
	company: {
		salaryStats: {
			jobTitle: string;
			totalAvgPay: number;
			totalMaxPay: number;
			totalMinPay: number;
		};
		numSalaries: number;
		name: string;
	};
};

function SalaryTab(props: SalaryTabProps) {
	console.log("sp", props);
	const renderedSalaries = props.company.salaryStats.map((salary, i) => (
		<SalaryPosting key={i} salary={salary} />
	));

	const SalaryText = () => {
		if (props.company.numSalaries == 1) {
			return <T.salary_tab.job_salary />;
		} else {
			return <T.salary_tab.job_salaries />;
		}
	};

	return (
		<div role="tabpanel" className="tab-pane" id="salaries">
			<SectionHeaderContainer>
				<SalariesCountText>
					{props.company.numSalaries} <SalaryText />
				</SalariesCountText>
				<div className="add-buttons">
					<AddSalaryButton
						companyName={props.company.name}
						buttonLocation="Company Profile | Salaries"
					/>
				</div>
			</SectionHeaderContainer>

			<div>{renderedSalaries}</div>
		</div>
	);
}

export default SalaryTab;
