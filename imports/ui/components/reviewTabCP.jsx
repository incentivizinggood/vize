import React from "react";
import StarRatings from "react-star-ratings";
import CompanyReview from "../../ui/components/companyReview.jsx";
import CompanyRating from "../../ui/components/companyRatingsComponent.jsx";
import i18n from "meteor/universe:i18n";

const T = i18n.createComponent();

export default class ReviewTab extends React.Component {
	renderItems() {
		const userVotes = this.props.userVotes;
		return this.props.companyreview.map(function(item, i) {
			return <CompanyReview key={i} item={item} userVotes={userVotes} />;
		});
	}

	render() {
		return (
			<div role="tabpanel" className="tab-pane" id="reviews">
				<div className="col-md-12  section_rview_back_color2  ">
					<h4 className="head_section_font">
						{this.props.companyinfo.name}{" "}
						<T>common.review_tab.reviews</T>
					</h4>
					<div className="add-buttons">
						<a
							href={this.props.companyinfo.vizeReviewUrl}
							className="btn btn-primary"
						>
							{" "}
							<i className="fa fa-plus" aria-hidden="true" />{" "}
							{i18n.__("common.review_tab.add_review")}
						</a>
						{/* <button ><i className="fa fa-plus" ></i>&nbsp; Add a Review</button> */}
					</div>
					<hr />

					<CompanyRating companyrating={this.props.companyinfo} />
				</div>

				{this.renderItems()}
			</div>
		);
	}
}
