import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { colors } from "src/global-styles";
import { withStyles } from "@material-ui/core/styles";
import StarRatings from "react-star-ratings";
import { Button } from "src/components/button";

import { Row, Col, ListGroup } from "react-bootstrap";
import {
	JobPostTitleRow,
	JobContentWrapper,
} from "src/pages/for-employers/JobPost";
import Tabs from "@material-ui/core/Tabs";
import descriptionImage from "../../images/job-post-icons/description.png";
import StarsIcon from "@material-ui/icons/Stars";
import RateReviewIcon from "@material-ui/icons/RateReview";
import Tab from "@material-ui/core/Tab";
import LinearProgress from "@material-ui/core/LinearProgress";
import WorkIcon from "@material-ui/icons/Work";
import JobPostPreview from "./JobPostPreview";
const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 35,
		borderRadius: 16,
	},
	colorPrimary: {
		backgroundColor:
			theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
	},
	bar: {
		borderRadius: 16,
		backgroundColor: "#1a90ff",
	},
}))(LinearProgress);
const customStyles = {
	overlay: {
		backgroundColor: "#000000a3",
		zIndex: 999,
	},
	content: {
		top: "20%",
		margin: "0 auto",
		minWidth: "760px",
		maxWidth: "760px",
		minHeight: "600px",
	},
};
interface JobDetailModalProps {
	visible: boolean;
	jobPost: any;
	onClose: () => void;
}
const StyledModal = styled(Modal)`
	:focus-visible {
		outline: none;
	}
	.ReactModal__Overlay {
		z-index: 999;
	}
	.PrivateTabIndicator-colorPrimary-3 {
		background-color: ${colors.primaryColorBlue} !important;
	}
	.MuiTab-wrapper {
		font-weight: 900;
		color: #000000;
	}
	.MuiTabs-root {
		border-bottom: 1px solid #efefef;
	}
`;
const JobPostContent = styled.div`
	margin-top: 40px;
	background: white;
	padding: 10px 20px;
	border-radius: 16px;
	height: 100%;
`;
const ScrollableContent = styled.div`
	height: 430px;
	overflow-y: auto;
	overflow-x: hidden;
`;
const CompanyContent = styled.div``;
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
const CompanyRatingsWrapper = styled.div``;
const CompanyRating = styled.div`
	border-radius: 6px;
	background-color: #eaf7ff;
	.list-group-item:first-child {
		background: #eaf7ff;
	}
`;
const RatingContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;
const StatesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: inherit;
`;
const Stats = styled.div`
	background-color: #eaf7ff;
	border-radius: 6px;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 50%;
	margin-bottom: 10px;
	borded: 1px solid #efefef;
	div {
		width: 200px;
		text-align: center;
	}
`;
const RatingTitle = styled.div`
	display: flex;
	align-items: center;
	background-color: #eaf7ff;
	padding: 5px;
	font-weight: 900;
	font-size: 16px;
	svg {
		color: ${colors.secondaryColorGreen};
	}
`;
const StatesTitle = styled.div`
	color: ${colors.primaryColorBlue};
	font-size: 36px;
	font-weight: 900;
`;
const Column = styled(Col)`
	height: 300px;
`;
const CommpanyReviewsWrapper = styled.div`
	margin-top: 20px;
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
const ViewAllReview = styled.div`
	a {
		color: ${colors.primaryColorBlue};
		text-decoration: underline;
		cursor: pointer;
	}
`;
const ReviewDetails = styled.div`
	padding: 5px;
	margin-top: 10px;
	border-radius: 6px;
	border: 1px solid #efefef;
	background-color: #f9f9f9;
`;
const ReviewHeader = styled.div`
	display: flex;
	justify-content: space-between;
`;
const ReviewedBy = styled.div`
	display: flex;
	span {
		font-size: 16px;
		font-weight: 700;
	}
`;
const PostedDate = styled.span`
	color: grey;
`;
const ReviewRating = styled.button``;
const ReviewComments = styled.div`
	display: flex;
	flex-direction: column;
`;
const ReviewCommentsRow = styled(Row)`
	margin: 0px;
	display: flex;
	justify-content: space-between;
`;
const ReviewCommentsColumn = styled(Col)`
	border-radius: 6px;
	padding: 20px;
	border: 1px solid #efefef;
	margin: 5px;
	background-color: #fff;
	position: relative;
	margin-top: 10px;
`;
const ReviewCommentHeader = styled(Col)`
	position: absolute;
	top: -10px;
	left: 15px;
	padding: 2px 10px;
	background: #efefef;
	border-radius: 16px;
`;
const AveeragePay = styled.div`
	margin-top: 20px;
	margin-bottom: 20px;
`;
const GreyText = styled.span`
	color: grey;
`;
const SalaryRangeValues = styled.span`
	display: flex;
	justify-content: space-between;
`;

