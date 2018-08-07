import React from "react";
import StarRatings from "react-star-ratings";

import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/startup/client/router.jsx";

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
							className="img-responsive  hi"
						/>
					</div>
					<div className="col-md-6  prostar">
						<div className="col-md-12">
							<fieldset className="rating">
								<span className="headingoo">
									{this.props.company.name}
								</span>
								&nbsp;&nbsp;<StarRatings
									rating={
										this.props.company.avgStarRatings
											.overallSatisfaction
									}
									starDimension="25px"
									starSpacing="2px"
								/>
							</fieldset>
						</div>
						<div className="col-md-12 comp-prfl">
							<p>
								<i
									className="fa fa-map-marker"
									aria-hidden="true"
								>
									{" "}
								</i>{" "}
								{this.props.company.locations[0]}
							</p>
							{/* displaying just the first company location for now, from the list */}
							<p>
								<i className="fa fa-flask" aria-hidden="true">
									{" "}
								</i>{" "}
								{this.props.company.industry}
							</p>
							<p>
								<i className="fa fa-globe" aria-hidden="true">
									{" "}
								</i>{" "}
								{this.props.company.websiteURL}
							</p>
							<p>
								<i className="fa fa-users" aria-hidden="true">
									{" "}
								</i>{" "}
								{this.props.company.numEmployees}
							</p>
						</div>
					</div>

					<div className="col-md-4 prostar">
						<div className="col-md-12">
							<div className="titlestar">
								<a
									href={urlGenerators.vizeReviewUrl(
										this.props.company._id
									)}
									className="btn btn-primary  add_review replus"
								>
									{" "}
									<i
										className="fa fa-plus"
										aria-hidden="true"
									/>{" "}
									{i18n.__(
										"common.companyprofile.add_review"
									)}
								</a>
							</div>
						</div>
					</div>
				</div>
				<div className="clearfix" />
			</div>
		);
	}
}
