import React from "react";

import i18n from "meteor/universe:i18n";

import CompanyReview from "/imports/ui/components/companyReview.jsx";
import CompanyRating from "/imports/ui/components/companyRatingsComponent.jsx";
import WriteReviewButton from "/imports/ui/components/write-review-button.jsx";

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
								<WriteReviewButton
									companyId={this.props.company.id}
								/>
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
