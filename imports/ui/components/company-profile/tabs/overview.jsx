import React from "react";

import OverviewSection from "../sections/overview.jsx";
import ReviewsSection from "../sections/reviews.jsx";
import JobsSection from "../sections/job-ads.jsx";
import SalariesSection from "../sections/salaries.jsx";

export default function OverviewTab(props) {
	return (
		<div role="tabpanel" className="tab-pane active" id="overview">
			<OverviewSection companyoverview={props.companyoverview} />
			<div className="clear" />
			<ReviewsSection
				companyoverview={props.companyoverview}
				companyreview={props.companyreview}
			/>
			<JobsSection jobAds={props.jobAds} jobsCount={props.jobsCount} />
			<SalariesSection
				companyoverview={props.companyoverview}
				salaries={props.salaries}
				salariesCount={props.salariesCount}
			/>
		</div>
	);
}
