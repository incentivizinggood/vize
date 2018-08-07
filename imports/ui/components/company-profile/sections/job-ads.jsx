import React from "react";

import i18n from "meteor/universe:i18n";

const T = i18n.createComponent();

export default function JobsSection(props) {
	// FIRST JOB_AD CODE TO SHOW ON THE OVERVIEW TAB
	let to_display_jobs;
	if (props.jobAds.length > 0) {
		to_display_jobs = (
			<div>
				<div>
					<h4>
						<strong>{props.jobAds[0].jobTitle}</strong>
					</h4>
				</div>
				<div>
					<div className="add-buttons">
						<a
							href={urlGenerators.vizeApplyForJobUrl(
								props.jobAds[0]._id
							)}
							className="btn btn-primary"
						>
							{" "}
							{i18n.__("common.overview_tab.apply_now")}
						</a>
					</div>
					<p>
						{" "}
						<i className="fa fa-map-marker" />&nbsp;&nbsp;&nbsp;{
							props.jobAds[0].locations[0]
						}
					</p>
					<p>
						{" "}
						<i className="fa fa-money" />&nbsp;&nbsp;{
							props.jobAds[0].pesosPerHour
						}
						<T>common.overview_tab.hour</T>
					</p>
					<p>
						{" "}
						<i className="fa fa-calendar" />&nbsp;&nbsp;{
							props.jobAds[0].contractType
						}
					</p>
				</div>

				<hr />
				<h4 className="h4-font-sz-job">
					<T>common.overview_tab.job_description</T>
				</h4>
				<div className="h4-font-sz">
					<p>{props.jobAds[0].jobDescription}</p>
				</div>
			</div>
		);
	} else {
		// the length == 0
		to_display_jobs = <T>common.overview_tab.display_jobs</T>;

		// {i18n.__(
		// 	"common.overview_tab.display_jobs"
		// )};
	}
	return (
		<div className="col-md-12  section_rview_back_color_job">
			{" "}
			{/* job link */}
			<div className="sect_re1 ">
				<h4 className="head_section_font">
					{props.jobsCount} <T>common.overview_tab.jobs_available</T>
				</h4>
				<hr />

				{to_display_jobs}

				<center>
					<div className="na_tab1">
						<ul className="" role="tablist">
							<li role="presentation" className="te_deco">
								<a
									href="#jobs"
									aria-controls="jobs"
									aria-expanded="true"
									role="tab"
									data-toggle="tab"
								>
									{" "}
									<strong>
										<T>common.overview_tab.see_all_jobs</T>
									</strong>
								</a>
							</li>
						</ul>
					</div>
				</center>
			</div>
		</div>
	);
}
