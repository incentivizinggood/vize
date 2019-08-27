import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMapMarker,
	faMoneyBillAlt,
	faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { urlGenerators } from "imports/ui/pages";
import { processLocation } from "imports/ui/misc";
import { translations } from "imports/ui/translations";

const T = translations.legacyTranslationsNeedsRefactor;

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
							<T.jobpostings.apply_now />
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
						<T.jobpostings.week />
					</p>
					<p>
						<FontAwesomeIcon icon={faCalendar} />
						&nbsp;&nbsp;
						{props.jobAd.contractType}
					</p>
				</div>

				<hr />
				<h4 className="h4-font-sz-job">
					<T.jobpostings.job_description />
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
								<T.jobpostings.qualifications />
							</h4>
							<p>{props.jobAd.qualifications} </p>
							<br />
							<div>
								<h4>
									<T.jobpostings.responsibilities />
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
								<T.jobpostings.posted_on /> {datePosted}
							</p>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
}

export default JobPosting;
