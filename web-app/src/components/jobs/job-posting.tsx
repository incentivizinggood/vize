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
import { urlGenerators } from "src/pages";
import { translations } from "src/translations";
import { JobPostingFragment } from "generated/graphql-operations";
import RatingsDropdown from "src/pages/company-profile/articles/ratings-dropdown";
const T = translations.legacyTranslationsNeedsRefactor;

const JobContainer = styled.div`
	margin-top: 15px;
	margin-bottom: 15px;
	padding: 20px 30px;

	background-color: white;
	border-radius: 10px;
	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
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
interface JobPostingProps {
	job: JobPostingFragment;
}

function JobPosting({ job }: JobPostingProps) {
	// @options -  For the date formatting
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const datePosted = new Date(job.created);

	let contractType =
		job.contractType === "FULL_TIME" ? (
			<T.showjob.fullTime />
		) : job.contractType === "PART_TIME" ? (
			<T.showjob.partTime />
		) : job.contractType === "INTERNSHIP" ? (
			<T.showjob.internship />
		) : job.contractType === "TEMPORARY" ? (
			<T.showjob.temporary />
		) : (
			<T.showjob.contractor />
		);
	let jobLocation = processLocation(JSON.stringify(job.locations[0]));

	if (job.locations[0].city && job.locations[0].industrialHub) {
		jobLocation =
			job.locations[0].city + " | " + job.locations[0].industrialHub;
	}

	// {job.company.avgStarRatings &&
	// 	job.company.avgStarRatings.benefits != 0 && (
	// 		<RatingsDropdown ratings={job.company.avgStarRatings} />
	// 	)}

	return (
		<JobContainer>
			<h3>
				<strong>{job.jobTitle}</strong>
			</h3>
			<br />
			<h3 style={{ fontSize: "20px" }}>
				<Link to={urlGenerators.vizeCompanyProfileUrl(job.company.id)}>
					<strong>{job.company.name}</strong>
				</Link>
			</h3>

			<RatingsDropdown ratings={job.company.avgStarRatings} />

			<div
				className="add-buttons"
				style={{ float: "right", marginTop: "0px" }}
			>
				<Link
					to={urlGenerators.vizeApplyForJobUrl(job.id)}
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
				{jobLocation}
			</p>
			<p>
				{" "}
				<FontAwesomeIcon icon={faMoneyBillAlt} />
				&nbsp;&nbsp;
				{job.pesosPerHour}
				<T.showjob.hour />
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
					<p>{job.jobDescription}</p>
					<input
						id={job.id}
						className="read-more-toggle"
						type="checkbox"
					/>
					<div className="read-more-content">
						<br />
						<h4>
							<T.showjob.qualifications />
						</h4>
						<p>{job.qualifications} </p>
						<br />
						<div>
							<h4>
								<T.showjob.responsibilities />
							</h4>
							<p>{job.responsibilities}</p>
						</div>
					</div>

					<label className="read-more-toggle-label" htmlFor={job.id}>
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

export default JobPosting;
