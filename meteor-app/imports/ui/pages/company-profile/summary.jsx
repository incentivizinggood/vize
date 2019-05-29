import React from "react";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faPlus,
	faUsers,
	faFlask,
	faMapMarker,
	faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import { processLocation } from "/imports/api/models/helpers/postgresql/misc.js";
import { urlGenerators } from "/imports/ui/pages";
import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";

function CompanyProfileSummary(props) {
	return (
		<div className="full-width-container no-padding--bottom">
			<div className="container welpad12 box_shadow">
				<div className="col-md-2 prostar">
					<img
						src="/images/default-company.png"
						className="img-responsive"
					/>
				</div>

				<div className="col-md-6">
					<div className="row">
						<div className="col-md-12">
							<fieldset className="rating">
								<span className="headingoo">
									{props.company.name}
								</span>
								&nbsp;&nbsp;
								<StarRatings
									rating={
										props.company.avgStarRatings
											.overallSatisfaction
									}
									starDimension="25px"
									starSpacing="2px"
								/>
							</fieldset>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<p>
								<FontAwesomeIcon icon={faMapMarker} />{" "}
								{processLocation(
									JSON.stringify(props.company.locations[0])
								)}
							</p>
							{/* displaying just the first company location for now, from the list */}
							<p>
								<FontAwesomeIcon icon={faFlask} />{" "}
								{props.company.industry}
							</p>
							<p>
								<FontAwesomeIcon icon={faGlobe} />{" "}
								<Link
									to={props.company.websiteURL || ""}
									target="_blank"
								>
									{props.company.websiteURL}
								</Link>
							</p>
							<p>
								<FontAwesomeIcon icon={faUsers} />{" "}
								{props.company.numEmployees}
							</p>
						</div>
					</div>
				</div>

				<div className="col-md-4 prostar">
					<div className="col-md-12">
						<Link
							to={urlGenerators.vizeReviewUrl(props.company.id)}
							className="btn btn-primary btn-lg"
						>
							{" "}
							<FontAwesomeIcon icon={faPlus} />{" "}
							{i18n.__("common.companyprofile.add_review")}
						</Link>
					</div>
				</div>
			</div>
			<div className="clearfix" />
		</div>
	);
}

export default withUpdateOnChangeLocale(CompanyProfileSummary);
