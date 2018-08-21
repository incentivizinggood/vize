import React from "react";

import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/startup/client/router.jsx";

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
		let to_display_review;
		if (this.props.companyreview.length > 0) {
			to_display_review = (
				<CompanyReview
					item={this.props.companyreview[0]}
					userVotes={this.props.userVotes}
				/>
			);
		} else {
			to_display_review = <T>common.overview_tab.display_text</T>;
		}

		return (
			<>
				<div className="col-md-12  section_rview_back_color08  ">
					{" "}
					{/* review link */}
					<h4 className="head_section_font">
						{this.props.companyoverview.name}{" "}
						<T>common.overview_tab.reviews</T>
					</h4>
					<div className="add-buttons">
						<a
							href={urlGenerators.vizeReviewUrl(
								this.props.companyoverview._id
							)}
							className="btn btn-primary"
						>
							{" "}
							<i className="fa fa-plus" aria-hidden="true" />{" "}
							{i18n.__("common.overview_tab.add_review")}
						</a>
					</div>
					<hr />
					<CompanyRating
						companyrating={
							this.props.companyoverview.avgStarRatings
						}
						percentRecommended={
							this.props.companyoverview.percentRecommended
						}
						avgNumMonthsWorked={
							this.props.companyoverview.avgNumMonthsWorked
						}
					/>
				</div>
				<div className="col-md-12  section_overtopsect">
					{to_display_review}

					<center>
						<div className="na_tab1">
							<ul className="" role="tablist">
								<li role="presentation" className="te_deco">
									<a
										href="#reviews"
										aria-controls="reviews"
										role="tab"
										data-toggle="tab"
									>
										<strong>
											<T>
												common.overview_tab.see_all_reviews
											</T>
										</strong>
									</a>
								</li>
							</ul>
						</div>
					</center>
				</div>
			</>
		);
	}
}
