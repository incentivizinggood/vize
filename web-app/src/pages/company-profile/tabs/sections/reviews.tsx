import React from "react";
import { Link } from "react-router-dom";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
	SeeMoreFooter,
} from "../../components";

import CompanyRating from "src/components/companyRatingsComponent";
import CompanyReview from "src/components/companyReview";
import { WriteReviewButton } from "src/components/button";
import { translations } from "src/translations";

const T = translations.legacyTranslationsNeedsRefactor;

function ReviewsSection(props) {
	// FIRST REVIEW CODE TO SHOW ON THE OVERVIEW TAB
	let reviewsToDisplay;
	if (props.company.reviews.length > 0) {
		reviewsToDisplay = (
			<CompanyReview
				review={props.company.reviews[0]}
				companyName={props.company.name}
			/>
		);
	} else {
		reviewsToDisplay = <T.overview_tab.no_reviews />;
	}

	return (
		<>
			<SectionContainer>
				<SectionHeaderContainer>
					<SectionHeaderTitle>
						{props.company.name} <T.overview_tab.reviews />
					</SectionHeaderTitle>
					<div className="add-buttons">
						<WriteReviewButton
							companyName={props.company.name}
							buttonLocation="Company Profile | Overview"
						/>
					</div>
				</SectionHeaderContainer>
				<CompanyRating company={props.company} />
			</SectionContainer>

			<SectionContainer>
				<SectionHeaderContainer>
					<SectionHeaderTitle>
						{props.company.numReviews} <T.overview_tab.reviews />
					</SectionHeaderTitle>
					<div className="add-buttons">
						<WriteReviewButton
							companyName={props.company.name}
							buttonLocation="Company Profile | Overview"
						/>
					</div>
				</SectionHeaderContainer>

				<div>{reviewsToDisplay}</div>

				<SeeMoreFooter to={"./reviews"} ariaControls={"reviews"}>
					<T.overview_tab.see_all_reviews />
				</SeeMoreFooter>
			</SectionContainer>
		</>
	);
}

export default ReviewsSection;
