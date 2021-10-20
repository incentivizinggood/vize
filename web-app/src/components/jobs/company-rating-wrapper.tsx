import React from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import { Row, Col, ListGroup } from "react-bootstrap";
import StarsIcon from "@material-ui/icons/Stars";
import { colors, borderRadius } from "src/global-styles";
import Stats from "./stats";
import { forSize } from "src/responsive";

const StyledCompanyRatingsWrapper = styled.div`
	display: flex;
	justify-content: space-between;

	${forSize.tabletAndDown} {
		flex-direction: column;
	}
`;
const CompanyRating = styled.div`
	flex: 0 0 49%;
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
	.list-group {
		margin-bottom: 0px;
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
	justify-content: space-between;
	flex: 0 0 49%;
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

	let avgNumMonthsWorkedFormatted = avgNumMonthsWorked.toFixed(1);
	if (avgNumMonthsWorkedFormatted.includes(".0")) {
		console.log("ye");
		avgNumMonthsWorkedFormatted = avgNumMonthsWorkedFormatted.substr(0, 1);
	}

	return (
		<StyledCompanyRatingsWrapper>
			<CompanyRating>
				<ListGroup>
					<ListGroup.Item>
						<RatingTitle>
							<StarsIcon />
							&nbsp;{companyName} Calificaciones
						</RatingTitle>
					</ListGroup.Item>
					<ListGroup.Item className="highlighted">
						<RatingContainer highlighted>
							<span>Promedio</span>
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
							<span>Satisfacción General</span>
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
							<span>Salud y Seguiridad</span>
							<div>
								<StarRatings
									rating={ratings.healthAndSafety}
									starDimension="15px"
									starSpacing="1.5px"
								/>
							</div>
							<span>{ratings.healthAndSafety.toFixed(1)}</span>
						</RatingContainer>
					</ListGroup.Item>
					<ListGroup.Item className="even">
						<RatingContainer>
							<span>Ambiente de Trabajo</span>
							<div>
								<StarRatings
									rating={ratings.workEnvironment}
									starDimension="15px"
									starSpacing="1.5px"
								/>
							</div>
							<span>{ratings.workEnvironment.toFixed(1)}</span>
						</RatingContainer>
					</ListGroup.Item>
					<ListGroup.Item>
						<RatingContainer>
							<span>Relaciones con Supervisores</span>
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
							<span>Beneficios</span>
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

			<StatesWrapper>
				<Stats
					value={`${percentRecommended}%`}
					text={`El porcentaje de revisores que recomendarían ${companyName} a un amigo.`}
				></Stats>
				<Stats
					value={`${avgNumMonthsWorkedFormatted}`}
					text="La cantidad promedio de meses que trabajadores permanecieron en esta fábrica."
				></Stats>
			</StatesWrapper>
		</StyledCompanyRatingsWrapper>
	);
}
