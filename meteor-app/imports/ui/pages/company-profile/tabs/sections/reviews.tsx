import React from "react";
import { Link } from "react-router-dom";

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
			<div className="col-md-12  section_rview_back_color08  ">
				{" "}
				{/* review link */}
				<h4 className="head_section_font">
					{props.company.name} <T.overview_tab.reviews />
				</h4>
				<div className="add-buttons">
					<WriteReviewButton companyName={props.company.name} buttonLocation='Company Profile | Overview' />
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
										<T.overview_tab.see_all_reviews />
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

export default ReviewsSection;
