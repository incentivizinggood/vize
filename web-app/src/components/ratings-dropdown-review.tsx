import React from "react";
import styled from "styled-components";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translations } from "src/translations";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { StarRatings as StartRatingsType } from "generated/graphql-operations";
import * as urlGenerators from "src/pages/url-generators";
import { Link } from "react-router-dom";

const T = translations.legacyTranslationsNeedsRefactor;

const StarRatingsDropdownButton = styled.a`
	position: relative;
	display: inline-block;
	vertical-align: middle;
	padding-top: 4px;
	padding-bottom: 6px;
`;

const AverageRatingValue = styled.span`
	margin-right: 6px;
	font-size: 16px;
	font-weight: bold;
`;

interface StartRatingsProps {
	ratings: StartRatingsType;
	numReviews?: number;
	companyName?: string;
}

function RatingsDropdownReview({
	ratings,
	numReviews,
	companyName,
}: StartRatingsProps) {
	const numReviewsText =
		numReviews === 1 ? (
			<T.companyreview.review />
		) : (
			<T.companyreview.reviews />
		);

	return (
		<StarRatingsDropdownButton className="show-on-hover">
			<AverageRatingValue>
				{(
					(ratings.healthAndSafety +
						ratings.managerRelationship +
						ratings.workEnvironment +
						ratings.benefits) /
					4
				).toFixed(1)}
			</AverageRatingValue>
			<StarRatings
				rating={
					(ratings.healthAndSafety +
						ratings.managerRelationship +
						ratings.workEnvironment +
						ratings.benefits) /
					4
				} // the average rating of all 5 ratings
				starDimension="15px"
				starSpacing="1.5px"
			/>
			&nbsp;
			<FontAwesomeIcon icon={faCaretDown} />
			<ul className="dropdown-menu" role="menu">
				<li>
					<label>
						<T.companyreview.overall />
					</label>
					<br />
					<StarRatings
						rating={ratings.overallSatisfaction}
						starDimension="15px"
						starSpacing="1.5px"
					/>
				</li>
				<li>
					<label>
						<T.companyreview.health_safety />
					</label>
					<br />
					<StarRatings
						rating={ratings.healthAndSafety}
						starDimension="15px"
						starSpacing="1.5px"
					/>
				</li>
				<li>
					{" "}
					<label>
						<T.companyreview.work_env />
					</label>
					<br />
					<StarRatings
						rating={ratings.workEnvironment}
						starDimension="15px"
						starSpacing="1.5px"
					/>
				</li>
				<li>
					<label>
						<T.companyreview.benefits />
					</label>
					<br />
					<StarRatings
						rating={ratings.benefits}
						starDimension="15px"
						starSpacing="1.5px"
					/>
				</li>
				<li>
					{" "}
					<label>
						<T.companyreview.manager_relation />
					</label>
					<br />
					<StarRatings
						rating={ratings.managerRelationship}
						starDimension="15px"
						starSpacing="1.5px"
					/>
				</li>
			</ul>
		</StarRatingsDropdownButton>
	);
}

export default RatingsDropdownReview;
