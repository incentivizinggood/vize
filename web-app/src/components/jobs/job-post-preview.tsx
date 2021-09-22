import React from "react";
import styled from "styled-components";
import { JobPostInterface } from "../../pages/show-jobs/show-jobs";
import RatingsDropdown from "../ratings-dropdown";
import { Button } from "src/components/button";
import dollarImage from "../../images/job-post-icons/dollar.png";
import addressImage from "../../images/job-post-icons/address.png";
import jobTypeImage from "../../images/job-post-icons/job-type.png";
import shiftsImage from "../../images/job-post-icons/shifts.png";
import { borderRadius, boxShadow } from "src/global-styles";
import { forSize } from "src/responsive";

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
const ShiftDay = styled.span`
	color: black;
`;
const ShiftTime = styled.span`
	font-weight: 600;
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
	button{
		width:200px;
		padding: 0.9rem 2rem !important;
	}
	${forSize.phoneOnly} {
		button{
			width: 125px;
			padding: 0.7rem 0.4rem !important;
			font-size: 12px;
		}
	}
`;
interface JobPostPreviewProps {
	job: JobPostInterface;
	hideButtons?: boolean;
	openJobDetail?: (options: any) => void;
}
export default function JobPostPreview(
	props: JobPostPreviewProps
): JSX.Element {
	const { job, openJobDetail, hideButtons } = props;

	return (
		<JobPostPreviewWrapper
			onClick={() => {
				if (openJobDetail) {
					openJobDetail({ visible: true, jobPost: job });
				}
			}}
		>
			<HeaderContainer>
				<CompanyLogo src={job.companyLogo} alt="Company Logo" />
				<HeaderTextItemsContainer>
					<CompanyNameAndPostedDateContainer>
						<CompanyName>{job.company}</CompanyName>
						<PostedDate>Posted {job.postedTimeAgo}</PostedDate>
					</CompanyNameAndPostedDateContainer>
					<JobTitle>{job.jobPost}</JobTitle>
					<RatingWrapper>
						<RatingsDropdown
							ratings={{
								healthAndSafety: job.rating,
								managerRelationship: job.rating,
								workEnvironment: job.rating,
								benefits: job.rating,
								overallSatisfaction: job.rating,
							}}
							numReviews={job.reviewCount}
							companyName=""
						/>
						<ReviewCount>{job.reviewCount} Reviews</ReviewCount>
					</RatingWrapper>
				</HeaderTextItemsContainer>
			</HeaderContainer>
			<JobDetailsContainer>
				<JobDetailContainer>
					<img src={dollarImage} alt="Salary Icon" />
					<JobDetailText>{job.salaryRange}</JobDetailText>
				</JobDetailContainer>
				<JobDetailContainer>
					<img src={jobTypeImage} alt="Contract Type Icon" />
					<JobDetailText>{job.jobType}</JobDetailText>
				</JobDetailContainer>
				<JobDetailContainer>
					<img src={addressImage} alt="Location Icon" />
					<JobDetailText>
						{[job.city, job.industrialPark].join(", ")}
					</JobDetailText>
				</JobDetailContainer>
				<JobDetailContainer>
					<ShiftsIcon src={shiftsImage} alt="Shifts Icon" />
					{job.shifts.map((shift, index) => {
						return <ShiftContainer border={index < job.shifts.length - 1} key={index}>
							<ShiftDay>{shift.day}</ShiftDay>
							<ShiftTime>{shift.time}</ShiftTime>
						</ShiftContainer>;
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
