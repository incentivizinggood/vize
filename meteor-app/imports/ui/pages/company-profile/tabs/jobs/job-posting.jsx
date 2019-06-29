import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMapMarker,
	faMoneyBillAlt,
	faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/ui/pages";
import { processLocation } from "/imports/api/models/helpers/postgresql/misc.ts";
import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

const T = i18n.createComponent();

function JobPosting(props) {
	const datePosted = new Date(props.jobAd.created).toLocaleDateString(
		"en-US",
		{
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		}
	);

	return (
		<div className="col-md-12 section_rview_back_color05 ">
			<div className="sect-padding ">
				<div>
					<h4>
						<strong>{props.jobAd.jobTitle}</strong>
					</h4>
				</div>

				<div>
					<div className="add-buttons">
						<Link
							to={urlGenerators.vizeApplyForJobUrl(
								props.jobAd.id
							)}
							className="btn btn-primary"
						>
							{" "}
							{i18n.__("common.jobpostings.apply_now")}
						</Link>
					</div>
					<p>
						<FontAwesomeIcon icon={faMapMarker} />
						&nbsp;&nbsp;&nbsp;
						{processLocation(
							JSON.stringify(props.jobAd.locations[0])
						)}
					</p>
					<p>
						<FontAwesomeIcon icon={faMoneyBillAlt} />
						&nbsp;&nbsp;
						{props.jobAd.pesosPerHour}
						{i18n.__("common.jobpostings.week")}
					</p>
					<p>
						<FontAwesomeIcon icon={faCalendar} />
						&nbsp;&nbsp;
						{props.jobAd.contractType}
					</p>
				</div>

				<hr />
				<h4 className="h4-font-sz-job">
					<T>common.jobpostings.job_description</T>
				</h4>
				<div className="h4-font-sz">
					<article>
						<p>{props.jobAd.jobDescription}</p>
						<input
							id={props.jobAd.id}
							className="read-more-toggle"
							type="checkbox"
						/>
						<div className="read-more-content">
							<br />
							<h4>
								<T>common.jobpostings.qualifications</T>
							</h4>
							<p>{props.jobAd.qualifications} </p>
							<br />
							<div>
								<h4>
									<T>common.jobpostings.responsibilities</T>
								</h4>
								<p>{props.jobAd.responsibilities}</p>
							</div>
						</div>

						<label
							className="read-more-toggle-label"
							htmlFor={props.jobAd.id}
						>
							{" "}
						</label>
						<div className="fl-ri">
							<p>
								{i18n.__("common.jobpostings.posted_on")}{" "}
								{datePosted}
							</p>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
}

export default withUpdateOnChangeLocale(JobPosting);
