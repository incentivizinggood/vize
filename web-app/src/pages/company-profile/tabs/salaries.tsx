import React from "react";
import styled from "styled-components";

import { translations } from "src/translations";

import SalaryPosting from "../articles/salary";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
} from "../components";
import { AddSalaryButton } from "src/components/button";
import Spinner from "src/components/Spinner";
import { useCompanyProfileSalaryTabQuery } from "generated/graphql-operations";

const T = translations.legacyTranslationsNeedsRefactor;

const SalaryPostingsContainer = styled.div`
	margin-bottom: 5px;

	:last-of-type {
		border: none;
		margin-bottom: 0px;
	}
`;

type SalaryTabProps = {
	companyId: string;
};

function SalaryTab({ companyId }: SalaryTabProps): JSX.Element {
	const { loading, error, data } = useCompanyProfileSalaryTabQuery({
		variables: { companyId },
	});

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <h2>{`Error! ${error.message}`}</h2>;
	}

	if (!data || !data.company) {
		return (
			<h2>
				<T.companyprofile.notfound />
			</h2>
		);
	}

	const renderedSalaries = data.company.salaryStats.map((salary, i) => (
		<SalaryPosting key={i} salary={salary} />
	));

	const SalaryText = () => {
		if (data.company.numSalaries == 1) {
			return <T.salary_tab.job_salary />;
		} else {
			return <T.salary_tab.job_salaries />;
		}
	};

	return (
		<SectionContainer>
			<SectionHeaderContainer>
				<SectionHeaderTitle>
					{data.company.numSalaries} <SalaryText />
				</SectionHeaderTitle>
				<div className="add-buttons">
					<AddSalaryButton
						companyName={data.company.name}
						buttonLocation="Company Profile | Salaries"
					/>
				</div>
			</SectionHeaderContainer>

			<SalaryPostingsContainer>
				{renderedSalaries}
			</SalaryPostingsContainer>
		</SectionContainer>
	);
}

export default SalaryTab;
