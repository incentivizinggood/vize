import React from "react";

import i18n from "meteor/universe:i18n";

import { urlGenerators } from "/imports/startup/client/router.jsx";

import CompanyRating from "./companyRatingsComponent.jsx";
import CompanyReview from "./companyReview.jsx";

const T = i18n.createComponent();

export default class OverviewTab extends React.Component {
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
		const options = {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
		};
		let to_display_jobs;
		let salaries_to_display;
		let to_display_review;
		let className;
		if (this.props.companyreview.length > 0) {
			if (this.props.companyreview[0].wouldRecommendToOtherJobSeekers) {
				className = (
					<p style={{ color: "#2E8B57" }}>
						<i
							className="fa fa-check-square"
							style={{ color: "#2E8B57" }}
							aria-hidden="true"
						/>&nbsp;&nbsp;<T>common.companyreview.recommend</T>
					</p>
				);
			} else {
				className = (
					<p style={{ color: "#FF4545" }}>
						<i
							className="far fa-times-circle"
							style={{ color: "#FF4545" }}
							aria-hidden="true"
						/>&nbsp;&nbsp;<T>common.companyreview.not_recommend</T>
					</p>
				);
			}
		}

		// FIRST REVIEW CODE TO SHOW ON THE OVERVIEW TAB

		if (this.props.companyreview.length > 0) {
			to_display_review = (
				<CompanyReview
					item={this.props.companyreview[0]}
					userVotes={this.props.userVotes}
				/>
			);
		} else {
			to_display_review = <T>common.overview_tab.display_text</T>;

			// {i18n.__(
			// 	"common.overview_tab.display_text"
			// )};
		}

		// FIRST JOB_AD CODE TO SHOW ON THE OVERVIEW TAB
		if (this.props.jobAds.length > 0) {
			to_display_jobs = (
				<div>
					<div>
						<h4>
							<strong>{this.props.jobAds[0].jobTitle}</strong>
						</h4>
					</div>
					<div>
						<div className="add-buttons">
							<a
								href={urlGenerators.vizeApplyForJobUrl(
									this.props.jobAds[0]._id
								)}
								className="btn btn-primary"
							>
								{" "}
								{i18n.__("common.overview_tab.apply_now")}
							</a>
						</div>
						<p>
							{" "}
							<i className="fa fa-map-marker" />&nbsp;&nbsp;&nbsp;{
								this.props.jobAds[0].locations[0]
							}
						</p>
						<p>
							{" "}
							<i className="fa fa-money" />&nbsp;&nbsp;{
								this.props.jobAds[0].pesosPerHour
							}
							<T>common.overview_tab.hour</T>
						</p>
						<p>
							{" "}
							<i className="fa fa-calendar" />&nbsp;&nbsp;{
								this.props.jobAds[0].contractType
							}
						</p>
					</div>

					<hr />
					<h4 className="h4-font-sz-job">
						<T>common.overview_tab.job_description</T>
					</h4>
					<div className="h4-font-sz">
						<p>{this.props.jobAds[0].jobDescription}</p>
					</div>
				</div>
			);
		} else {
			// the length == 0
			to_display_jobs = <T>common.overview_tab.display_jobs</T>;

			// {i18n.__(
			// 	"common.overview_tab.display_jobs"
			// )};
		}

		// FIRST SALARY CODE TO SHOW ON THE OVERVIEW TAB
		if (this.props.salaries.length > 0) {
			salaries_to_display = (
				<div>
					<div className="hed-soft-mob">
						<p>{this.props.salaries[0].jobTitle}</p>
						<hr />
					</div>

					<p className="mal-r">{this.props.salaries[0].gender}</p>

					<p>
						{this.props.salaries[0].incomeType}
						<span>: {this.props.salaries[0].incomeAmount}</span>
					</p>
				</div>
			);
		} else {
			salaries_to_display = <T>common.overview_tab.salaries_text</T>;
		}

		// MAIN JSX FILE

		return (
			<div role="tabpanel" className="tab-pane active" id="overview">
				<div className="col-md-12  section_rview_back_color ">
					<div className="sect_re1 ">
						<h4 className="head_section_font">
							{this.props.companyoverview.name}{" "}
							<T>common.overview_tab.overview</T>
						</h4>

						<hr />

						<div className="over_p">
							<p>
								{
									this.props.companyoverview
										.descriptionOfCompany
								}
							</p>
						</div>
					</div>
				</div>
				<div className="clear" />

				<div className="col-md-12  section_rview_back_color08  ">
					{" "}
					{/* review link */}
					<h4 className="head_section_font">
						{this.props.companyoverview.name}{" "}
						<T>common.overview_tab.reviews</T>
					</h4>
					<div className="add-buttons">
						<a
							href={urlGenerators.vizeReviewUrl(
								this.props.companyoverview._id
							)}
							className="btn btn-primary"
						>
							{" "}
							<i className="fa fa-plus" aria-hidden="true" />{" "}
							{i18n.__("common.overview_tab.add_review")}
						</a>
					</div>
					<hr />
					<CompanyRating
						companyrating={
							this.props.companyoverview.avgStarRatings
						}
					/>
				</div>
				<div className="col-md-12  section_overtopsect">
					{to_display_review}

					<center>
						<div className="na_tab1">
							<ul className="" role="tablist">
								<li role="presentation" className="te_deco">
									<a
										href="#reviews"
										aria-controls="reviews"
										role="tab"
										data-toggle="tab"
									>
										<strong>
											<T>
												common.overview_tab.see_all_reviews
											</T>
										</strong>
									</a>
								</li>
							</ul>
						</div>
					</center>
				</div>
				{/* review link */}

				<div className="col-md-12  section_rview_back_color_job">
					{" "}
					{/* job link */}
					<div className="sect_re1 ">
						<h4 className="head_section_font">
							{this.props.jobsCount}{" "}
							<T>common.overview_tab.jobs_available</T>
						</h4>
						<hr />

						{to_display_jobs}

						<center>
							<div className="na_tab1">
								<ul className="" role="tablist">
									<li role="presentation" className="te_deco">
										<a
											href="#jobs"
											aria-controls="jobs"
											aria-expanded="true"
											role="tab"
											data-toggle="tab"
										>
											{" "}
											<strong>
												<T>
													common.overview_tab.see_all_jobs
												</T>
											</strong>
										</a>
									</li>
								</ul>
							</div>
						</center>
					</div>
				</div>

				{/* job link */}

				<div className="col-md-12  section_rview_back_color_job">
					{" "}
					{/* salaries  */}
					<div className="sect_re1  sec_p">
						<h4 className="head_section_font">
							{this.props.salariesCount}{" "}
							<T>common.overview_tab.job_salaries</T>
						</h4>

						<div className="add-buttons">
							<a
								href={urlGenerators.vizeSalaryUrl(
									this.props.companyoverview._id
								)}
								className="btn btn-primary"
							>
								<i className="fa fa-plus" aria-hidden="true" />{" "}
								{i18n.__("common.overview_tab.add_salary")}
							</a>
						</div>
						<hr />

						{salaries_to_display}

						<center>
							<ul className="" role="tablist">
								<li
									role="presentation"
									id="see_all_salaries"
									className="te_deco"
								>
									<a
										href="#salaries"
										aria-controls="salaries"
										role="tab"
										data-toggle="tab"
									>
										<strong>
											<T>
												common.overview_tab.see_all_salaries
											</T>
										</strong>
									</a>
								</li>
							</ul>
						</center>
					</div>
				</div>
			</div>
		);
	}
}
