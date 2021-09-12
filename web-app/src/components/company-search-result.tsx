import React from "react";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUsers,
	faFlask,
	faMapMarker,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

import * as urlGenerators from "src/pages/url-generators";
import { processLocation } from "src/misc";
import { WriteReviewButton } from "src/components/button";
import { translations } from "src/translations";
import { forSize } from "src/responsive";
import defaultCompanyIcon from "src/images/default-company.png";
import { CompanySearchResultFragment } from "generated/graphql-operations";

const T = translations.legacyTranslationsNeedsRefactor.CompanySearchResult;

const CompanySearchContainer = styled.div`
	display: flex;
	flex-direction: column;

	padding: 15px;
	margin-right: auto;
	margin-left: auto;
	margin-bottom: 35px;

	box-shadow: 0px 0px 3px 0px;
	background-color: white;
	border-radius: 8px;

	width: 60%;

	${forSize.phoneOnly} {
		width: 95%;
		margin-bottom: 15px;
	}
`;

// Contains the logo, comp title, ratings, location, industry, size, and write a review button
const CompanySearchTopItemsContainer = styled.div`
	display: flex;

	${forSize.phoneOnly} {
		flex-direction: column;
	}
`;

// Contains the company stats and description
const CompanySearchBottomItemsContainer = styled.div`
	display: flex;

	${forSize.phoneOnly} {
		flex-direction: column;
	}
`;

const CompanyDataStatisticsComponent = styled.div`
	margin-top: 4px;
	padding-bottom: 20px;
	padding-top: 10px;
	display: flex;
	justify-content: center;

	> * {
		margin-right: 15px;
	}
`;

const WriteReviewButtonContainer = styled.div`
	float: right;

	${forSize.phoneOnly} {
		float: none;
		display: flex;
		justify-content: center;
	}
`;

const CompanyProfileImageContainer = styled.div`
	display: flex;
	padding: 10px;
	align-items: center;
	width: 25%;

	${forSize.phoneOnly} {
		width: 100%;
	}
`;

const CompanyProfileImage = styled.img`
	display: block;
	max-width: 160px;
	max-height: 160px;
	height: auto;

	${forSize.phoneOnly} {
		height: auto;
		width: 190px;
		margin: 0 auto;
	}
`;

interface CompanySearchResultProps {
	company: CompanySearchResultFragment;
}

function CompanySearchResult(props: CompanySearchResultProps): JSX.Element {
	const companyProfileUrl = urlGenerators.vizeCompanyProfileUrl(
		props.company.id
	);

	const companyProfileIcon = props.company.companyIconURL
		? props.company.companyIconURL
		: defaultCompanyIcon;

	return (
		<div>
			<CompanySearchContainer>
				<CompanySearchTopItemsContainer>
					<CompanyProfileImageContainer>
						<Link
							to={companyProfileUrl}
							style={{ margin: "0 auto" }}
						>
							<CompanyProfileImage
								src={companyProfileIcon}
								alt={`The company logo of ${props.company.name}`}
							/>
						</Link>
					</CompanyProfileImageContainer>
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
						{props.company.avgStarRatings ? (
							<>
								&nbsp;&nbsp;
								<StarRatings
									rating={
										props.company.avgStarRatings
											.overallSatisfaction
									}
									starDimension="25px"
									starSpacing="2px"
								/>
							</>
						) : null}
						<div className="col-md-12 comp-class">
							<div className="locahed">
								<h4>
									<FontAwesomeIcon icon={faMapMarker} />{" "}
									<span>
										{/* Gotta do a hack because I can't figure out
										how to do this processing on a higher level
										of the stack */}
										{props.company.locations.map(
											(location) =>
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
							<WriteReviewButtonContainer>
								<WriteReviewButton
									companyName={props.company.name}
									buttonLocation="Search"
								/>
							</WriteReviewButtonContainer>
						</div>
					</div>
				</CompanySearchTopItemsContainer>

				<CompanySearchBottomItemsContainer>
					<div className="col-md-3">
						<CompanyDataStatisticsComponent>
							<div>
								{props.company.numReviews} <br />
								<span className="review_text">
									<T.reviews />
								</span>
							</div>
							<div>
								{props.company.numSalaries}
								<br />
								<span className="review_text">
									<T.salaries />
								</span>
							</div>
							<div>
								{props.company.numJobAds}
								<br />
								<span className="review_text">
									<T.jobs />
								</span>
							</div>
						</CompanyDataStatisticsComponent>
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
				</CompanySearchBottomItemsContainer>
				<div className="clearfix" />
			</CompanySearchContainer>
		</div>
	);
}

export default CompanySearchResult;
