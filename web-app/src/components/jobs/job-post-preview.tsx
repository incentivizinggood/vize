import React from "react";
import styled from "styled-components";
import { JobPost } from "src/components/jobs/new-job-post";
import RatingsDropdown from "../ratings-dropdown";
import { Button } from "src/components/button";
import dollarImage from "../../images/job-post-icons/dollar.png";
import addressImage from "../../images/job-post-icons/address.png";
import jobTypeImage from "../../images/job-post-icons/job-type.png";
import shiftsImage from "../../images/job-post-icons/shifts.png";
import { borderRadius, boxShadow } from "src/global-styles";
import { forSize } from "src/responsive";
import { JobShift } from "../job-shift";
import { absoluteDateToRelativeDate } from "src/utils";
import {
	contractTypeTranlsations,
	salaryTypeTranlsations,
} from "api-server/src/utils/translation-utils";

import { translations } from "src/translations";

const T = translations.legacyTranslationsNeedsRefactor;

const ShiftContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 10px;
	border-right: ${(p: { withImage?: boolean; border: boolean }) =>
		p.border ? "1px solid #efefef" : ""};
	padding-right: 10px;
	margin-right: ${(p: { withImage?: boolean; border: boolean }) =>
		p.withImage ? "10px" : ""};
`;

const JobPostPreviewWrapper = styled.div`
	background: #fff;
	border-radius: ${borderRadius.container};
	margin-bottom: 10px;
	padding: 20px;
	box-shadow: ${boxShadow.wide};
	cursor: pointer;
	${forSize.phoneOnly} {
		padding: 7px 5px;
	}
`;
const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: start;
	width: 100%;
`;
const CompanyLogo = styled.img`
	height: 68px;
	width: 68px;
	border-radius: ${borderRadius.container};
	margin-right: 20px;
	${forSize.phoneOnly} {
		margin-right: 10px;
		height: 55px;
		width: 55px;
	}
`;
const HeaderTextItemsContainer = styled.div`
	flex-grow: 1;
`;
const CompanyNameAndPostedDateContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
const CompanyName = styled.div`
	color: black;
	font-size: 13px;
`;
const PostedDate = styled.div`
	color: grey;
	font-size: 13px;
`;
const JobTitle = styled.div`
	font-weight: 700;
	font-size: 18px;
	${forSize.phoneOnly} {
		font-size: 14px;
	}
`;
const ReviewCount = styled.div`
	color: black;
	font-size: 13px;
	margin-left: 5px;
`;
const RatingWrapper = styled.div`
	display: flex;
	align-items: center;
`;
const JobDetailsContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 10px;
`;
const JobDetailContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	img {
		width: 18px;
		height: 18px;
	}
	margin-bottom: 10px;
`;

const JobDetailText = styled.div`
	font-weight: 600;
	padding-left: 10px;
`;

const ShiftsIcon = styled.img`
	width: 26px;
	height: 26px;
`;
const ButtonsContainer = styled.div`
	margin-top: 10px;
	margin-bottom: 10px;
	display: flex;
	justify-content: space-around;
	button {
		width: 200px;
		padding: 0.9rem 2rem !important;
		margin: 0 10px;
	}
	${forSize.phoneOnly} {
		button {
			padding: 0.7rem 0.4rem !important;
			font-size: 12px;
		}
	}
`;
interface JobPostPreviewProps {
	job: JobPost;
	hideButtons?: boolean;
	openJobDetail?: (options: any) => void;
}
export default function JobPostPreview(
	props: JobPostPreviewProps
): JSX.Element {
	const { job, openJobDetail, hideButtons } = props;

	const datePosted = new Date(props.job.created);
	const DatePostedComponent = (): JSX.Element => {
		return absoluteDateToRelativeDate(datePosted);
	};

	console.log("job", job);

	const contractType = contractTypeTranlsations[job.contractType];
	const salaryType = job.salaryType
		? salaryTypeTranlsations[job.salaryType]
		: null;

	// True if there is a city and an industrial hub for a job
	const isTwoJobLocations =
		job.locations[0].city && job.locations[0].industrialHub;

	return (
		<JobPostPreviewWrapper
			onClick={() => {
				if (openJobDetail) {
					openJobDetail({ visible: true, jobPost: job });
				}
			}}
		>
			<HeaderContainer>
				{/* <CompanyLogo src={job.companyLogo} alt="Company Logo" /> */}
				<HeaderTextItemsContainer>
					<CompanyNameAndPostedDateContainer>
						<CompanyName>{job.company.name}</CompanyName>
						<PostedDate>
							<DatePostedComponent />
						</PostedDate>
					</CompanyNameAndPostedDateContainer>
					<JobTitle>{job.jobTitle}</JobTitle>
					{job.company.avgStarRatings && (
						<RatingWrapper>
							<RatingsDropdown
								ratings={{
									healthAndSafety:
										job.company.avgStarRatings
											.healthAndSafety,
									managerRelationship:
										job.company.avgStarRatings
											.managerRelationship,
									workEnvironment:
										job.company.avgStarRatings
											.workEnvironment,
									benefits:
										job.company.avgStarRatings.benefits,
									overallSatisfaction:
										job.company.avgStarRatings
											.overallSatisfaction,
								}}
								numReviews={job.reviewCount}
								companyName={job.company.name}
							/>
							<ReviewCount>
								{job.company.numReviews} Reviews
							</ReviewCount>
						</RatingWrapper>
					)}
				</HeaderTextItemsContainer>
			</HeaderContainer>
			<JobDetailsContainer>
				<JobDetailContainer>
					<img src={dollarImage} alt="Salary Icon" />
					<JobDetailText>
						${job.salaryMin} - ${job.salaryMax} pesos / {salaryType}
					</JobDetailText>
				</JobDetailContainer>
				<JobDetailContainer>
					<img src={jobTypeImage} alt="Contract Type Icon" />
					<JobDetailText>{contractType}</JobDetailText>
				</JobDetailContainer>
				<JobDetailContainer>
					<img src={addressImage} alt="Location Icon" />
					<JobDetailText>
						{isTwoJobLocations
							? [
									job.locations[0].city,
									job.locations[0].industrialHub,
							  ].join(", ")
							: job.locations[0].city}
					</JobDetailText>
				</JobDetailContainer>
				<JobDetailContainer>
					<ShiftsIcon src={shiftsImage} alt="Shifts Icon" />
					{/* <ShiftDay>{startDay} - {endDay}</ShiftDay>
								<ShiftTime>{shift.startTime} - {shift.endTime}</ShiftTime> */}

					{job.shifts.map((shift, index) => {
						return (
							<ShiftContainer
								border={index < job.shifts.length - 1}
								key={index}
							>
								<JobShift
									startTime={shift.startTime}
									endTime={shift.endTime}
									startDay={shift.startDay}
									endDay={shift.endDay}
								/>
							</ShiftContainer>
						);
					})}
				</JobDetailContainer>
				{!hideButtons ? (
					<ButtonsContainer>
						<Button $primary>Postularme</Button>
						<Button>Show More Details</Button>
					</ButtonsContainer>
				) : null}
			</JobDetailsContainer>
		</JobPostPreviewWrapper>
	);
}
