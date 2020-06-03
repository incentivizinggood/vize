import React from "react";

import CompanyReview from "src/components/companyReview";
import CompanyRating from "src/components/companyRatingsComponent";
import { WriteReviewButton } from "src/components/button";
import { translations } from "src/translations";

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
			<div className="sect-tab-container">
				<div className="container-fluid">
					<div className="row">
						<h4 className="head_section_font">
							{props.company.name} <T.review_tab.reviews />
						</h4>
						<div className="add-buttons">
							<WriteReviewButton
								companyName={props.company.name}
								buttonLocation='Company Profile | Reviews'
							/>
						</div>
					</div>
				</div>
				<hr />

				<CompanyRating company={props.company} />
			</div>

			{renderItems}
		</div>
	);
}

export default ReviewTab;
