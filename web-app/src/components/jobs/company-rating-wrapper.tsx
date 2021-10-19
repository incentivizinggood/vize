import React from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import { Row, Col, ListGroup } from "react-bootstrap";
import StarsIcon from "@material-ui/icons/Stars";
import { colors, borderRadius } from "src/global-styles";
import Stats from "./stats";
import { forSize } from "src/responsive";

const StyledCompanyRatingsWrapper = styled.div``;
const CompanyRating = styled.div`
	border-radius: ${borderRadius.container};
	background-color: #eaf7ff;
	.list-group-item:first-child {
		background: #eff6fa;
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
	}
	.list-group-item:last-child {
		border-bottom-left-radius: 16px;
		border-bottom-right-radius: 16px;
	}
	.list-group .highlighted {
		background-color: ${colors.tertiaryColorLightBlue};
	}
	.list-group .even {
		background-color: #eff6fa;
	}
	${forSize.tabletAndDown} {
		.list-group-item {
			padding: 5px 7px;
		}
		.star-ratings svg {
			width: 12px !important;
			height: 12px !important;
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
		margin-top: 25px;
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
		height: 230px;
	}
`;

export interface Rating {
	overallSatisfaction: number;
	healthAndSafety: number;
	workEnvironment: number;
	managerRelationship: number;
	benefits: number;
}

interface CompanyRatingWrapperProps {
	companyName: string;
	ratings: Rating;
	percentRecommended: number;
	avgNumMonthsWorked: number;
}
export default function CompanyRatingWrapper({
	companyName,
	ratings,
	percentRecommended,
	avgNumMonthsWorked,
}: CompanyRatingWrapperProps): JSX.Element {
	const averageRating =
		(ratings.overallSatisfaction +
			ratings.healthAndSafety +
			ratings.workEnvironment +
			ratings.managerRelationship +
			ratings.benefits) /
		5;
	percentRecommended *= 100;

	return (
		<StyledCompanyRatingsWrapper>
			<Row>
				<Column md={6}>
					<CompanyRating>
						<ListGroup>
							<ListGroup.Item>
								<RatingTitle>
									<StarsIcon />
									&nbsp;{companyName} Ratings
								</RatingTitle>
							</ListGroup.Item>
							<ListGroup.Item className="highlighted">
								<RatingContainer highlighted>
									<span>Average Rating</span>
									<div>
										<StarRatings
											rating={averageRating}
											starDimension="18px"
											starSpacing="2px"
										/>
									</div>
									<span>{averageRating.toFixed(1)}</span>
								</RatingContainer>
							</ListGroup.Item>
							<ListGroup.Item className="even">
								<RatingContainer>
									<span>Overall Satisfaction</span>
									<div>
										<StarRatings
											rating={ratings.overallSatisfaction}
											starDimension="15px"
											starSpacing="1.5px"
										/>
									</div>
									<span>
										{ratings.overallSatisfaction.toFixed(1)}
									</span>
								</RatingContainer>
							</ListGroup.Item>
							<ListGroup.Item>
								<RatingContainer>
									<span>Health and Safety</span>
									<div>
										<StarRatings
											rating={ratings.healthAndSafety}
											starDimension="15px"
											starSpacing="1.5px"
										/>
									</div>
									<span>
										{ratings.healthAndSafety.toFixed(1)}
									</span>
								</RatingContainer>
							</ListGroup.Item>
							<ListGroup.Item className="even">
								<RatingContainer>
									<span>Work Environment</span>
									<div>
										<StarRatings
											rating={ratings.workEnvironment}
											starDimension="15px"
											starSpacing="1.5px"
										/>
									</div>
									<span>
										{ratings.workEnvironment.toFixed(1)}
									</span>
								</RatingContainer>
							</ListGroup.Item>
							<ListGroup.Item>
								<RatingContainer>
									<span>Manager Relationships</span>
									<div>
										<StarRatings
											rating={ratings.managerRelationship}
											starDimension="15px"
											starSpacing="1.5px"
										/>
									</div>
									<span>
										{ratings.managerRelationship.toFixed(1)}
									</span>
								</RatingContainer>
							</ListGroup.Item>
							<ListGroup.Item className="even">
								<RatingContainer>
									<span>Benefits</span>
									<div>
										<StarRatings
											rating={ratings.benefits}
											starDimension="15px"
											starSpacing="1.5px"
										/>
									</div>
									<span>{ratings.benefits.toFixed(1)}</span>
								</RatingContainer>
							</ListGroup.Item>
						</ListGroup>
					</CompanyRating>
				</Column>
				<Column md={6}>
					<StatesWrapper>
						<Stats
							value={`${percentRecommended}%`}
							text={`The percentage of reviewers that would recommend ${companyName} to a friend.`}
						></Stats>
						<Stats
							value={`${avgNumMonthsWorked}`}
							text="The average numbe of months that workers stayed at this factory."
						></Stats>
					</StatesWrapper>
				</Column>
			</Row>
		</StyledCompanyRatingsWrapper>
	);
}
