import React from "react";
import styled from "styled-components";
import { colors } from "src/global-styles";
import { Row, Col } from "react-bootstrap";
import { LinkButton } from "src/components/button";
import { StarRatings as Ratings } from "generated/graphql-operations";
import { queryRoutes } from "src/pages/url-generators";

import WorkIcon from "@material-ui/icons/Work";
import JobPostPreview from "./job-post-preview";
import CompanyRatingWrapper from "./company-rating-wrapper";
import ReviewDetails from "./review-details";
import SalaryComponent from "./salary-component";
import descriptionImage from "../../images/job-post-icons/description.png";
import RateReviewIcon from "@material-ui/icons/RateReview";
import ReactMarkdown from "react-markdown";

const CompanyContent = styled.div`
	padding-top: 20px;
`;
const JobRequirementWrapper = styled.div`
	margin-top: 20px;
`;
const JobRequirementTitle = styled.div`
	font-weight: 600;
	padding-left: 10px;
`;
const JobRequirementDescription = styled.div`
	margin-top: 10px;
	display: flex;
	flex-wrap: wrap;
	margin-left: 10px;
`;
const JobCompanyBasicDetail = styled.div`
	padding: 10px;
	.row {
		margin-bottom: 10px;
	}
`;

const CommpanyReviewsWrapper = styled.div`
	margin-top: 40px;
`;
const ReviewTitleRow = styled.div`
	display: flex;
	justify-content: space-between;
`;

const NumberOfReview = styled.div`
	display: flex;
	align-items: center;
	font-weight: 900;
	font-size: 16px;
	svg {
		color: ${colors.secondaryColorGreen};
	}
`;

const ViewAllButton = styled.div`
	margin-top: 10px;
	margin-bottom: 10px;
	display: flex;
	justify-content: center;
`;

const JobLocationList = styled.div`
	display: flex;
	flex-direction: column;
	width: 75%;
`;
const JobLocationText = styled.span``;
const SectionTitle = styled.h3``;
const JobList = styled(Row)`
	margin-top: 10px;
`;
const ExtraDetailsContainer = styled.div`
	display: flex;
	margin-bottom: 15px;
`;
const ExtraTitleContent = styled.div`
	width: 25%;
`;

interface CompanyContentWrapperInterface {
	company: {
		id: string;
		name: string;
		avgStarRatings?: Ratings;
		numReviews: number;
		descriptionOfCompany: string;
		numEmployees: number;
		industry: string;
		websiteURL: string;
		locations: {
			city: string;
			industrialPark: string;
			address: string;
		}[];
	};
}

export default function CompanyContentWrapper({
	company,
}: CompanyContentWrapperInterface): JSX.Element {
	return (
		<CompanyContent>
			<SectionTitle>Resumen de {company.name}</SectionTitle>
			<JobRequirementWrapper>
				<JobRequirementTitle>
					<img src={descriptionImage} alt=""></img>
					<span>&nbsp;Descripción</span>
				</JobRequirementTitle>
				<JobRequirementDescription>
					<ReactMarkdown source={company.descriptionOfCompany} />
				</JobRequirementDescription>
			</JobRequirementWrapper>
			<JobCompanyBasicDetail>
				<ExtraDetailsContainer>
					<ExtraTitleContent>
						<span>
							<strong>Tamaño</strong>
						</span>
					</ExtraTitleContent>
					<span>{company.numEmployees}</span>
				</ExtraDetailsContainer>
				<ExtraDetailsContainer>
					<ExtraTitleContent>
						<span>
							<strong>Industria</strong>
						</span>
					</ExtraTitleContent>
					<span>{company.industry}</span>
				</ExtraDetailsContainer>
				<ExtraDetailsContainer>
					<ExtraTitleContent>
						<span>
							<strong>Sitio Web</strong>
						</span>
					</ExtraTitleContent>
					<span>
						<a
							href={company.websiteURL}
							rel="noreferrer"
							target="_blank"
						>
							{company.websiteURL}
						</a>
					</span>
				</ExtraDetailsContainer>
				<ExtraDetailsContainer>
					<ExtraTitleContent>
						<span>
							<strong>Ubicación</strong>
						</span>
					</ExtraTitleContent>
					<JobLocationList>
						{company.locations.map((location, i) => {
							return (
								<JobLocationText key={i}>
									{location.address}, {location.city}{" "}
									{location.industrialPark &&
										`, ${location.industrialPark}`}
								</JobLocationText>
							);
						})}
					</JobLocationList>
				</ExtraDetailsContainer>
			</JobCompanyBasicDetail>
			{company.avgStarRatings && (
				<>
					<CompanyRatingWrapper
						companyName={company.name}
						ratings={company.avgStarRatings}
						percentRecommended={company.percentRecommended}
						avgNumMonthsWorked={company.avgNumMonthsWorked}
					/>
					<CommpanyReviewsWrapper>
						{company.reviews.map((review: any, index: number) => {
							return (
								<ReviewDetails
									review={review}
									key={index}
								></ReviewDetails>
							);
						})}
						<ViewAllButton>
							<LinkButton
								to={`/${queryRoutes.companyProfile}/${company.id}/${queryRoutes.reviews}`}
								$primary
							>
								Ver Todas las Evaluaciones
							</LinkButton>
						</ViewAllButton>
					</CommpanyReviewsWrapper>
				</>
			)}

			{/* <CommpanyReviewsWrapper>
				<ReviewTitleRow>
					<NumberOfReview>
						<RateReviewIcon />
						<span>
							&nbsp;
							{company.salaryStats
								? company.salaryStats.length
								: 0}{" "}
							Salary
						</span>
					</NumberOfReview>
				</ReviewTitleRow>
				{company.salaryStats.map((salary: any, index: number) => {
					return <SalaryComponent {...salary} key={index}></SalaryComponent>;
				})}
				<ViewAllButton>
					<Button $primary>View All Salaries</Button>
				</ViewAllButton>
			</CommpanyReviewsWrapper> */}
			{/* <CommpanyReviewsWrapper>
				<ReviewTitleRow>
					<NumberOfReview>
						<WorkIcon />
						<span>&nbsp;Additional Jobs</span>
					</NumberOfReview>
				</ReviewTitleRow>
				<JobList>
					{company.jobAds.map((job: any, index: number) => {
						return (
							<Col xs={12} sm={6} md={6} key={index}>
								<JobPostPreview job={job} hideButtons />
							</Col>
						);
					})}
				</JobList>
				<ViewAllButton>
					<Button $primary>View All Jobs</Button>
				</ViewAllButton>
			</CommpanyReviewsWrapper> 
            */}
		</CompanyContent>
	);
}
