import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TodayIcon from "@material-ui/icons/Today";
import {
	faMapMarker,
	faMoneyBillAlt,
	faFileSignature,
	faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import colors from "src/colors";

import { forSize } from "src/responsive";
import { processLocation } from "src/misc";
import * as urlGenerators from "src/pages/url-generators";
import { translations } from "src/translations";
import { JobPostingFragment } from "generated/graphql-operations";
import RatingsDropdown from "src/pages/company-profile/articles/ratings-dropdown";
const T = translations.legacyTranslationsNeedsRefactor;
const TJobAd = translations.createJobAd.fields;

const FontAwesomeIconSized = styled(FontAwesomeIcon)`
	width: 16px !important;
	height: 16px;
	margin-right: 8px;
`;

const JobContainer = styled.div`
	margin-top: 15px;
	margin-bottom: 15px;
	padding: 20px 30px;

	background-color: white;
	border-radius: 10px;
	box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);

	${forSize.tabletAndDown} {
		padding: 12px;
	}
`;

const ApplyNowButton = styled(Link)`
	background-color: ${colors.vizeBlue};
	color: white;
	font-weight: bold;
	border-radius: 6px;
	font-size: 15px;
	padding: 8px 15px;
	max-height: 40px;
	min-width: 110px;

	&:hover {
		color: white;
		filter: grayscale(80%);
	}
`;

const JobTitleAndApplyButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
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
	console.log(job);
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const datePosted = new Date(job.created);

	const dayValueToText: { [key: number]: JSX.Element } = {
		1: <TJobAd.jobSchedule.monday />,
		2: <TJobAd.jobSchedule.tuesday />,
		3: <TJobAd.jobSchedule.wednesday />,
		4: <TJobAd.jobSchedule.thursday />,
		5: <TJobAd.jobSchedule.friday />,
		6: <TJobAd.jobSchedule.saturday />,
		0: <TJobAd.jobSchedule.sunday />,
	};

	const startDay = job.startDay ? dayValueToText[job.startDay] : "";
	const endDay = job.endDay ? dayValueToText[job.endDay] : "";

	let shiftTimeRange = "";

	if (job.startTime && job.endTime) {
		const startTimeNum = Number(job.startTime.substring(0, 2));
		const startTimeSuffix = startTimeNum >= 12 ? "PM" : "AM";
		let startTime = String(((startTimeNum + 11) % 12) + 1);
		startTime += job.startTime.substring(2, 5);

		const endTimeNum = Number(job.endTime.substring(0, 2));
		const endTimeSuffix = endTimeNum >= 12 ? "PM" : "AM";
		let endTime = String(((endTimeNum + 11) % 12) + 1);
		endTime += job.endTime.substring(2, 5);

		shiftTimeRange =
			" | " +
			startTime +
			" " +
			startTimeSuffix +
			" - " +
			endTime +
			" " +
			endTimeSuffix;
	}

	const workSchedule = startDay + " - " + endDay;
	console.log(workSchedule);

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
	// True if there is a city and an industrial hub for a job
	const isTwoJobLocations =
		job.locations[0].city && job.locations[0].industrialHub;

	if (job.locations[0].city && job.locations[0].industrialHub) {
		jobLocation =
			job.locations[0].city +
			" {&#8226;} " +
			job.locations[0].industrialHub;
	}

	return (
		<JobContainer>
			<JobTitleAndApplyButtonContainer>
				<h3>
					<strong>{job.jobTitle}</strong>
				</h3>
				<ApplyNowButton to={urlGenerators.vizeApplyForJobUrl(job.id)}>
					<T.showjob.apply_now />
				</ApplyNowButton>
			</JobTitleAndApplyButtonContainer>
			<br />
			<h3 style={{ fontSize: "20px" }}>
				<Link to={urlGenerators.vizeCompanyProfileUrl(job.company.id)}>
					<strong>{job.company.name}</strong>
				</Link>
			</h3>

			{job.company.avgStarRatings &&
				job.company.avgStarRatings.benefits != 0 && (
					<RatingsDropdown
						ratings={job.company.avgStarRatings}
						numReviews={job.company.numReviews}
						companyName={job.company.id}
					/>
				)}
			<div>
				<FontAwesomeIconSized icon={faMapMarker} />
				{isTwoJobLocations && (
					<>
						{job.locations[0].city}&nbsp;&#8226;&nbsp;
						{job.locations[0].industrialHub}
					</>
				)}
			</div>
			<div>
				<FontAwesomeIconSized icon={faMoneyBillAlt} />
				{job.salaryMin === job.salaryMax ? (
					job.salaryMin
				) : (
					<>
						{"$"}
						{job.salaryMin} - {"$"}
						{job.salaryMax}
					</>
				)}{" "}
				{
					{
						YEARLY_SALARY: <T.showjob.year />,
						MONTHLY_SALARY: <T.showjob.month />,
						WEEKLY_SALARY: <T.showjob.week />,
						DAILY_SALARY: <T.showjob.day />,
						HOURLY_WAGE: <T.showjob.hour />,
					}[job.salaryType]
				}
			</div>
			<div>
				<FontAwesomeIconSized icon={faFileSignature} />
				{contractType}
			</div>
			<div>
				<FontAwesomeIconSized icon={faClock} />
				{startDay}
				{" - "}
				{endDay}
				{shiftTimeRange}
			</div>
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
