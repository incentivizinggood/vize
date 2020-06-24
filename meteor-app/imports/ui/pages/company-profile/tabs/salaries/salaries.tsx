import React from "react";
import styled from "styled-components";
import { forSize } from "imports/ui/responsive.js";

import { translations } from "imports/ui/translations";

import SalaryPosting from "./salary-posting";
import { AddSalaryButton } from "imports/ui/components/button";

const T = translations.legacyTranslationsNeedsRefactor;

const SectionHeaderContainer = styled.div`
	display: flex;
	background-color: white;
	padding: 10px;
	margin-bottom: 20px;
	justify-content: space-between;

	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);

	${forSize.phoneOnly} {
		flex-direction: column;
		align-items: center;
	}
`;

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
	const renderedSalaries = props.company.salaryStats.map((salary, i) => (
		<SalaryPosting key={i} salary={salary} />
	));

	return (
		<div role="tabpanel" className="tab-pane" id="salaries">
			<SectionHeaderContainer>
				<SalariesCountText>
					{props.company.numSalaries} <T.salary_tab.job_salaries />
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
