import React from "react";

import { translations } from "imports/ui/translations";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
} from "../../components";

import JobPosting from "./job-posting";

const T = translations.legacyTranslationsNeedsRefactor;

export default function JobTab(props) {
	const renderedJobAds = props.jobAds.map(jobAd => (
		<JobPosting key={jobAd.id} jobAd={jobAd} />
	));

	return (
		<div role="tabpanel" className="tab-pane" id="jobs">
			<SectionContainer>
				<SectionHeaderContainer>
					<SectionHeaderTitle>
						{props.jobsCount} <T.jobscomponent.jobs_available />
					</SectionHeaderTitle>
				</SectionHeaderContainer>

				{renderedJobAds}
			</SectionContainer>
		</div>
	);
}
