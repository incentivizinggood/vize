import React from "react";

import i18n from "meteor/universe:i18n";

import JobPosting from "./jobPosting.jsx";

const T = i18n.createComponent();

export default class JobTab extends React.Component {
	render() {
		const RenderedItems = this.props.jobAds.map(function(item, i) {
			return <JobPosting key={i} item={item} />;
		});

		return (
			<div role="tabpanel" className="tab-pane" id="jobs">
				<div className="col-md-12  section_rview_back_color03 ">
					<div className="ava_job ">
						<h4 className="head_section_font">
							{this.props.jobsCount}{" "}
							<T>common.jobscomponent.jobs_available</T>
						</h4>
					</div>
				</div>

				{RenderedItems}
			</div>
		);
	}
}
