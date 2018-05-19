import React from "react";
import JobPosting from "../../ui/components/jobPosting.jsx";

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
							{this.props.jobsCount} Job(s) Available
						</h4>
					</div>
				</div>

				{RenderedItems}
			</div>
		);
	}
}
