import React, { useState, useRef } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { colors } from "src/global-styles";
import { withStyles } from "@material-ui/core/styles";
import StarRatings from "react-star-ratings";
import { Button } from "src/components/button";
import { borderRadius } from "src/global-styles";
import RatingsDropdownReview from "../ratings-dropdown-review";
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
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
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
	padding: 20px;
	border-radius: ${borderRadius.container};
	height: 100%;
`;
const ScrollableContent = styled.div`
	height: 410px;
	overflow-y: auto;
	overflow-x: hidden;
	padding: 10px;
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
	border-radius: ${borderRadius.container};
	background-color: #eaf7ff;
	.list-group-item:first-child {
		background: #eff6fa;
	}
	.list-group .highlighted {
		background-color: ${colors.tertiaryColorLightBlue};
	}
	.list-group .even {
		background-color: #eff6fa;
	}
`;
const RatingContainer = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: ${(p: { highlighted?: boolean }) =>
		p.highlighted ? "18px" : "14px"};
	font-weight: ${(p: { highlighted?: boolean }) =>
		p.highlighted ? "700" : "normal"};
	span:first-child {
		width: 150px;
	}
	span:last-child {
		width: 20px;
	}
`;
const StatesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: inherit;
`;
const Stats = styled.div`
	background: #eff6fa;
	border-radius: ${borderRadius.container};
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
	margin-top: 40px;
`;
const ReviewTitleRow = styled.div`
	display: flex;
	justify-content: space-between;
`;
const ReviewTitle = styled.h4`
	font-weight: bold;
`;
// Used for Job Title, location, and how long the employee has stayed at the company
const ReviewSubheadingText = styled.h5`
	margin-top: 8px;
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
const ViewAllButton = styled.div`
	margin-top: 10px;
	margin-bottom: 10px;
	display: flex;
	justify-content: center;
`;
const ReviewDetails = styled.div`
	padding: 15px;
	margin-top: 10px;
	border-radius: ${borderRadius.container};
	border: 1px solid #efefef;
	background-color: #f9f9f9;
`;
const ReviewHeader = styled.div`
	display: flex;
	justify-content: space-between;
`;
const SalaryJobTitle = styled.h4`
	font-weight: bold;
`;
const PostedDate = styled.span`
	color: grey;
`;
const ReviewRatingWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 4px;
	margin-bottom: 5px;
`;
const ReviewRating = styled.div`
	display: flex;
	flex-direction: column;
`;
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
	border-radius: ${borderRadius.container};
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
	border-radius: ${borderRadius.container};
`;
const AveeragePay = styled.div`
	margin-top: 5px;
	margin-bottom: 20px;
`;
const GreyText = styled.span`
	color: grey;
`;
const SalaryRangeValues = styled.span`
	display: flex;
	justify-content: space-between;
`;
const JobLocationList = styled.div`
	display: flex;
	flex-direction: column;
`;
const JobLocationText = styled.span``;
const JobList = styled(Row)`
	margin-top: 10px;
`;
const RecommendedButton = styled.button`
	color: ${colors.secondaryColorGreen};
	background-color: #def1de;
	border-radius: 6px;
`;
const ButtonText = styled.div`
	display: flex;
	align-items: center;
`;

