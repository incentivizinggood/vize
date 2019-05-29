import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/ui/pages";

import CompanyReview from "/imports/ui/components/companyReview.jsx";
import CompanyRating from "/imports/ui/components/companyRatingsComponent.jsx";
import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

const T = i18n.createComponent();

class ReviewTab extends React.Component {
	render() {
		const renderItems = this.props.company.reviews.map(review => (
			<CompanyReview
				key={review.id}
				review={review}
				companyName={this.props.company.name}
			/>
		));

		return (
			<div role="tabpanel" className="tab-pane" id="reviews">
				<div className="sect-tab-container">
					<div className="container-fluid">
						<div className="row">
							<h4 className="head_section_font">
								{this.props.company.name}{" "}
								<T>common.review_tab.reviews</T>
							</h4>
							<div className="add-buttons">
								<Link
									to={urlGenerators.vizeReviewUrl(
										this.props.company.id
									)}
									className="btn btn-primary"
								>
									{" "}
									<FontAwesomeIcon icon={faPlus} />{" "}
									{i18n.__("common.overview_tab.add_review")}
								</Link>
								{/* <button ><i className="fa fa-plus" ></i>&nbsp; Add a Review</button> */}
							</div>
						</div>
					</div>
					<hr />

					<CompanyRating company={this.props.company} />
				</div>

				{renderItems}
			</div>
		);
	}
}

export default withUpdateOnChangeLocale(ReviewTab);
