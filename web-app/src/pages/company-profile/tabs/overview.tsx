import React from "react";

import {
	OverviewSection,
	ReviewsSection,
	JobsSection,
	SalariesSection,
} from "./sections";

export default function OverviewTab(props) {
	return (
		<div role="tabpanel" className="tab-pane active" id="overview">
			<OverviewSection company={props.company} />
			<div className="clear" />
			<ReviewsSection company={props.company} refetch={props.refetch} />
			<JobsSection
				jobAds={props.company.jobAds}
				numJobAds={props.company.numJobAds}
			/>

			<SalariesSection company={props.company} />
		</div>
	);
}
