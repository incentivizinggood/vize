import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMapMarker,
	faMoneyBillAlt,
	faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import { processLocation } from "/imports/api/models/helpers/postgresql/misc.js";
import { urlGenerators } from "/imports/ui/pages";

const T = i18n.createComponent();

export default function JobsSection(props) {
	// FIRST JOB_AD CODE TO SHOW ON THE OVERVIEW TAB
	let jobAdsToDisplay;
	if (props.jobAds.length > 0) {
		jobAdsToDisplay = (
			<div>
				<div>
					<h4>
						<strong>{props.jobAds[0].jobTitle}</strong>
					</h4>
				</div>
				<div>
					<div
						className="add-buttons"
						style={{ float: "right", marginTop: "0px" }}
					>
						<Link
							to={urlGenerators.vizeApplyForJobUrl(
								props.jobAds[0].id
							)}
							style={{ float: "right" }}
							className="btn btn-primary"
						>
							{" "}
							{i18n.__("common.overview_tab.apply_now")}
						</Link>
					</div>
					<p>
						<FontAwesomeIcon icon={faMapMarker} />
						&nbsp;&nbsp;&nbsp;
						{processLocation(
							JSON.stringify(props.jobAds[0].locations[0])
						)}
					</p>
					<p>
						<FontAwesomeIcon icon={faMoneyBillAlt} />
						&nbsp;&nbsp;
						{props.jobAds[0].pesosPerHour}
						<T>common.overview_tab.hour</T>
					</p>
					<p>
						<FontAwesomeIcon icon={faCalendar} />
						&nbsp;&nbsp;
						{props.jobAds[0].contractType}
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
		jobAdsToDisplay = <T>common.overview_tab.display_jobs</T>;

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
					{props.numJobAds} <T>common.overview_tab.jobs_available</T>
				</h4>
				<br />
				<br />
				<hr />

				{jobAdsToDisplay}

				<center>
					<div className="na_tab1">
						<ul className="" role="tablist">
							<li role="presentation" className="te_deco">
								<Link
									to="#jobs"
									aria-controls="jobs"
									aria-expanded="true"
									role="tab"
									data-toggle="tab"
								>
									{" "}
									<strong>
										<T>common.overview_tab.see_all_jobs</T>
									</strong>
								</Link>
							</li>
						</ul>
					</div>
				</center>
			</div>
		</div>
	);
}
