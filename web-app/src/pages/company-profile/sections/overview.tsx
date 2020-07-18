import React from "react";

import { translations } from "src/translations";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
} from "../components";

const T = translations.legacyTranslationsNeedsRefactor;

export default function OverviewSection(props) {
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
