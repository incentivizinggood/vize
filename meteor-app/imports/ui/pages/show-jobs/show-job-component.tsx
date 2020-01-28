import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMapMarker,
	faMoneyBillAlt,
	faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { forSize } from "imports/ui/responsive.js";
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

	const JobContainer = styled.div`
		margin-top: 15px;
		padding: 20px 30px;

		background-color: white;
		box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08),
			0 2px 4px 0 rgba(0, 0, 0, 0.12);
	`;

	const DatePostedDiv = styled.div`
		float: right;
		margin-top: -32px;

		${forSize.tabletAndDown} {
			float: none;
			margin-top: 0px;
			text-align: center !important;
		}
	`;

	const datePosted = new Date(props.item.created);
	const companyProfileUrl = `/companyprofile/?id=${props.item.company.id}`;

	return (
		<JobContainer>
			<h3>
				<strong>{props.item.jobTitle}</strong>
			</h3>
			<br />
			<h3 style={{ fontSize: "20px" }}>
				<Link to={companyProfileUrl}>
					<strong>{props.item.company.name}</strong>
				</Link>
			</h3>

			<div
				className="add-buttons"
				style={{ float: "right", marginTop: "0px" }}
			>
				<Link
					to={urlGenerators.vizeApplyForJobUrl(props.item.id)}
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
				{processLocation(JSON.stringify(props.item.locations[0]))}
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
					<DatePostedDiv>
						<p>
							<T.showjob.posted_on />{" "}
							{datePosted.toLocaleDateString("es-MX", options)}
						</p>
					</DatePostedDiv>
				</article>
			</div>
		</JobContainer>
	);
}

export default ShowJobComponent;
