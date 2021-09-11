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

const JobPostWrapper = styled.div`
	background: #fff;
	border-radius: ${borderRadius.container};
	margin-bottom: 10px;
	padding: 15px;
	box-shadow: ${boxShadow.wide};
	cursor: pointer;
`;
const JobPostHeaderRightSection = styled.div`
	display: flex;
	align-items: start;
	width: 100%;
`;
const JobPostFirstRow = styled.div`
	display: flex;
	justify-content: space-between;
`;
const PostImage = styled.img`
	height: 68px;
	width: 68px;
	border-radius: 6px;
	margin-right: 20px;
`;
const PostHeaderContent = styled.div`
	flex-grow: 1;
`;
const PostTitle = styled.div`
	color: black;
	font-size: 13px;
`;
const ReviewCount = styled.div`
	color: black;
	font-size: 13px;
	margin-left: 5px;
`;
const PostSubHeading = styled.div`
	font-weight: 700;
	font-size: 18px;
`;
const RatingWrapper = styled.div`
	display: flex;
	align-items: center;
`;
const JobDetail = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 10px;
`;
const JobDetailsTitle = styled.div`
	color: black;
	font-weight: 500;
	margin-bottom: 5px;
`;
const JobDetailvalue = styled.div`
	font-weight: 600;
	padding-left: 10px;
`;
const JobDetailContent = styled.div`
	display: flex;
	// padding-left: 10px;
	flex-wrap: wrap;
	img {
		width: 18px;
		height: 18px;
	}
	margin-bottom: 10px;
`;
const LanguageContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 10px;
	border-right: ${(p: { withImage?: boolean; border: boolean }) =>
		p.border ? "1px solid #efefef" : ""};
	padding-right: 10px;
	margin-right: ${(p: { withImage?: boolean; border: boolean }) =>
		p.withImage ? "10px" : ""};
`;
const LanguageTitle = styled.span`
	color: black;
`;
const LanguageDescription = styled.span`
	font-weight: 600;
`;
const LanguageImage = styled.img`
	width: 26px;
	height: 26px;
`;
const ActionsWrapper = styled.div`
	margin-top: 10px;
	margin-bottom: 10px;
	display: flex;
	justify-content: space-around;
`;
const TitleRow = styled.div`
	display: flex;
	justify-content: space-between;
`;
const PostedDate = styled.div`
	color: grey;
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
		<JobPostWrapper
			onClick={() => {
				if (openJobDetail) {
					openJobDetail({ visible: true, jobPost: job });
				}
			}}
		>
			<JobPostFirstRow>
				<JobPostHeaderRightSection>
					<PostImage src={job.companyLogo} alt="post-image" />
					<PostHeaderContent>
						<TitleRow>
							<PostTitle>{job.company}</PostTitle>
							<PostedDate>{job.postedTimeAgo}</PostedDate>
						</TitleRow>
						<PostSubHeading>{job.jobPost}</PostSubHeading>
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
					</PostHeaderContent>
				</JobPostHeaderRightSection>
			</JobPostFirstRow>
			<JobDetail>
				<JobDetailContent>
					<img src={dollarImage} alt="dollar-img" />
					<JobDetailvalue>{job.salaryRange}</JobDetailvalue>
				</JobDetailContent>
				<JobDetailContent>
					<img src={jobTypeImage} alt="dollar-img" />
					<JobDetailvalue>{job.jobType}</JobDetailvalue>
				</JobDetailContent>
				<JobDetailContent>
					<img src={addressImage} alt="dollar-img" />
					<JobDetailvalue>
						{[job.city, job.industrialPark].join(", ")}
					</JobDetailvalue>
				</JobDetailContent>
				<JobDetailContent>
					<LanguageImage src={shiftsImage} alt="dollar-img" />
					{job.shifts.map((v, index) => {
						return index < 2 ? (
							<LanguageContentWrapper border key={index}>
								<LanguageTitle>{v.day}</LanguageTitle>
								<LanguageDescription>
									{v.time}
								</LanguageDescription>
							</LanguageContentWrapper>
						) : null;
					})}
				</JobDetailContent>
				{!hideButtons ? (
					<ActionsWrapper>
						<Button $primary>Postularme</Button>
						<Button>Show More Details</Button>
					</ActionsWrapper>
				) : null}
			</JobDetail>
		</JobPostWrapper>
	);
}
