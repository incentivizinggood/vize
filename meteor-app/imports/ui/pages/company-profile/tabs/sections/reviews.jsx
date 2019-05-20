import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";
import { urlGenerators } from "/imports/ui/pages";
import CompanyRating from "/imports/ui/components/companyRatingsComponent.jsx";
import CompanyReview from "/imports/ui/components/companyReview.jsx";

const T = i18n.createComponent();

export default class ReviewsSection extends React.Component {
	componentDidMount() {
		// Ask to be updated "reactively".
		// universe:i18n cannot be trusted to do that automaticaly.
		this.i18nInvalidate = () => this.forceUpdate();
		i18n.onChangeLocale(this.i18nInvalidate);
	}

	componentWillUnmount() {
		i18n.offChangeLocale(this.i18nInvalidate);
	}

	render() {
		// FIRST REVIEW CODE TO SHOW ON THE OVERVIEW TAB
		let reviewsToDisplay;
		if (this.props.company.reviews.length > 0) {
			reviewsToDisplay = (
				<CompanyReview
					review={this.props.company.reviews[0]}
					companyName={this.props.company.name}
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
						{this.props.company.name}{" "}
						<T>common.overview_tab.reviews</T>
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
					</div>
					<hr />
					<CompanyRating company={this.props.company} />
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
}
