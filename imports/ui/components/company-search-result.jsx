import React from "react";
import StarRatings from "react-star-ratings";
import PropTypes from "prop-types";

import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import i18n from "meteor/universe:i18n";

import { JobAds } from "/imports/api/data/jobads.js";
import { Salaries } from "/imports/api/data/salaries.js";

const T = i18n.createComponent();

class CompanyComponent extends React.Component {
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
		console.log(this.props.salaries);
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
									/>
								</div>
							</a>
						</div>
						<div className="col-md-4  prostar">
							<label className="goo">
								{" "}
								<a
									href={`/companyprofile/?id=${
										this.props.item.id
									}`}
								>
									{this.props.item.name}
								</a>
							</label>
							&nbsp;&nbsp;<StarRatings
								rating={
									this.props.item.avgStarRatings
										.overallSatisfaction
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
										<span>{this.props.item.locations}</span>
									</h4>
									<h4>
										<i
											className="fa fa-flask"
											aria-hidden="true"
										/>{" "}
										<span>{this.props.item.industry}</span>
									</h4>
									<h4>
										<i
											className="fa fa-users"
											aria-hidden="true"
										/>{" "}
										<span>
											{this.props.item.numEmployees}
										</span>
									</h4>
								</div>
							</div>
						</div>
						<div className="col-md-5 prostar">
							<div className="col-md-12">
								<div className="titlestar">
									<div className="" data-toggle="buttons">
										<label className="btn btn-lg btn-success active btn_follow1">
											{/* FOLLOW BUTTON CODE COMMENTED OUT   */}

											{/* <input type="radio" name="options" id="option1" autoComplete="off" defaultChecked/>
                          <i className="fa fa-check"></i> Following
                          </label>
                          <label className="btn btn-lg btn-danger btn_follow1">
                          <input type="radio" name="options" id="option" autoComplete="off"/>
                          Follow */}

											{/* FOLLOW BUTTON CODE ENDS */}
										</label>
									</div>
									<a
										href={`/write-review/?id=${
											this.props.item.id
										}`}
										className="btn btn-primary  add_review replus"
									>
										{" "}
										<i
											className="fa fa-plus"
											aria-hidden="true"
										/>{" "}
										{i18n.__(
											"common.overview_tab.add_review"
										)}
									</a>
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
										{this.props.item.numReviews} <br />
										<span className="review_text">
											<T>
												common.company_component.reviews
											</T>
										</span>
									</li>
									<li>
										{this.props.salaries}
										<br />
										<span className="review_text">
											<T>
												common.company_component.salaries
											</T>
										</span>
									</li>
									<li>
										{this.props.jobads}
										<br />
										<span className="review_text">
											<T>common.company_component.jobs</T>
										</span>
									</li>
								</ul>
							</div>
						</div>
						<div className="col-md-9">
							<div className="pargrf">
								<p>{this.props.item.descriptionOfCompany}</p>
							</div>
						</div>
					</div>
					<div className="clearfix" />
				</div>
			</div>
		);
	}
}

CompanyComponent.propTypes = {
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
	const handle = Meteor.subscribe("JobAds");
	const handle1 = Meteor.subscribe("Salaries");

	return {
		jobads: JobAds.find({ companyName: item.name }).count(),
		salaries: Salaries.find({ companyName: item.name }).count(),
	};
})(CompanyComponent);
