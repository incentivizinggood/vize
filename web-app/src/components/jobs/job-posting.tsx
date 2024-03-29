import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMapMarker,
	faMoneyBillAlt,
	faFileSignature,
	faClock,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import PopupModal from "src/components/popup-modal";
import ApplyToJobAdForm from "src/pages/apply-to-job-ad/apply-to-job-ad-form";
import { LinkButton } from "src/components/button";
import ReactMarkdown from "react-markdown";
import { forSize } from "src/responsive";
import * as urlGenerators from "src/pages/url-generators";
import { translations } from "src/translations";
import { JobPostingFragment } from "generated/graphql-operations";
import RatingsDropdown from "src/components/ratings-dropdown";
const T = translations.legacyTranslationsNeedsRefactor;
import { JobShift } from "src/components/job-shift";
import { borderRadius, boxShadow } from "src/global-styles";
import { absoluteDateToRelativeDate } from "src/utils";

const FontAwesomeIconSized = styled(FontAwesomeIcon)`
	width: 16px !important;
	height: 16px;
	margin-right: 10px;
`;

const JobContainer = styled.div`
	margin-top: 15px;
	margin-bottom: 15px;
	padding: 20px 30px;

	background-color: white;
	border-radius: ${borderRadius.container};
	box-shadow: ${boxShadow.wide};

	${forSize.tabletAndDown} {
		padding: 12px;
	}
`;

const ApplyNowButton = styled(LinkButton)`
	padding: 12px 25px !important;
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
	isMinimizable: boolean; // If false, the abimity to expand and minimize the job post will be disabled
}

function JobPosting({
	job,
	isMinimizable = true,
}: JobPostingProps): JSX.Element {
	const datePosted = new Date(job.created);
	const DatePostedComponent = (): JSX.Element => {
		return absoluteDateToRelativeDate(datePosted);
	};

	let [jobApplicationModal, setJobApplicationModal] = React.useState(null);

	function ShowApplyToJobModal(): void {
		const applyToJobModalTitle = `Aplicar a ${job.company.name}`;

		setJobApplicationModal(
			<PopupModal
				isOpen={true}
				modalTitle={applyToJobModalTitle}
				setJobApplicationModal={setJobApplicationModal}
			>
				<ApplyToJobAdForm jobAdId={job.id} modalIsOpen={true} />
			</PopupModal>
		);
	}

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

	// True if there is a city and an industrial hub for a job
	const isTwoJobLocations =
		job.locations[0].city && job.locations[0].industrialHub;
	const showJobShift =
		(job.startTime && job.endTime) || (job.startDay && job.endDay);

	// A job post will not be minimizable if we are only looking at that one job post (using the job post link).
	// In this case, we want to display all of the data for the job post without having to minizmize or expand the details
	const QualificationsAndResponsibilities = () => {
		if (isMinimizable) {
			return (
				<div className="read-more-content">
					<br />
					<h4>
						<T.showjob.qualifications />
					</h4>
					<ReactMarkdown source={job.qualifications} />
					<br />
					<div>
						<h4>
							<T.showjob.responsibilities />
						</h4>
						<ReactMarkdown source={job.responsibilities} />
					</div>
				</div>
			);
		}
		return (
			<>
				<br />
				<h4>
					<T.showjob.qualifications />
				</h4>
				<ReactMarkdown source={job.qualifications} />
				<br />
				<div>
					<h4>
						<T.showjob.responsibilities />
					</h4>
					<ReactMarkdown source={job.responsibilities} />
				</div>
			</>
		);
	};

	return (
		<JobContainer>
			<JobTitleAndApplyButtonContainer>
				<h3>
					<strong>{job.jobTitle}</strong>
				</h3>
				<ApplyNowButton $primary onClick={ShowApplyToJobModal}>
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
						companyId={job.company.id}
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

			{showJobShift && (
				<div>
					<FontAwesomeIconSized icon={faClock} />
					<JobShift
						startTime={job.startTime}
						endTime={job.endTime}
						startDay={job.startDay}
						endDay={job.endDay}
					/>
				</div>
			)}

			<hr />
			<h4 className="h4-font-sz-job">
				<T.showjob.job_description />
			</h4>
			<div className="h4-font-sz">
				<article>
					<ReactMarkdown source={job.jobDescription} />
					<input
						id={job.id}
						className="read-more-toggle"
						type="checkbox"
					/>

					<QualificationsAndResponsibilities />

					{isMinimizable && (
						<label
							className="read-more-toggle-label"
							htmlFor={job.id}
						/>
					)}

					<DatePostedDiv>
						<p>
							<DatePostedComponent />
						</p>
					</DatePostedDiv>
				</article>
			</div>
			{jobApplicationModal}
		</JobContainer>
	);
}

export default JobPosting;
