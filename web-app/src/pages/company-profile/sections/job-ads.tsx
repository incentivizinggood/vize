import React from "react";

import { CompanyProfileJobsSectionFragment } from "generated/graphql-operations";
import { translations } from "src/translations";

import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
	SeeMoreFooter,
} from "../components";
import JobPosting from "../articles/job-ad";

const T = translations.legacyTranslationsNeedsRefactor;

interface JobsSectionProps {
	company: CompanyProfileJobsSectionFragment;
}

export default function JobsSection(props: JobsSectionProps): JSX.Element {
	// FIRST JOB_AD CODE TO SHOW ON THE OVERVIEW TAB
	let jobAdsToDisplay;
	if (props.company.jobAds.length > 0) {
		jobAdsToDisplay = <JobPosting jobAd={props.company.jobAds[0]} />;
	} else {
		jobAdsToDisplay = <T.overview_tab.no_jobs />;
	}

	return (
		<SectionContainer>
			<SectionHeaderContainer>
				<SectionHeaderTitle>
					{props.company.numJobAds} <T.overview_tab.jobs_available />
				</SectionHeaderTitle>
			</SectionHeaderContainer>

			{jobAdsToDisplay}

			<SeeMoreFooter to={"./jobs"} ariaControls={"jobs"}>
				<T.overview_tab.see_all_jobs />
			</SeeMoreFooter>
		</SectionContainer>
	);
}
