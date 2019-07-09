import React from "react";

import { i18n } from "meteor/universe:i18n";

import CompanyReview from "imports/ui/components/companyReview";
import CompanyRating from "imports/ui/components/companyRatingsComponent";
import WriteReviewButton from "imports/ui/components/write-review-button";
import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";

const T = i18n.createComponent();

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
							{props.company.name}{" "}
							<T>common.review_tab.reviews</T>
						</h4>
						<div className="add-buttons">
							<WriteReviewButton companyId={props.company.id} />
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

export default withUpdateOnChangeLocale(ReviewTab);
