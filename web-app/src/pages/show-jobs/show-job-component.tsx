import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMapMarker,
	faMoneyBillAlt,
	faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import { forSize } from "src/responsive";
import { processLocation } from "src/misc";
import * as urlGenerators from "src/pages/url-generators";
import { translations } from "src/translations";

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
		padding: 15px 30px;

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

	let contractType =
		props.item.contractType === "FULL_TIME"
			? "Tiempo completo"
			: props.item.contractType === "PART_TIME"
			? "Medio tiempo"
			: props.item.contractType === "INTERNSHIP"
			? "Prácticas (Pasantía)"
			: props.item.contractType === "TEMPORARY"
			? "Proyecto (Temporal)"
			: "Contratista";

	return (
		<JobContainer>
			<h3>
				<strong>{props.item.jobTitle}</strong>
			</h3>
			<br />
			<h4>
				<strong>{props.item.company.name}</strong>
			</h4>

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
				{props.item.salaryMin === props.item.salaryMax ? (
					props.item.salaryMin
				) : (
					<>
						{props.item.salaryMin} to {props.item.salaryMax}
					</>
				)}
				{
					{
						YEARLY_SALARY: <T.showjob.year />,
						MONTHLY_SALARY: <T.showjob.month />,
						WEEKLY_SALARY: <T.showjob.week />,
						DAILY_SALARY: <T.showjob.day />,
						HOURLY_WAGE: <T.showjob.hour />,
					}[props.item.salaryType]
				}
			</p>
			<p>
				{" "}
				<FontAwesomeIcon icon={faCalendar} />
				&nbsp;&nbsp;
				{contractType}
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
