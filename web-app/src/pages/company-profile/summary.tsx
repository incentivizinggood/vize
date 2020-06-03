import React from "react";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUsers,
	faFlask,
	faMapMarker,
	faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import { processLocation } from "src/misc";
import { WriteReviewButton } from "src/components/button";

import defaultCompany from "src/images/default-company.png";

function CompanyProfileSummary(props) {
	return (
		<div className="full-width-container no-padding--bottom">
			<div className="container welpad12 box_shadow">
				<div className="col-md-2 prostar">
					<img src={defaultCompany} className="img-responsive" />
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
								<a
									href={props.company.websiteURL}
									target="_blank"
									rel="noopener noreferrer"
								>
									{props.company.websiteURL}
								</a>
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
						<WriteReviewButton
							companyName={props.company.name}
							buttonLocation="Company Profile | Top"
						/>
					</div>
				</div>
			</div>
			<div className="clearfix" />
		</div>
	);
}

export default CompanyProfileSummary;
