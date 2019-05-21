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
import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

const T = i18n.createComponent();

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
			<div className="sect_re11 ">
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
							to={urlGenerators.vizeApplyForJobUrl(props.item.id)}
							className="btn btn-primary"
						>
							{" "}
							{i18n.__("common.showjob.apply_now")}
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
						<T>common.showjob.hour</T>
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
					<T>common.showjob.job_description</T>
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
								<T>common.showjob.qualifications</T>
							</h4>
							<p>{props.item.qualifications} </p>
							<br />
							<div>
								<h4>
									<T>common.showjob.responsibilities</T>
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
								<T>common.showjob.posted_on</T>{" "}
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

export default withUpdateOnChangeLocale(ShowJobComponent);
