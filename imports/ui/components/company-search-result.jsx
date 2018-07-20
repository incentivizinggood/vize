import React from "react";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";

import { Meteor } from "meteor/meteor";

import { withTracker } from "meteor/react-meteor-data";
import i18n from "meteor/universe:i18n";

import { JobAds } from "/imports/api/data/jobads.js";
import { Salaries } from "/imports/api/data/salaries.js";
import WriteReviewButton from "./write-review-button.jsx";

// temporary during migration to PostgreSQL
import { PgSubscription } from "meteor/numtel:pg";

const t = i18n.createTranslator("common.CompanySearchResult");
const T = i18n.createComponent(t);

function CompanySearchResult(props) {
	const companyProfileUrl = `/companyprofile/?id=${props.company.id}`;
	// if (!props.ready) {
	// 	return (
	// 		<h2>
	// 			<T>common.companyprofile.loading</T>
	// 		</h2>
	// 	);
	// }
	return (
		<div>
			<div className="container box2 all_boxcolor">
				<div className="container  welpad1">
					<div className="col-md-3  prostar">
						<a href={companyProfileUrl}>
							<div className="shdo">
								<img
									src="/images/default-company.png"
									className="img-responsive"
									alt={`The company logo of ${
										props.company.name
									}`}
								/>
							</div>
						</a>
					</div>
					<div className="col-md-4  prostar">
						<span className="goo">
							{" "}
							<a href={companyProfileUrl}>{props.company.name}</a>
						</span>
						&nbsp;&nbsp;<StarRatings
							rating={
								props.company.avgStarRatings.overallSatisfaction
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
									<span>{props.company.locations}</span>
								</h4>
								<h4>
									<i
										className="fa fa-flask"
										aria-hidden="true"
									/>{" "}
									<span>{props.company.industry}</span>
								</h4>
								<h4>
									<i
										className="fa fa-users"
										aria-hidden="true"
									/>{" "}
									<span>{props.company.numEmployees}</span>
								</h4>
							</div>
						</div>
					</div>
					<div className="col-md-5 prostar">
						<div className="col-md-12">
							<div className="titlestar">
								<WriteReviewButton
									companyId={props.company.id}
								/>
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
									{props.company.numReviews} <br />
									<span className="review_text">
										<T>reviews</T>
									</span>
								</li>
								<li>
									{props.salaryCount}
									<br />
									<span className="review_text">
										<T>salaries</T>
									</span>
								</li>
								<li>
									{props.jobadCount}
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
							<p>{props.company.descriptionOfCompany}</p>
						</div>
					</div>
				</div>
				<div className="clearfix" />
			</div>
		</div>
	);
}

CompanySearchResult.propTypes = {
	// ready: PropTypes.bool.isRequired,
	jobadCount: PropTypes.number.isRequired,
	salaryCount: PropTypes.number.isRequired,
	company: PropTypes.shape({
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

export default withTracker(({ company }) => {
	Meteor.subscribe("JobAds");
	Meteor.subscribe("Salaries");
	//
	// const jobAdCountSub = new PgSubscription(
	// 	"CompanyJobAdCounts",
	// 	company.name
	// );
	// const salaryCountSub = new PgSubscription(
	// 	"CompanySalaryCounts",
	// 	company.name
	// );

	return {
		// ready: jobAdCountSub.ready() && salaryCountSub.ready(),
		jobadCount: JobAds.find({ companyName: company.name }).count(),
		salaryCount: Salaries.find({ companyName: company.name }).count(),
	};
})(CompanySearchResult);

/*

	export default withTracker(({ company })) => {
		const jobAdCountSub = PgSubscription("CompanyJobAdCounts", company.name);
		const salaryCountSub = PgSubscription("CompanySalaryCounts", company.name);

		return {
			jobadCount: jobAdCountSub[0].count // process?
			salaryCount: salaryCountSub[0].count // process?
		};
	}

*/
