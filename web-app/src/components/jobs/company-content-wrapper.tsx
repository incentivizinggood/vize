import React from "react";
import styled from "styled-components";
import { colors } from "src/global-styles";
import { Row, Col } from "react-bootstrap";
import { Button } from "src/components/button";

import WorkIcon from "@material-ui/icons/Work";
import JobPostPreview from "./job-post-preview";
import CompanyRatingWrapper from "./company-rating-wrapper";
import ReviewDetails from "./review-details";
import JobDetails from "./job-details";
import descriptionImage from "../../images/job-post-icons/description.png";
import RateReviewIcon from "@material-ui/icons/RateReview";
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
`;
const JobLocationText = styled.span``;
const JobList = styled(Row)`
	margin-top: 10px;
`;

export default function CompanyContentWrapper(props: any): JSX.Element {
    const { companyDetail, company } = props;
    return <CompanyContent >
        <JobRequirementWrapper>
            <JobRequirementTitle>
                <img src={descriptionImage} alt=""></img>
                <span>&nbsp;Descripción</span>
            </JobRequirementTitle>
            <JobRequirementDescription>
                {companyDetail.description}
            </JobRequirementDescription>
        </JobRequirementWrapper>
        <JobCompanyBasicDetail>
            <Row>
                <Col md={3}>
                    <strong>Size</strong>
                </Col>
                <Col>{companyDetail.size}</Col>
            </Row>
            <Row>
                <Col md={3}>
                    <strong>Industry</strong>
                </Col>
                <Col>{companyDetail.industry}</Col>
            </Row>
            <Row>
                <Col md={3}>
                    <strong>Website</strong>
                </Col>
                <Col>
                    {companyDetail.companyWebsite}
                </Col>
            </Row>
            <Row>
                <Col md={3}>
                    <strong>Location</strong>
                </Col>
                <Col>
                    <JobLocationList>
                        {companyDetail.location.map(
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
        <CompanyRatingWrapper company={company}
            ratings={companyDetail.ratings}
            recommendationPercenteage={companyDetail.recommendationPercenteage}
            averageStay={companyDetail.averageStay} />
        <CommpanyReviewsWrapper>
            <ReviewTitleRow>
                <NumberOfReview>
                    <RateReviewIcon />
                    <span>
                        &nbsp;
                        {companyDetail.reviewCount}{" "}
                        Reviews
                    </span>
                </NumberOfReview>
            </ReviewTitleRow>
            {companyDetail.reviews.map(
                (v: any, index: number) => {
                    console.log("v", v)
                    return (
                        <ReviewDetails {...v} key={index}>
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
                        {companyDetail.salaries
                            ? companyDetail.salaries
                                .length
                            : 0}{" "}
                        Salary
                    </span>
                </NumberOfReview>
            </ReviewTitleRow>
            {companyDetail.salaries.map(
                (v: any, index: number) => {
                    return (
                        <JobDetails {...v} key={index}>
                        </JobDetails>
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
                {companyDetail.jobs.map(
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
}