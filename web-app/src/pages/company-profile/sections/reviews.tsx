import React from "react";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
	SeeMoreFooter,
} from "../components";

import CompanyReview from "../articles/review";
import CompanyRating from "../companyRatingsComponent";
import { WriteReviewButton } from "src/components/button";
import { CompanyProfileReviewsSectionFragment } from "generated/graphql-operations";
import { translations } from "src/translations";
import * as urlGenerators from "src/pages/url-generators";

const T = translations.legacyTranslationsNeedsRefactor;

interface ReviewsSectionProps {
	company: CompanyProfileReviewsSectionFragment;
}

function ReviewsSection(props: ReviewsSectionProps): JSX.Element {
	// FIRST REVIEW CODE TO SHOW ON THE OVERVIEW TAB
	let reviewsToDisplay;
	if (props.company.reviews.length > 0) {
		reviewsToDisplay = <CompanyReview review={props.company.reviews[0]} />;
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

				<SeeMoreFooter
					to={`./${urlGenerators.queryRoutes.reviews}`}
					ariaControls={urlGenerators.queryRoutes.reviews}
				>
					<T.overview_tab.see_all_reviews />
				</SeeMoreFooter>
			</SectionContainer>
		</>
	);
}

export default ReviewsSection;