Modal.setAppElement("#app-root");
export default function JobDetailModal(
	props: JobDetailModalProps
): JSX.Element {
	const { visible, jobPost, onClose } = props;
	const [activetTab, setActiveTab] = useState(1);
	console.log("jobPost", jobPost);
	return (
		<StyledModal
			isOpen={visible}
			onRequestClose={onClose}
			style={customStyles}
		>
			<JobPostContent>
				<JobPostTitleRow
					{...jobPost}
					modal
					onClose={onClose}
				></JobPostTitleRow>
				<Tabs
					value={activetTab}
					indicatorColor="primary"
					textColor="primary"
					onChange={(e, newValue) => {
						setActiveTab(newValue);
					}}
					aria-label="disabled tabs example"
				>
					<Tab value={1} label="Job" />
					<Tab value={2} label="Company" />
				</Tabs>
				{activetTab === 1 ? (
					<ScrollableContent>
						<JobContentWrapper {...jobPost}></JobContentWrapper>
					</ScrollableContent>
				) : (
					<ScrollableContent>
						<CompanyContent>
							<JobRequirementWrapper>
								<JobRequirementTitle>
									<img src={descriptionImage} alt=""></img>
									<span>&nbsp;Descripción</span>
								</JobRequirementTitle>
								<JobRequirementDescription>
									{jobPost.companyDetail.description}
								</JobRequirementDescription>
							</JobRequirementWrapper>
							<JobCompanyBasicDetail>
								<Row>
									<Col md={3}>
										<strong>Size</strong>
									</Col>
									<Col>{jobPost.companyDetail.size}</Col>
								</Row>
								<Row>
									<Col md={3}>
										<strong>Industry</strong>
									</Col>
									<Col>{jobPost.companyDetail.industry}</Col>
								</Row>
								<Row>
									<Col md={3}>
										<strong>Website</strong>
									</Col>
									<Col>
										{jobPost.companyDetail.companyWebsite}
									</Col>
								</Row>
								<Row>
									<Col md={3}>
										<strong>Location</strong>
									</Col>
									<Col>{jobPost.companyDetail.location}</Col>
								</Row>
							</JobCompanyBasicDetail>
							<CompanyRatingsWrapper>
								<Row>
									<Column md={6}>
										<CompanyRating>
											<ListGroup>
												<ListGroup.Item>
													<RatingTitle>
														<StarsIcon />
														&nbsp;Ratings
													</RatingTitle>
												</ListGroup.Item>
												<ListGroup.Item>
													<RatingContainer>
														<span>
															Average Rating
														</span>
														<div>
															<StarRatings
																rating={
																	jobPost
																		.companyDetail
																		.ratings
																		.average
																}
																starDimension="15px"
																starSpacing="1.5px"
															/>
														</div>
													</RatingContainer>
												</ListGroup.Item>
												<ListGroup.Item>
													<RatingContainer>
														<span>
															Overall Satisfaction
														</span>
														<div>
															<StarRatings
																rating={
																	jobPost
																		.companyDetail
																		.ratings
																		.overallSatisfaction
																}
																starDimension="15px"
																starSpacing="1.5px"
															/>
														</div>
													</RatingContainer>
												</ListGroup.Item>
												<ListGroup.Item>
													<RatingContainer>
														<span>
															Health and Safety
														</span>
														<div>
															<StarRatings
																rating={
																	jobPost
																		.companyDetail
																		.ratings
																		.healthAndSafeety
																}
																starDimension="15px"
																starSpacing="1.5px"
															/>
														</div>
													</RatingContainer>
												</ListGroup.Item>
												<ListGroup.Item>
													<RatingContainer>
														<span>
															Work Environment
														</span>
														<div>
															<StarRatings
																rating={
																	jobPost
																		.companyDetail
																		.ratings
																		.workEnvironment
																}
																starDimension="15px"
																starSpacing="1.5px"
															/>
														</div>
													</RatingContainer>
												</ListGroup.Item>
												<ListGroup.Item>
													<RatingContainer>
														<span>
															Manager
															Relationships
														</span>
														<div>
															<StarRatings
																rating={
																	jobPost
																		.companyDetail
																		.ratings
																		.managerRelationships
																}
																starDimension="15px"
																starSpacing="1.5px"
															/>
														</div>
													</RatingContainer>
												</ListGroup.Item>
												<ListGroup.Item>
													<RatingContainer>
														<span>Benefits</span>
														<div>
															<StarRatings
																rating={
																	jobPost
																		.companyDetail
																		.ratings
																		.benefits
																}
																starDimension="15px"
																starSpacing="1.5px"
															/>
														</div>
													</RatingContainer>
												</ListGroup.Item>
											</ListGroup>
										</CompanyRating>
									</Column>
									<Column md={6}>
										<StatesWrapper>
											<Stats>
												<div>
													<StatesTitle>
														{
															jobPost
																.companyDetail
																.recommendationPercenteage
														}
														%
													</StatesTitle>
													<span>
														The percentage of
														reviewers that would
														recommend{" "}
														{jobPost.company} to a
														friend
													</span>
												</div>
											</Stats>
											<Stats>
												<div>
													<StatesTitle>
														{
															jobPost
																.companyDetail
																.averageStay
														}
													</StatesTitle>
													The average numbe of months
													that workeer stays at the
													factory
												</div>
											</Stats>
										</StatesWrapper>
									</Column>
								</Row>
							</CompanyRatingsWrapper>
							<CommpanyReviewsWrapper>
								<ReviewTitleRow>
									<NumberOfReview>
										<RateReviewIcon />
										<span>
											&nbsp;
											{
												jobPost.companyDetail
													.reviewCount
											}{" "}
											Reviews
										</span>
									</NumberOfReview>
									<ViewAllReview>
										<a href="#">View All Reviews</a>
									</ViewAllReview>
								</ReviewTitleRow>
								{jobPost.companyDetail.reviews.map(
									(v: any, index: number) => {
										return (
											<ReviewDetails key={index}>
												<ReviewHeader>
													<ReviewedBy>
														<span>
															{v.reviewedBy}
														</span>
														&nbsp;
														<PostedDate>
															{v.reviewedOn}
														</PostedDate>
													</ReviewedBy>
													<Button $primary>
														Recommends{" "}
														{jobPost.company}
													</Button>
												</ReviewHeader>
												<ReviewRating>
													<StarRatings
														rating={
															jobPost
																.companyDetail
																.ratings.average
														}
														starDimension="15px"
														starSpacing="1.5px"
													/>
												</ReviewRating>
												<ReviewComments>
													<ReviewCommentsRow>
														<ReviewCommentsColumn
															md={6}
														>
															<ReviewCommentHeader>
																Pros
															</ReviewCommentHeader>
															<span>
																{v.pros}
															</span>
														</ReviewCommentsColumn>
														<ReviewCommentsColumn
															md={6}
														>
															<ReviewCommentHeader>
																Cons
															</ReviewCommentHeader>
															<span>
																{v.cons}
															</span>
														</ReviewCommentsColumn>
													</ReviewCommentsRow>
													<ReviewCommentsRow>
														<ReviewCommentsColumn
															md={12}
														>
															<ReviewCommentHeader>
																AdditionalComments
															</ReviewCommentHeader>
															<span>
																{
																	v.additionalComments
																}
															</span>
														</ReviewCommentsColumn>
													</ReviewCommentsRow>
												</ReviewComments>
											</ReviewDetails>
										);
									}
								)}
							</CommpanyReviewsWrapper>
							<CommpanyReviewsWrapper>
								<ReviewTitleRow>
									<NumberOfReview>
										<RateReviewIcon />
										<span>
											&nbsp;
											{jobPost.companyDetail.salaries
												? jobPost.companyDetail.salaries
														.length
												: 0}{" "}
											Salary
										</span>
									</NumberOfReview>
									<ViewAllReview>
										<a href="#">View All Salaries</a>
									</ViewAllReview>
								</ReviewTitleRow>
								{jobPost.companyDetail.salaries.map(
									(v: any, index: number) => {
										return (
											<ReviewDetails key={index}>
												<ReviewHeader>
													<ReviewedBy>
														<span>
															{v.position}
														</span>
													</ReviewedBy>
												</ReviewHeader>
												<AveeragePay>
													<GreyText>Average</GreyText>{" "}
													<span>
														: $ {v.pay} / week
													</span>
												</AveeragePay>
												<BorderLinearProgress
													variant="determinate"
													value={50}
												/>
												<SalaryRangeValues>
													{v.range.map((v) => {
														return (
															<span key={v}>
																${v}
															</span>
														);
													})}
												</SalaryRangeValues>
											</ReviewDetails>
										);
									}
								)}
							</CommpanyReviewsWrapper>
							<CommpanyReviewsWrapper>
								<ReviewTitleRow>
									<NumberOfReview>
										<WorkIcon />
										<span>
											&nbsp;
											{jobPost.companyDetail.jobs
												? jobPost.companyDetail.jobs
														.length
												: 0}{" "}
											Jobs
										</span>
									</NumberOfReview>
									<ViewAllReview>
										<a href="#">View All Jobs</a>
									</ViewAllReview>
								</ReviewTitleRow>
								<Row>
									{jobPost.companyDetail.jobs.map(
										(v: any, index: number) => {
											return (
												<Col
													xs={12}
													sm={6}
													md={6}
													key={v.id}
												>
													<JobPostPreview
														job={...v}
														hideButtons
													/>
												</Col>
											);
										}
									)}
								</Row>
							</CommpanyReviewsWrapper>
						</CompanyContent>
					</ScrollableContent>
				)}
			</JobPostContent>
		</StyledModal>
	);
}
