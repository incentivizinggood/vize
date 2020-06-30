import React from "react";
import { SalaryPosting } from "../salaries";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
	FullWidthLineDivider,
	SeeMoreFooter,
} from "../../components";

import { AddSalaryButton } from "imports/ui/components/button";
import { translations } from "imports/ui/translations";

const T = translations.legacyTranslationsNeedsRefactor;

// TODO: add type for props
function SalariesSection(props) {
	// FIRST SALARY CODE TO SHOW ON THE OVERVIEW TAB

	const SalariesToDisplay = () => {
		if (props.company.numSalaries > 0) {
			return props.company.salaryStats.map((salary, i) => (
				<SalaryPosting key={i} salary={salary} />
			));
		} else {
			return <T.overview_tab.salaries_text />;
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

			<FullWidthLineDivider />

			<SeeMoreFooter to={"#salaries"} ariaControls={"salaries"}>
				<T.overview_tab.see_all_salaries />
			</SeeMoreFooter>
		</SectionContainer>
	);
}

export default SalariesSection;
