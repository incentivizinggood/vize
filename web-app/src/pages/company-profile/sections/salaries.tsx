import React from "react";
import SalaryPosting from "../articles/salary";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
	SeeMoreFooter,
} from "../components";

import { AddSalaryButton } from "src/components/button";
import { CompanyProfileSalariesSectionFragment } from "generated/graphql-operations";
import { translations } from "src/translations";
import * as urlGenerators from "src/pages/url-generators";

const T = translations.legacyTranslationsNeedsRefactor;

interface SalariesSectionProps {
	company: CompanyProfileSalariesSectionFragment;
}

// TODO: add type for props
function SalariesSection(props: SalariesSectionProps): JSX.Element {
	// FIRST SALARY CODE TO SHOW ON THE OVERVIEW TAB

	const SalariesToDisplay = () => {
		if (props.company.numSalaries > 0) {
			return props.company.salaryStats
				.slice(0, 2)
				.map((salary, i) => <SalaryPosting key={i} salary={salary} />);
		} else {
			return <T.overview_tab.no_salaries />;
		}
	};

	return (
		<SectionContainer>
			<SectionHeaderContainer>
				<SectionHeaderTitle>
					{props.company.numSalaries} <T.overview_tab.job_salaries />
				</SectionHeaderTitle>

				<div className="add-buttons">
					<AddSalaryButton
						companyName={props.company.name}
						buttonLocation="Company Profile | Overview"
					/>
				</div>
			</SectionHeaderContainer>
			<div>
				<SalariesToDisplay />
			</div>

			<SeeMoreFooter to={`./${urlGenerators.queryRoutes.salaries}`} ariaControls={urlGenerators.queryRoutes.salaries}>
				<T.overview_tab.see_all_salaries />
			</SeeMoreFooter>
		</SectionContainer>
	);
}

export default SalariesSection;
