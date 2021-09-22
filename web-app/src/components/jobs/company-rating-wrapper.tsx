import React from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import { Row, Col, ListGroup } from "react-bootstrap";
import StarsIcon from "@material-ui/icons/Stars";
import { colors, borderRadius } from "src/global-styles";
import Stats from "./stats"
import { forSize } from "src/responsive";

const StyledCompanyRatingsWrapper = styled.div``;
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
    ${forSize.tabletAndDown} {
		.list-group-item{
            padding: 5px 7px;
        }
        .star-ratings svg{
            width:12px !important;
            height:12px !important;
        }
	}
`;
const RatingContainer = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: ${(props: { highlighted?: boolean }) =>
        props.highlighted ? "18px" : "14px"};
	font-weight: ${(props: { highlighted?: boolean }) =>
        props.highlighted ? "700" : "normal"};
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
    ${forSize.tabletAndDown} {
		margin-top:25px;
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

const Column = styled(Col)`
	height: 300px;
    ${forSize.tabletAndDown} {
		height:230px;
	}
`;
export interface Ratings {
    average: number;
    overallSatisfaction: number;
    healthAndSafety: number;
    workEnvironment: number;
    managerRelationship: number;
    benefits: number;
}

interface CompanyRatingWrapperProps {
    company: string;
    ratings: Ratings;
    recommendationPercenteage: number;
    averageStay: number;
}
export default function CompanyRatingWrapper(props: CompanyRatingWrapperProps): JSX.Element {
    const { company, ratings, recommendationPercenteage, averageStay } = props
    return <StyledCompanyRatingsWrapper>
        <Row>
            <Column md={6}>
                <CompanyRating>
                    <ListGroup>
                        <ListGroup.Item>
                            <RatingTitle>
                                <StarsIcon />
                                &nbsp;{company}{" "}
                                Ratings
                            </RatingTitle>
                        </ListGroup.Item>
                        <ListGroup.Item className="highlighted">
                            <RatingContainer highlighted>
                                <span>Average Rating</span>
                                <div>
                                    <StarRatings
                                        rating={
                                            ratings
                                                .average
                                        }
                                        starDimension="18px"
                                        starSpacing="2px"
                                    />
                                </div>
                                <span>
                                    {ratings.average.toFixed(
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
                                            ratings
                                                .overallSatisfaction
                                        }
                                        starDimension="15px"
                                        starSpacing="1.5px"
                                    />
                                </div>
                                <span>
                                    {ratings.overallSatisfaction.toFixed(
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
                                            ratings
                                                .healthAndSafety
                                        }
                                        starDimension="15px"
                                        starSpacing="1.5px"
                                    />
                                </div>
                                <span>
                                    {ratings.healthAndSafety.toFixed(
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
                                            ratings
                                                .workEnvironment
                                        }
                                        starDimension="15px"
                                        starSpacing="1.5px"
                                    />
                                </div>
                                <span>
                                    {ratings.workEnvironment.toFixed(
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
                                            ratings
                                                .managerRelationship
                                        }
                                        starDimension="15px"
                                        starSpacing="1.5px"
                                    />
                                </div>
                                <span>
                                    {ratings.managerRelationship.toFixed(
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
                                            ratings
                                                .benefits
                                        }
                                        starDimension="15px"
                                        starSpacing="1.5px"
                                    />
                                </div>
                                <span>
                                    {ratings.benefits.toFixed(
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
                    <Stats value={`${recommendationPercenteage}%`} text={`The percentage of reviewers that would recommend ${company} to afriend`}>
                    </Stats>
                    <Stats value={`${averageStay}`} text="The average numbe of months t">
                    </Stats>
                </StatesWrapper>
            </Column>
        </Row>
    </StyledCompanyRatingsWrapper>
}