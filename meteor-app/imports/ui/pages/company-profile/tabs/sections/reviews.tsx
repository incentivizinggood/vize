import React from "react";
import { Link } from "react-router-dom";

import { i18n } from "meteor/universe:i18n";

import CompanyRating from "imports/ui/components/companyRatingsComponent";
import CompanyReview from "imports/ui/components/companyReview";
import WriteReviewButton from "imports/ui/components/write-review-button";
import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";

const T = i18n.createComponent();

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
		reviewsToDisplay = <T>common.overview_tab.display_text</T>;
	}

	return (
		<>
			<div className="col-md-12  section_rview_back_color08  ">
				{" "}
				{/* review link */}
				<h4 className="head_section_font">
					{props.company.name} <T>common.overview_tab.reviews</T>
				</h4>
				<div className="add-buttons">
					<WriteReviewButton companyId={props.company.id} />
				</div>
				<hr />
				<CompanyRating company={props.company} />
			</div>
			<div className="col-md-12  section_overtopsect">
				{reviewsToDisplay}

				<center>
					<div className="na_tab1">
						<ul className="" role="tablist">
							<li role="presentation" className="te_deco">
								<Link
									to="#reviews"
									aria-controls="reviews"
									role="tab"
									data-toggle="tab"
								>
									<strong>
										<T>
											common.overview_tab.see_all_reviews
										</T>
									</strong>
								</Link>
							</li>
						</ul>
					</div>
				</center>
			</div>
		</>
	);
}

export default withUpdateOnChangeLocale(ReviewsSection);
