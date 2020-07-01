import React from "react";
import styled from "styled-components";
import { forSize } from "imports/ui/responsive.js";

import { translations } from "imports/ui/translations";

import SalaryPosting from "./salary-posting";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
} from "../../components";
import { AddSalaryButton } from "imports/ui/components/button";

const T = translations.legacyTranslationsNeedsRefactor;

const SalaryPostingsContainer = styled.div`
	margin-bottom: 5px;

	:last-of-type {
		border: none;
		margin-bottom: 0px;
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

	const SalaryText = () => {
		if (props.company.numSalaries == 1) {
			return <T.salary_tab.job_salary />;
		} else {
			return <T.salary_tab.job_salaries />;
		}
	};

	return (
		<div role="tabpanel" className="tab-pane" id="salaries">
			<SectionContainer>
				<SectionHeaderContainer>
					<SectionHeaderTitle>
						{props.company.numSalaries} <SalaryText />
					</SectionHeaderTitle>
					<div className="add-buttons">
						<AddSalaryButton
							companyName={props.company.name}
							buttonLocation="Company Profile | Salaries"
						/>
					</div>
				</SectionHeaderContainer>

				<SalaryPostingsContainer>
					{renderedSalaries}
				</SalaryPostingsContainer>
			</SectionContainer>
		</div>
	);
}

export default SalaryTab;
