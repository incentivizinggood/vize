import React from "react";
import { Link } from "react-router-dom";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
} from "../../components";

import CompanyRating from "imports/ui/components/companyRatingsComponent";
import CompanyReview from "imports/ui/components/companyReview";
import { WriteReviewButton } from "imports/ui/components/button";
import { translations } from "imports/ui/translations";

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
		reviewsToDisplay = <T.overview_tab.display_text />;
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
					{reviewsToDisplay}
				</SectionHeaderContainer>
				<div style={{ textAlign: "center" }}>
					<Link
						to="#reviews"
						aria-controls="reviews"
						role="tab"
						data-toggle="tab"
					>
						<strong>
							<T.overview_tab.see_all_reviews />
						</strong>
					</Link>
				</div>
			</SectionContainer>
		</>
	);
}

export default ReviewsSection;
