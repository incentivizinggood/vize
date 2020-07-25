import React from "react";

import { CompanyProfileOverviewSectionFragment } from "generated/graphql-operations";
import { translations } from "src/translations";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
} from "../components";

const T = translations.legacyTranslationsNeedsRefactor;

interface OverviewSectionProps {
	company: CompanyProfileOverviewSectionFragment;
}

export default function OverviewSection(
	props: OverviewSectionProps
): JSX.Element {
	return (
		<SectionContainer>
			<SectionHeaderContainer>
				<SectionHeaderTitle>
					{props.company.name} <T.overview_tab.overview />
				</SectionHeaderTitle>
			</SectionHeaderContainer>

			<div className="over_p">
				<p>{props.company.descriptionOfCompany}</p>
			</div>
		</SectionContainer>
	);
}
