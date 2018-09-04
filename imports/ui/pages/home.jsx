import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Meteor } from "meteor/meteor";
import i18n from "meteor/universe:i18n";

import Header from "/imports/ui/components/header";
import Footer from "/imports/ui/components/footer.jsx";
import HomePageSearch from "../components/home-page-search.jsx";

const t = i18n.createTranslator("common.homePage");
const T = i18n.createComponent(t);

export default class HomePage extends React.Component {
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
			<div>
				<Header />

				<div className="banner">
					<div className="banner-info">
						<div className="banner-text">
							<div id="top" className="callbacks_container">
								<ul className="rslides" id="slider3">
									<li>
										<div className="banner-text-info">
											<h1>
												<T>mainBanner</T>
											</h1>
											<HomePageSearch />
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="welcome  welpad">
					<div className="container  des-top-view">
						<div className="col-md-8 ">
							<div>
								<img
									className="img-responsive"
									src="images/home-img-2.png"
									alt="Computer screen with example job ad."
								/>
							</div>
						</div>
						<div className="col-md-4 ">
							<div className="great-job-hm">
								<h1>
									<T>findjob_part1</T> <br />{" "}
									<T>commonLine</T>{" "}
								</h1>
							</div>
							<div className="great-comp-hm">
								<h4>
									<T>findjob_text</T>
								</h4>
							</div>
							<div className="titlestar  ">
								<center>
									<a
										href="/jobs"
										className="button out-butt-dark  "
									>
										<T>jobsButton</T>
									</a>
								</center>
							</div>
						</div>

						<div className="clearfix" />
					</div>

					{/* =====mobile view show====  */}

					<div className="container  mobile-view-box">
						<div className="col-md-4 ">
							<div className="great-job-hm">
								<h1>
									<T>findjob_part1</T> <br />{" "}
									<T>commonLine</T>{" "}
								</h1>
							</div>
							<div className="great-comp-hm">
								<h4>
									<T>findjob_text</T>
								</h4>
							</div>
							<div className="titlestar  ">
								<center>
									<a
										href="/jobs"
										className="button out-butt-dark  "
									>
										<T>jobsButton</T>
									</a>
								</center>
							</div>
						</div>
						<br />
						<br />
						<div className="col-md-8 ">
							<div>
								<center>
									{" "}
									<img
										className="img-responsive"
										src="images/mobile-1.png"
										alt="Smart phone with example job ad."
									/>
								</center>
							</div>
						</div>

						<div className="clearfix" />
					</div>
					{/* ====mobile view show  end==== */}
				</div>

				{/*  find great employer */}

				<div className="welcome  welpad   back-hm-sect-colr">
					<div className="container  blu-section-desc">
						<div className="col-md-5 ">
							<div className="great-emp-hm">
								<h1>
									<T>findemp_part1</T> <br />
									<T>findemp_part2</T>{" "}
								</h1>
							</div>
							<div className="great-discover-emp">
								<h4>
									<T>findemp_text</T>
								</h4>
							</div>
							<div className="companies-btn  ">
								<center>
									<a
										href="/companies"
										className="button out-bodr  "
									>
										<T>companiesButton</T>
									</a>
								</center>
							</div>
						</div>
						<div className="col-md-7 ">
							<div>
								<img
									className="img-responsive"
									src="images/home-img-1.png"
									alt="Computer screen with example company rateings."
								/>
							</div>
						</div>
						<div className="clearfix" />
					</div>

					{/* ===mobile view blue section==== */}

					<div className="container  blu-mobile-sect">
						<div className="col-md-5 ">
							<div className="great-emp-hm">
								<h1>
									<T>findemp_part1</T> <br />
									<T>findemp_part2</T>{" "}
								</h1>
							</div>
							<div className="great-discover-emp">
								<h4>
									<T>findemp_text</T>
								</h4>
							</div>
							<div className="companies-btn  ">
								<center>
									<a
										href="/companies"
										className="button out-bodr  "
									>
										<T>companiesButton</T>
									</a>
								</center>
							</div>
						</div>
						<br />
						<br />
						<div className="col-md-7 ">
							<div>
								<center>
									{" "}
									<img
										className="img-responsive"
										src="images/mobile-2.png"
										alt="Smartphone with example company rateings."
									/>
								</center>
							</div>
						</div>
						<div className="clearfix" />
					</div>
				</div>

				{/* 2 cards section */}
				<div className="welcome  welpad  back-hm-community">
					<div className="container">
						<div className="col-md-12 ">
							<center>
								<div className="hover panel-hm">
									<div className="front">
										<div className="frontTitle">
											<T>hear</T>
											<br />
											<T>community</T>
										</div>
										<div className="frontLogo isas" />
										<div className="frontLocation">
											<T>hear_text</T>
										</div>
										<br />
										<div className="fl-ri-re">
											<a
												href={Meteor.absoluteUrl(
													"write-review/",
													{ secure: true }
												)}
												className="btn btn-primary"
											>
												<FontAwesomeIcon icon="plus" />
												&nbsp;{t("add_review_button")}
											</a>
										</div>
										<br />
									</div>
								</div>

								<div className="hover panel-hm">
									<div className="front">
										<div className="frontTitle">
											<T>get_fair_salary</T> <br />
											<T>your_work</T>
										</div>
										<div className="frontLogo boisedigital" />
										<div className="frontLocation">
											<T>fairsalary_text</T>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										</div>
										<br />
										<div className="fl-ri-re">
											<a
												href={Meteor.absoluteUrl(
													"submit-salary-data/",
													{ secure: true }
												)}
												className="btn btn-primary"
											>
												<FontAwesomeIcon icon="plus" />
												&nbsp;{t("salary_button")}
											</a>
										</div>
										<br />
									</div>
								</div>
							</center>
						</div>

						<div className="clearfix" />
					</div>
				</div>

				{/* services */}
				<div className="star" id="services">
					<div className="container">
						<div className="row">
							<div className="col-md-1" />
							<div className="col-md-8">
								<center>
									{" "}
									<h1 className="titlestar">
										<T>discover_employers</T>{" "}
									</h1>
								</center>
							</div>
							<div className="col-md-2">
								<div className="titlestar">
									<center>
										{" "}
										<a
											href="/register"
											className="button out-butt-dark"
										>
											<T>signup_button</T>
										</a>
									</center>
								</div>
							</div>
							<div className="col-md-1" />
						</div>
						<div className="clearfix" />
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}