Modal.setAppElement("#app-root");
export default function JobDetailModal(
	props: JobDetailModalProps
): JSX.Element {
	const { visible, jobPost, onClose } = props;
	const [activetTab, setActiveTab] = useState(1);
	const jobContentRef = useRef(null);
	const companyContentRef = useRef(null);
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
						if (newValue === 1) {
							jobContentRef.current.scrollIntoView({
								behavior: "smooth",
								block: "start",
							});
						} else {
							companyContentRef.current.scrollIntoView({
								behavior: "smooth",
								block: "start",
							});
						}
						setActiveTab(newValue);
					}}
					aria-label="disabled tabs example"
				>
					<Tab value={1} label="Job" />
					<Tab value={2} label="Company" />
				</Tabs>
				<ScrollableContent>
					<div ref={jobContentRef}>
						<JobContentWrapper {...jobPost}></JobContentWrapper>
					</div>
					<CompanyContent ref={companyContentRef}>
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
								<Col>
									<JobLocationList>
										{jobPost.companyDetail.location.map(
											(v) => {
												return (
													<JobLocationText key={v}>
														{v}
													</JobLocationText>
												);
											}
										)}
									</JobLocationList>
								</Col>
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
													&nbsp;{jobPost.company}{" "}
													Ratings
												</RatingTitle>
											</ListGroup.Item>
											<ListGroup.Item className="highlighted">
												<RatingContainer highlighted>
													<span>Average Rating</span>
													<div>
														<StarRatings
															rating={
																jobPost
																	.companyDetail
																	.ratings
																	.average
															}
															starDimension="18px"
															starSpacing="2px"
														/>
													</div>
													<span>
														{jobPost.companyDetail.ratings.average.toFixed(
															1
														)}
													</span>
												</RatingContainer>
											</ListGroup.Item>
											<ListGroup.Item className="even">
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
													<span>
														{jobPost.companyDetail.ratings.overallSatisfaction.toFixed(
															1
														)}
													</span>
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
													<span>
														{jobPost.companyDetail.ratings.healthAndSafeety.toFixed(
															1
														)}
													</span>
												</RatingContainer>
											</ListGroup.Item>
											<ListGroup.Item className="even">
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
													<span>
														{jobPost.companyDetail.ratings.workEnvironment.toFixed(
															1
														)}
													</span>
												</RatingContainer>
											</ListGroup.Item>
											<ListGroup.Item>
												<RatingContainer>
													<span>
														Manager Relationships
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
													<span>
														{jobPost.companyDetail.ratings.managerRelationships.toFixed(
															1
														)}
													</span>
												</RatingContainer>
											</ListGroup.Item>
											<ListGroup.Item className="even">
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
													<span>
														{jobPost.companyDetail.ratings.benefits.toFixed(
															1
														)}
													</span>
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
														jobPost.companyDetail
															.recommendationPercenteage
													}
													%
												</StatesTitle>
												<span>
													The percentage of reviewers
													that would recommend{" "}
													{jobPost.company} to a
													friend
												</span>
											</div>
										</Stats>
										<Stats>
											<div>
												<StatesTitle>
													{
														jobPost.companyDetail
															.averageStay
													}
												</StatesTitle>
												The average numbe of months that
												workeer stays at the factory
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
										{jobPost.companyDetail.reviewCount}{" "}
										Reviews
									</span>
								</NumberOfReview>
							</ReviewTitleRow>
							{jobPost.companyDetail.reviews.map(
								(v: any, index: number) => {
									return (
										<ReviewDetails key={index}>
											<ReviewHeader>
												<ReviewTitle>
													Review Title
												</ReviewTitle>

												<PostedDate>
													Posted {v.reviewedOn}
												</PostedDate>
											</ReviewHeader>

											<ReviewSubheadingText>
												<b>Operador</b> in Tijuana, Otay
												Industrial Park
											</ReviewSubheadingText>
											<ReviewSubheadingText>
												Current Employee, less than 1
												year
											</ReviewSubheadingText>

											<ReviewRatingWrapper>
												<ReviewRating>
													<RatingsDropdownReview
														ratings={{
															healthAndSafety:
																v.rating
																	.healthAndSafety,
															managerRelationship:
																v.rating
																	.managerRelationship,
															workEnvironment:
																v.rating
																	.workEnvironment,
															benefits:
																v.rating
																	.benefits,
															overallSatisfaction:
																v.rating
																	.overallSatisfaction,
														}}
														companyName=""
													/>
												</ReviewRating>
												<RecommendedButton>
													<ButtonText>
														<CheckCircleOutlineIcon />
														&nbsp; Recommends{" "}
														{jobPost.company}
													</ButtonText>
												</RecommendedButton>
											</ReviewRatingWrapper>
											<ReviewComments>
												<ReviewCommentsRow>
													<ReviewCommentsColumn
														md={6}
													>
														<ReviewCommentHeader>
															Pros
														</ReviewCommentHeader>
														<span>{v.pros}</span>
													</ReviewCommentsColumn>
													<ReviewCommentsColumn
														md={6}
													>
														<ReviewCommentHeader>
															Cons
														</ReviewCommentHeader>
														<span>{v.cons}</span>
													</ReviewCommentsColumn>
												</ReviewCommentsRow>
												<ReviewCommentsRow>
													<ReviewCommentsColumn
														md={12}
													>
														<ReviewCommentHeader>
															Additional Comments
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
							<ViewAllButton>
								<Button $primary>View All Reviews</Button>
							</ViewAllButton>
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
							</ReviewTitleRow>
							{jobPost.companyDetail.salaries.map(
								(v: any, index: number) => {
									return (
										<ReviewDetails key={index}>
											<ReviewHeader>
												<SalaryJobTitle>
													{v.position}
												</SalaryJobTitle>
											</ReviewHeader>
											<AveeragePay>
												<GreyText>Average</GreyText>{" "}
												<span>: $ {v.pay} / week</span>
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
							<ViewAllButton>
								<Button $primary>View All Salaries</Button>
							</ViewAllButton>
						</CommpanyReviewsWrapper>
						<CommpanyReviewsWrapper>
							<ReviewTitleRow>
								<NumberOfReview>
									<WorkIcon />
									<span>&nbsp;Additional Jobs</span>
								</NumberOfReview>
							</ReviewTitleRow>
							<JobList>
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
							</JobList>
							<ViewAllButton>
								<Button $primary>View All Jobs</Button>
							</ViewAllButton>
						</CommpanyReviewsWrapper>
					</CompanyContent>
				</ScrollableContent>
			</JobPostContent>
		</StyledModal>
	);
}
