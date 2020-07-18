import React from "react";

import { translations } from "src/translations";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
} from "../components";

import JobPosting from "../articles/job-ad";

const T = translations.legacyTranslationsNeedsRefactor;

export default function JobTab(props) {
	const renderedJobAds = props.jobAds.map(jobAd => (
		<JobPosting key={jobAd.id} jobAd={jobAd} />
	));

	return (
		<SectionContainer>
			<SectionHeaderContainer>
				<SectionHeaderTitle>
					{props.jobsCount} <T.jobscomponent.jobs_available />
				</SectionHeaderTitle>
			</SectionHeaderContainer>

			{renderedJobAds}
		</SectionContainer>
	);
}
