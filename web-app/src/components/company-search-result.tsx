import React from "react";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUsers,
	faFlask,
	faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import defaultCompanyImg from "src/images/default-company.png";

import { processLocation } from "src/misc";
import { WriteReviewButton } from "src/components/button";
import { translations } from "src/translations";

const T = translations.legacyTranslationsNeedsRefactor.CompanySearchResult;

interface CompanySearchResultProps {
	company: {
		id: unknown;
		name: string;
		avgStarRatings: {
			overallSatisfaction: number;
		};
		industry?: string;
		numEmployees?: string;
		numReviews: number;
		numSalaries: number;
		numJobAds: number;
		descriptionOfCompany?: string;
		locations: string[];
	};
}

function CompanySearchResult(props: CompanySearchResultProps) {
	const companyProfileUrl = `/companyprofile/?id=${props.company.id}`;
	return (
		<div>
			<div className="container company-search-container">
				<div className="container">
					<div className="col-md-3  prostar">
						{
							//TODO: removing prevState because it for some reason returns error 400 when Used
						}
						<Link to={companyProfileUrl}>
							<div className="company-search-img">
								<img
									src={defaultCompanyImg}
									className="img-responsive"
									alt={`The company logo of ${props.company.name}`}
								/>
							</div>
						</Link>
					</div>
					<div className="col-md-4  prostar">
						<span className="goo">
							{" "}
							{
								//TODO: removing prevState because it for some reason returns error 400 when Used
							}
							<Link to={companyProfileUrl}>
								{props.company.name}
							</Link>
						</span>
						&nbsp;&nbsp;
						<StarRatings
							rating={
								props.company.avgStarRatings.overallSatisfaction
							}
							starDimension="25px"
							starSpacing="2px"
						/>
						<div className="col-md-12 comp-class">
							<div className="locahed">
								<h4>
									<FontAwesomeIcon icon={faMapMarker} />{" "}
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
													? " "
													: ", ")
										)}
									</span>
								</h4>
								<h4>
									<FontAwesomeIcon icon={faFlask} />{" "}
									<span>{props.company.industry}</span>
								</h4>
								<h4>
									<FontAwesomeIcon icon={faUsers} />{" "}
									<span>{props.company.numEmployees}</span>
								</h4>
							</div>
						</div>
					</div>
					<div className="col-md-5 prostar">
						<div className="col-md-12">
							<div className="titlestar">
								<WriteReviewButton
									companyName={props.company.name}
									buttonLocation="Search"
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
										<T.reviews />
									</span>
								</li>
								<li>
									{props.company.numSalaries}
									<br />
									<span className="review_text">
										<T.salaries />
									</span>
								</li>
								<li>
									{props.company.numJobAds}
									<br />
									<span className="review_text">
										<T.jobs />
									</span>
								</li>
							</ul>
						</div>
					</div>
					<div className="col-md-9">
						<div className="company-search-desc">
							<p>{props.company.descriptionOfCompany}</p>
						</div>
						<div className="btn_mob_view_only">
							<div className="group_all_btn">
								<div className="btn-group btn-group-justified ">
									<Link
										to="#"
										className="btn btn-primary border_btn color_btn"
									>
										Reviews
									</Link>
									<Link
										to="#"
										className="btn btn-primary color_btn"
									>
										Jobs
									</Link>
									<Link
										to="#"
										className="btn btn-primary border_btn color_btn"
									>
										Salaries
									</Link>
								</div>
							</div>
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