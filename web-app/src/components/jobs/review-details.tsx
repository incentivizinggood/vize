import React from "react";
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import RatingsDropdownReview from "../ratings-dropdown-review";
import { colors, borderRadius } from "src/global-styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { forSize } from "src/responsive";

export interface Ratings {
    average: number;
    overallSatisfaction: number;
    healthAndSafety: number;
    workEnvironment: number;
    managerRelationship: number;
    benefits: number;
}

export interface ReviewDetailsProps {
    company: string,
    reviewedOn: string;
    title: string;
    rating: Ratings;
    pros: string;
    cons: string;
    additionalComments: string;
}
const ReviewTitle = styled.h4`
	font-weight: bold;
`;
// Used for Job Title, location, and how long the employee has stayed at the company
const ReviewSubheadingText = styled.h5`
	margin-top: 8px;
`;
const StyledReviewDetails = styled.div`
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

const PostedDate = styled.span`
	color: grey;
`;
const ReviewRatingWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 4px;
	margin-bottom: 5px;
    ${forSize.phoneOnly} {
        flex-direction:column;
    }
`;
const ReviewRating = styled.div`
	display: flex;
	flex-direction: column;
`;
const ReviewComments = styled.div`
	display: flex;
	flex-direction: column;
`;
const ReviewCommentsRow = styled.div`
	margin: 0px;
	display: flex;
	justify-content: space-between;
    flex-wrap: wrap;
`;
const ReviewCommentsColumn = styled.div`
	border-radius: ${borderRadius.container};
	padding: 20px;
	border: 1px solid #efefef;
	margin: 5px;
	background-color: #fff;
	position: relative;
	margin-top: 10px;
	margin-left: 0px;
    width:${(p: { type?: string; }) =>
        p.type === "half" ? "48%" : "100%"};
    ${forSize.tabletAndDown} {
        width:100%;
    }
`;
const ReviewCommentHeader = styled(Col)`
	position: absolute;
	top: -10px;
	left: 15px;
	padding: 2px 10px;
	background: #efefef;
	border-radius: ${borderRadius.container};
`;
const RecommendedButton = styled.button`
	color: ${colors.secondaryColorGreen};
	background-color: #def1de;
	border-radius: 6px;
    padding: 8px;
    width: 132px;
`;
const NotRecommendedButton = styled.button`
    color: #d50c0c;
    background-color: white;
    border-radius: 6px;
    padding: 8px;
    width: 280px;
    border: 1px solid;
`;
const ButtonText = styled.div`
	display: flex;
	align-items: center;
`;
export default function ReviewDetails(props: ReviewDetailsProps): JSX.Element {
    const { company,
        reviewedOn,
        rating,
        pros,
        cons,
        additionalComments, recommended } = props
    return (
        <StyledReviewDetails >
            <ReviewHeader>
                <ReviewTitle>
                    Review Title
                </ReviewTitle>

                <PostedDate>
                    Posted {reviewedOn}
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
            {rating ? <ReviewRatingWrapper>
                <ReviewRating>
                    <RatingsDropdownReview
                        ratings={{
                            healthAndSafety:
                                rating.healthAndSafety,
                            managerRelationship:
                                rating.managerRelationship,
                            workEnvironment:
                                rating
                                    .workEnvironment,
                            benefits:
                                rating
                                    .benefits,
                            overallSatisfaction:
                                rating
                                    .overallSatisfaction,
                        }}
                        companyName=""
                    />
                </ReviewRating>
                {recommended ? <RecommendedButton>
                    <ButtonText>
                        <CheckCircleOutlineIcon />
                        &nbsp; Recommends{" "}
                        {company}
                    </ButtonText>
                </RecommendedButton> : <NotRecommendedButton>
                    <ButtonText>
                        <HighlightOffIcon />
                        &nbsp; Doesn't Recommends this Company
                    </ButtonText>
                </NotRecommendedButton>}
            </ReviewRatingWrapper>
                : null}
            <ReviewComments>
                <ReviewCommentsRow>
                    <ReviewCommentsColumn type="half" >
                        <ReviewCommentHeader>
                            Pros
                        </ReviewCommentHeader>
                        <span>{pros}</span>
                    </ReviewCommentsColumn>
                    <ReviewCommentsColumn type="half">
                        <ReviewCommentHeader>
                            Cons
                        </ReviewCommentHeader>
                        <span>{cons}</span>
                    </ReviewCommentsColumn>
                    <ReviewCommentsColumn type="full">
                        <ReviewCommentHeader>
                            Additional Comments
                        </ReviewCommentHeader>
                        <span>
                            {
                                additionalComments
                            }
                        </span>
                    </ReviewCommentsColumn>
                </ReviewCommentsRow>
            </ReviewComments>
        </StyledReviewDetails>
    );
}