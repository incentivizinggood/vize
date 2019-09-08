import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMapMarker,
	faMoneyBillAlt,
	faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { processLocation } from "imports/ui/misc";
import { urlGenerators } from "imports/ui/pages";
import { translations } from "imports/ui/translations";

const T = translations.legacyTranslationsNeedsRefactor;

function ShowJobComponent(props) {
	// @options -  For the date formatting
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const datePosted = new Date(props.item.created);

	return (
		<div className="col-md-12 section_rview_back_color05 ">
			<div className="sect-padding ">
				<div>
					<h3>
						<strong>{props.item.company.name}</strong>
					</h3>
					<br />
					<h4>
						<strong>{props.item.jobTitle}</strong>
					</h4>
				</div>

				<div>
					<div
						className="add-buttons"
						style={{ float: "right", marginTop: "0px" }}
					>
						<Link
							to={{
								pathname: urlGenerators.vizeApplyForJobUrl(
									props.item.id
								),
								state: {
									prevPath: location.pathname,
								},
							}}
							className="btn btn-primary"
						>
							{" "}
							<T.showjob.apply_now />
						</Link>
					</div>
					<p>
						{" "}
						<FontAwesomeIcon icon={faMapMarker} />
						&nbsp;&nbsp;&nbsp;
						{processLocation(
							JSON.stringify(props.item.locations[0])
						)}
					</p>
					<p>
						{" "}
						<FontAwesomeIcon icon={faMoneyBillAlt} />
						&nbsp;&nbsp;
						{props.item.pesosPerHour}
						<T.showjob.hour />
					</p>
					<p>
						{" "}
						<FontAwesomeIcon icon={faCalendar} />
						&nbsp;&nbsp;
						{props.item.contractType}
					</p>
				</div>

				<hr />
				<h4 className="h4-font-sz-job">
					<T.showjob.job_description />
				</h4>
				<div className="h4-font-sz">
					<article>
						<p>{props.item.jobDescription}</p>
						<input
							id={props.item.id}
							className="read-more-toggle"
							type="checkbox"
						/>
						<div className="read-more-content">
							<br />
							<h4>
								<T.showjob.qualifications />
							</h4>
							<p>{props.item.qualifications} </p>
							<br />
							<div>
								<h4>
									<T.showjob.responsibilities />
								</h4>
								<p>{props.item.responsibilities}</p>
							</div>
						</div>

						<label
							className="read-more-toggle-label"
							htmlFor={props.item.id}
						>
							{" "}
						</label>
						<div className="fl-ri">
							<p>
								<T.showjob.posted_on />{" "}
								{datePosted.toLocaleDateString(
									"en-US",
									options
								)}
							</p>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
}

export default ShowJobComponent;
