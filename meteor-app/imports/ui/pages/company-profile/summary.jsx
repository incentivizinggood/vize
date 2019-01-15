import React from "react";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";
import { processLocation } from "/imports/api/models/helpers/postgresql/misc.js";
import { urlGenerators } from "/imports/ui/pages";

export default class CompanyProfileSummary extends React.Component {
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
		return (
			<div className="welcome  welpadgo wel_profile">
				<div className="container  welpad12 box_shadow">
					<div className="col-md-2  prostar">
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
										{this.props.company.name}
									</span>
									&nbsp;&nbsp;
									<StarRatings
										rating={
											this.props.company.avgStarRatings
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
									<FontAwesomeIcon icon="map-marker" />{" "}
									{processLocation(
										JSON.stringify(
											this.props.company.locations[0]
										)
									)}
								</p>
								{/* displaying just the first company location for now, from the list */}
								<p>
									<FontAwesomeIcon icon="flask" />{" "}
									{this.props.company.industry}
								</p>
								<p>
									<FontAwesomeIcon icon="globe" />{" "}
									<Link
										to={this.props.company.websiteURL || ""}
										target="_blank"
									>
										{this.props.company.websiteURL}
									</Link>
								</p>
								<p>
									<FontAwesomeIcon icon="users" />{" "}
									{this.props.company.numEmployees}
								</p>
							</div>
						</div>
					</div>

					<div className="col-md-4 prostar">
						<div className="col-md-12">
							<Link
								to={urlGenerators.vizeReviewUrl(
									this.props.company.id
								)}
								className="btn btn-primary btn-lg"
							>
								{" "}
								<FontAwesomeIcon icon="plus" />{" "}
								{i18n.__("common.companyprofile.add_review")}
							</Link>
						</div>
					</div>
				</div>
				<div className="clearfix" />
			</div>
		);
	}
}
