import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import i18n from "meteor/universe:i18n";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import PageWrapper from "/imports/ui/components/page-wrapper";
import HoverPanel from "/imports/ui/components/hover-panel";
import CompaniesSearchBar from "../components/companies-search-bar.jsx";

const t = i18n.createTranslator("common.homePage");
const T = i18n.createComponent(t);

const FindJob = () => (
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
		<div className="titlestar">
			<center>
				<Link to="/jobs" className="button out-butt-dark">
					<T>jobsButton</T>
				</Link>
			</center>
		</div>
	</div>
);

const FindEmployer = () => (
	<div className="col-md-5">
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
		<div className="companies-btn">
			<center>
				<Link to="/companies" className="button out-bodr">
					<T>companiesButton</T>
				</Link>
			</center>
		</div>
	</div>
);

function HomePage() {
	return (
		<PageWrapper navIsAnimated>
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
					<FindJob />

					<div className="clearfix" />
				</div>

				{/* =====mobile view show====  */}

				<div className="container  mobile-view-box">
					<FindJob />
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
				<div className="container blu-section-desc">
					<FindEmployer />
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

				<div className="container blu-mobile-sect">
					<FindEmployer />
					<br />
					<br />
					<div className="col-md-7 ">
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
				<div className="container">
					<div className="col-md-12">
						<center>
							<HoverPanel
								header={
									<>
										<T>hear</T>
										&nbsp;
										<T>community</T>
									</>
								}
								logo="/images/home-img-3.png"
								text={<T>hear_text</T>}
								link={{
									to: "/write-review",
									content: (
										<>
											<FontAwesomeIcon icon="plus" />
											&nbsp;
											{t("add_review_button")}
										</>
									),
								}}
							/>

							<HoverPanel
								header={
									<>
										<T>get_fair_salary</T>
										&nbsp;
										<T>your_work</T>
									</>
								}
								logo="/images/home-img-4.png"
								text={<T>fairsalary_text</T>}
								link={{
									to: "/submit-salary-data",
									content: (
										<>
											<FontAwesomeIcon icon="plus" />
											&nbsp;
											{t("salary_button")}
										</>
									),
								}}
							/>
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
									<Link
										to="/register"
										className="button out-butt-dark"
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
