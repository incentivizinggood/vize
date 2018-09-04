import React from "react";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import i18n from "meteor/universe:i18n";
import { processLocation } from "/imports/api/models/helpers/postgresql/misc.js";
import WriteReviewButton from "./write-review-button.jsx";

const t = i18n.createTranslator("common.CompanySearchResult");
const T = i18n.createComponent(t);

function CompanySearchResult(props) {
	const companyProfileUrl = `/companyprofile/?id=${props.company.id}`;
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
									<FontAwesomeIcon icon="map-marker" />{" "}
									<span>
										{/* Gotta do a hack because I can't figure out
										how to do this processing on a higher level
										of the stack */}
										{props.company.locations.map(
											location =>
												processLocation(
													JSON.stringify(location)
												) +
												// separate locations with commas except the last one
												(location ===
												props.company.locations.slice(
													-1
												)[0]
													? ""
													: ", ")
										)}
									</span>
								</h4>
								<h4>
									<FontAwesomeIcon icon="flask" />{" "}
									<span>{props.company.industry}</span>
								</h4>
								<h4>
									<FontAwesomeIcon icon="users" />{" "}
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
									{props.company.numSalaries}
									<br />
									<span className="review_text">
										<T>salaries</T>
									</span>
								</li>
								<li>
									{props.company.numJobAds}
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
		numJobAds: PropTypes.number.isRequired,
		numSalaries: PropTypes.number.isRequired,
	}).isRequired,
};

export default CompanySearchResult;
