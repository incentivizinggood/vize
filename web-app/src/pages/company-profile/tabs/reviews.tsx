import React from "react";

import CompanyReview from "../articles/review";
import CompanyRating from "../companyRatingsComponent";
import { WriteReviewButton } from "src/components/button";
import { translations } from "src/translations";
import {
	SectionContainer,
	SectionHeaderContainer,
	SectionHeaderTitle,
} from "../components";

const T = translations.legacyTranslationsNeedsRefactor;

function ReviewTab(props) {
	const renderItems = props.company.reviews.map(review => (
		<CompanyReview
			key={review.id}
			review={review}
			companyName={props.company.name}
		/>
	));

	return (
		<div role="tabpanel" className="tab-pane" id="reviews">
			<SectionContainer>
				<SectionHeaderContainer>
					<SectionHeaderTitle>
						{props.company.name} <T.review_tab.reviews />
					</SectionHeaderTitle>
					<div className="add-buttons">
						<WriteReviewButton
							companyName={props.company.name}
							buttonLocation="Company Profile | Reviews"
						/>
					</div>
				</SectionHeaderContainer>

				<CompanyRating company={props.company} />
			</SectionContainer>

			{renderItems}
		</div>
	);
}

export default ReviewTab;
