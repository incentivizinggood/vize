import React from "react";

import OverviewSection from "../sections/overview.jsx";
import ReviewsSection from "../sections/reviews.jsx";
import JobsSection from "../sections/job-ads.jsx";
import SalariesSection from "../sections/salaries.jsx";

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
