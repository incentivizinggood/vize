import React from "react";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import i18n from "meteor/universe:i18n";

import { JobAds } from "/imports/api/data/jobads.js";
import { Salaries } from "/imports/api/data/salaries.js";
import WriteReviewButton from "./write-review-button.jsx";

const t = i18n.createTranslator("common.CompanySearchResult");
const T = i18n.createComponent(t);

function CompanySearchResult(props) {
	return (
		<div>
			<div className="container box2 all_boxcolor">
				<div className="container  welpad1">
					<div className="col-md-3  prostar">
						<a href="/companyprofile">
							<div className="shdo">
								<img
									src="/images/default-company.png"
									className="img-responsive"
									alt={`The company logo of ${
										props.item.name
									}`}
								/>
							</div>
						</a>
					</div>
					<div className="col-md-4  prostar">
						<span className="goo">
							{" "}
							<a href={`/companyprofile/?id=${props.item.id}`}>
								{props.item.name}
							</a>
						</span>
						&nbsp;&nbsp;<StarRatings
							rating={
								props.item.avgStarRatings.overallSatisfaction
							}
							starDimension="25px"
							starSpacing="2px"
						/>
						<div className="col-md-12 comp-class">
							<div className="locahed">
								<h4>
									<i
										className="fa fa-map-marker"
										aria-hidden="true"
									/>{" "}
									<span>{props.item.locations}</span>
								</h4>
								<h4>
									<i
										className="fa fa-flask"
										aria-hidden="true"
									/>{" "}
									<span>{props.item.industry}</span>
								</h4>
								<h4>
									<i
										className="fa fa-users"
										aria-hidden="true"
									/>{" "}
									<span>{props.item.numEmployees}</span>
								</h4>
							</div>
						</div>
					</div>
					<div className="col-md-5 prostar">
						<div className="col-md-12">
							<div className="titlestar">
								<WriteReviewButton companyId={props.item.id} />
							</div>
						</div>
					</div>
				</div>
				<div className="clearfix" />
				<div className="container  welpad1">
					<div className="col-md-3">
						<div className="reviews1">
							<ul>
								<li className="active">
									{props.item.numReviews} <br />
									<span className="review_text">
										<T>reviews</T>
									</span>
								</li>
								<li>
									{props.salaries}
									<br />
									<span className="review_text">
										<T>salaries</T>
									</span>
								</li>
								<li>
									{props.jobads}
									<br />
									<span className="review_text">
										<T>jobs</T>
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-md-9">
						<div className="pargrf">
							<p>{props.item.descriptionOfCompany}</p>
						</div>
					</div>
				</div>
				<div className="clearfix" />
			</div>
		</div>
	);
}

CompanySearchResult.propTypes = {
	jobads: PropTypes.number.isRequired,
	salaries: PropTypes.number.isRequired,
	item: PropTypes.shape({
		id: PropTypes.string.isRequired,
		name: PropTypes.string.isRequired,
		numEmployees: PropTypes.string,
		industry: PropTypes.string,
		locations: PropTypes.arrayOf(PropTypes.string).isRequired,
		descriptionOfCompany: PropTypes.string,
		avgStarRatings: PropTypes.shape({
			overallSatisfaction: PropTypes.number.isRequired,
		}),
		numReviews: PropTypes.number.isRequired,
	}).isRequired,
};

export default withTracker(({ item }) => {
	Meteor.subscribe("JobAds");
	Meteor.subscribe("Salaries");

	return {
		jobads: JobAds.find({ companyName: item.name }).count(),
		salaries: Salaries.find({ companyName: item.name }).count(),
	};
})(CompanySearchResult);
