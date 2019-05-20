import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import PageWrapper from "/imports/ui/components/page-wrapper";
import CompaniesSearchBar from "../components/companies-search-bar.jsx";

const t = i18n.createTranslator("common.homePage");
const T = i18n.createComponent(t);

function HomePage() {
	return (
		<PageWrapper>
			<div
				className="full-width-container background-primary"
				style={{ paddingBottom: "4em" }}
			>
				<div className="container">
					<div className="row add-flex-row">
						<div className="col-md-2 add-flex-col center-element">
							<img
								className="img-responsive vertical-center"
								src="images/moneyIcon.png"
								alt="Reward"
							/>
							<br />
						</div>
						<div className="col-md-6">
							<div>
								<div>
									<p
										className="white-text-center"
										style={{ fontSize: 32 }}
									>
										<T>rewardText</T>
									</p>
								</div>
								<div>
									<center>
										<Link
											to="/write-review"
											className="button white-button"
											style={{ fontSize: 18 }}
										>
											<FontAwesomeIcon icon="plus" />
											&nbsp;
											{t("add_review_button")}
										</Link>
									</center>
								</div>
							</div>
						</div>
						<div className="col-md-2" />
					</div>
					<div className="clearfix" />
				</div>
			</div>
			<div className="banner">
				<div className="banner-info">
					<div className="banner-text">
						<div id="top" className="callbacks_container">
							<ul id="slider3">
								<li>
									<div className="banner-text-info">
										<h1>
											<T>mainBanner</T>
										</h1>
									</div>
									<CompaniesSearchBar />
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className="full-width-container">
				<div className="container desktop-view">
					<div className="col-md-8">
						<div>
							<img
								className="img-responsive"
								src="images/home-img-2.png"
								alt="Computer screen with example job ad."
							/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="great-job-hm">
							<h1>
								<T>findjob_part1</T> <br /> <T>commonLine</T>{" "}
							</h1>
						</div>
						<div className="great-comp-hm">
							<h4>
								<T>findjob_text</T>
							</h4>
						</div>
						<div>
							<center>
								<Link
									to="/jobs"
									className="button black-border-button"
								>
									<T>jobsButton</T>
								</Link>
							</center>
						</div>
					</div>

					<div className="clearfix" />
				</div>

				{/* =====mobile view show====  */}

				<div className="container mobile-view">
					<div className="col-md-4">
						<div className="great-job-hm">
							<h1>
								<T>findjob_part1</T> <br /> <T>commonLine</T>{" "}
							</h1>
						</div>
						<div className="great-comp-hm">
							<h4>
								<T>findjob_text</T>
							</h4>
						</div>
						<div>
							<center>
								<Link
									to="/jobs"
									className="button black-border-button"
								>
									<T>jobsButton</T>
								</Link>
							</center>
						</div>
					</div>
					<br />
					<br />
					<div className="col-md-8">
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

			<div className="full-width-container background-primary">
				<div className="container desktop-view">
					<div className="col-md-5">
						<div>
							<h1 className="white-text-center">
								<T>findemp_part1</T> <br />
								<T>findemp_part2</T>{" "}
							</h1>
						</div>
						<div>
							<h4 className="white-text-center">
								<T>findemp_text</T>
							</h4>
						</div>
						<div>
							<center>
								<Link
									to="/companies"
									className="button white-button"
								>
									<T>companiesButton</T>
								</Link>
							</center>
						</div>
					</div>
					<div className="col-md-7">
						<div>
							<img
								className="img-responsive"
								src="images/home-img-1.png"
								alt="Company Ratings"
							/>
						</div>
					</div>
					<div className="clearfix" />
				</div>

				{/* ===mobile view blue section==== */}

				<div className="container mobile-view">
					<div className="col-md-5">
						<div>
							<h1 className="white-text-center">
								<T>findemp_part1</T> <br />
								<T>findemp_part2</T>{" "}
							</h1>
						</div>
						<div>
							<h4 className="white-text-center">
								<T>findemp_text</T>
							</h4>
						</div>
						<div>
							<center>
								<Link
									to="/companies"
									className="button white-button"
								>
									<T>companiesButton</T>
								</Link>
							</center>
						</div>
					</div>
					<br />
					<br />
					<div className="col-md-7">
						<div>
							<center>
								{" "}
								<img
									className="img-responsive"
									src="images/mobile-2.png"
									alt="Company ratings"
								/>
							</center>
						</div>
					</div>
					<div className="clearfix" />
				</div>
			</div>

			<div className="full-width-container background-offwhite">
				<div className="row">
					<div className="col-md-12">
						<center>
							<div className="panel-card">
								<div className="front">
									<div className="frontTitle">
										<T>hear</T>
										<br />
										<T>community</T>
									</div>
									<div className="frontLogo">
										<img
											className="img-responsive vertical-center"
											src="images/community-icon.png"
										/>
									</div>
									<div className="frontLocation">
										<T>hear_text</T>
									</div>
									<br />
									<div>
										<Link
											to="/write-review"
											className="button vize-blue-button"
											style={{ fontSize: 16.5 }}
										>
											<FontAwesomeIcon icon="plus" />
											&nbsp;
											{t("add_review_button")}
										</Link>
									</div>
									<br />
								</div>
							</div>

							<div className="panel-card">
								<div className="front">
									<div className="frontTitle">
										<T>get_fair_salary</T> <br />
										<T>your_work</T>
									</div>
									<div className="frontLogo">
										<img
											className="img-responsive vertical-center"
											src="images/salary-icon.png"
										/>
									</div>
									<div className="frontLocation">
										<T>fairsalary_text</T>
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</div>
									<br />
									<div>
										<Link
											to="/submit-salary-data"
											className="button vize-blue-button"
											style={{ fontSize: 16.5 }}
										>
											<FontAwesomeIcon icon="plus" />
											&nbsp;
											{t("salary_button")}
										</Link>
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
								<h1>
									<T>discover_employers</T>{" "}
								</h1>
								<br />
							</center>
						</div>
						<div className="col-md-2">
							<div>
								<center>
									{" "}
									<Link
										to="/register"
										className="button black-border-button"
									>
										<T>signup_button</T>
									</Link>
								</center>
							</div>
						</div>
						<div className="col-md-1" />
					</div>
					<div className="clearfix" />
				</div>
			</div>
		</PageWrapper>
	);
}

export default withUpdateOnChangeLocale(HomePage);
