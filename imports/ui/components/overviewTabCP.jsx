import React from "react";

import i18n from "meteor/universe:i18n";

import CompanyRating from "./companyRatingsComponent.jsx";
import CompanyReview from "./companyReview.jsx";

const t = i18n.createTranslator("common.overview_tab")
const T = i18n.createComponent(t);

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
		let toDisplayJobs;
		let salariesToDisplay;
		let toDisplayReview;

		// FIRST REVIEW CODE TO SHOW ON THE OVERVIEW TAB

		if (this.props.companyReview.length > 0) {
			toDisplayReview = (
				<CompanyReview
					item={this.props.companyReview[0]}
					userVotes={this.props.userVotes}
				/>
			);
		} else {
			toDisplayReview = <T>display_text</T>;
		}

		// FIRST JOB_AD CODE TO SHOW ON THE OVERVIEW TAB
		if (this.props.jobAds.length > 0) {
			toDisplayJobs = (
				<div>
					<div>
						<h4>
							<strong>{this.props.jobAds[0].jobTitle}</strong>
						</h4>
					</div>
					<div>
						<div className="add-buttons">
							<a
								href={this.props.jobAds[0].vizeApplyForJobUrl}
								className="btn btn-primary"
							>
								{" "}
								{t("apply_now")}
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
							<T>hour</T>
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
						<T>job_description</T>
					</h4>
					<div className="h4-font-sz">
						<p>{this.props.jobAds[0].jobDescription}</p>
					</div>
				</div>
			);
		} else {
			// the length == 0
			toDisplayJobs = <T>display_jobs</T>;
		}

		// FIRST SALARY CODE TO SHOW ON THE OVERVIEW TAB
		if (this.props.salaries.length > 0) {
			salariesToDisplay = (
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
			salariesToDisplay = <T>salaries_text</T>;
		}

		// MAIN JSX FILE

		return (
			<div role="tabpanel" className="tab-pane active" id="overview">
				<div className="col-md-12  section_rview_back_color ">
					<div className="sect_re1 ">
						<h4 className="head_section_font">
							{this.props.companyOverview.name}{" "}
							<T>overview</T>
						</h4>

						<hr />

						<div className="over_p">
							<p>
								{
									this.props.companyOverview
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
						{this.props.companyOverview.name}{" "}
						<T>reviews</T>
					</h4>
					<div className="add-buttons">
						<a
							href={this.props.companyOverview.vizeReviewUrl}
							className="btn btn-primary"
						>
							{" "}
							<i className="fa fa-plus" aria-hidden="true" />{" "}
							{t("add_review")}
						</a>
					</div>
					<hr />
					<CompanyRating companyrating={this.props.companyOverview} />
				</div>
				<div className="col-md-12  section_overtopsect">
					{toDisplayReview}

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
											<T>see_all_reviews</T>
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
							<T>jobs_available</T>
						</h4>
						<hr />

						{toDisplayJobs}

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
												<T>see_all_jobs</T>
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
							<T>job_salaries</T>
						</h4>

						<div className="add-buttons">
							<a
								href={this.props.companyOverview.vizeSalaryUrl}
								className="btn btn-primary"
							>
								<i className="fa fa-plus" aria-hidden="true" />{" "}
								{t("add_salary")}
							</a>
						</div>
						<hr />

						{salariesToDisplay}

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
											<T>see_all_salaries</T>
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
