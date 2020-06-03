import React from "react";

import { translations } from "src/translations";

import JobPosting from "./job-posting";

const T = translations.legacyTranslationsNeedsRefactor;

export default function JobTab(props) {
	const renderedJobAds = props.jobAds.map(jobAd => (
		<JobPosting key={jobAd.id} jobAd={jobAd} />
	));

	return (
		<div role="tabpanel" className="tab-pane" id="jobs">
			<div className="col-md-12  section_rview_back_color03 ">
				<div className="ava_job ">
					<h4 className="head_section_font">
						{props.jobsCount} <T.jobscomponent.jobs_available />
					</h4>
				</div>
			</div>

			{renderedJobAds}
		</div>
	);
}
