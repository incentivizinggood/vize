import React from "react";

import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/startup/client/router.jsx";

import CompanyReview from "/imports/ui/components/companyReview.jsx";
import CompanyRating from "/imports/ui/components/companyRatingsComponent.jsx";

const T = i18n.createComponent();

export default class ReviewTab extends React.Component {
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
		const renderItems = this.props.company.reviews.map(review => (
			<CompanyReview
				key={review.id}
				review={review}
				refetch={this.props.refetch}
			/>
		));

		return (
			<div role="tabpanel" className="tab-pane" id="reviews">
				<div className="col-md-12  section_rview_back_color2  ">
					<h4 className="head_section_font">
						{this.props.company.name}{" "}
						<T>common.review_tab.reviews</T>
					</h4>
					<div className="add-buttons">
						<a
							href={urlGenerators.vizeReviewUrl(
								this.props.company.id
							)}
							className="btn btn-primary"
						>
							{" "}
							<i className="fa fa-plus" aria-hidden="true" />{" "}
							{i18n.__("common.overview_tab.add_review")}
						</a>
						{/* <button ><i className="fa fa-plus" ></i>&nbsp; Add a Review</button> */}
					</div>
					<hr />

					<CompanyRating company={this.props.company} />
				</div>

				{renderItems}
			</div>
		);
	}
}
