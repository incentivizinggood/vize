import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import withUpdateOnChangeLocale from "imports/ui/hoc/update-on-change-locale";
import PageWrapper from "imports/ui/components/page-wrapper";
import WriteReviewButton from "imports/ui/components/write-review-button";
import {
	LinkButton,
	WhiteButton,
	BlackBorderButton,
} from "imports/ui/components/button";
import CompaniesSearchBar from "imports/ui/components/companies-search-bar";
import { translations } from "imports/ui/translations";

const T = translations.homePage;

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
										<T.rewardText />
									</p>
								</div>
								<div>
									<center>
										<WhiteButton
											to="/write-review"
											style={{ fontSize: 18 }}
										>
											<FontAwesomeIcon icon={faPlus} />
											&nbsp;
											<T.add_review_button />
										</WhiteButton>
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
											<T.mainBanner />
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
								<T.findjob_title />
							</h1>
						</div>
						<div className="great-comp-hm">
							<h4>
								<T.findjob_text />
							</h4>
						</div>
						<div>
							<center>
								<BlackBorderButton to="/jobs">
									<T.jobsButton />
								</BlackBorderButton>
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
								<T.findjob_title />
							</h1>
						</div>
						<div className="great-comp-hm">
							<h4>
								<T.findjob_text />
							</h4>
						</div>
						<div>
							<center>
								<BlackBorderButton to="/jobs">
									<T.jobsButton />
								</BlackBorderButton>
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
								<T.findemp_title />
							</h1>
						</div>
						<div>
							<h4 className="white-text-center">
								<T.findemp_text />
							</h4>
						</div>
						<div>
							<center>
								<WhiteButton to="/companies">
									<T.companiesButton />
								</WhiteButton>
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
								<T.findemp_title />
							</h1>
						</div>
						<div>
							<h4 className="white-text-center">
								<T.findemp_text />
							</h4>
						</div>
						<div>
							<center>
								<WhiteButton to="/companies">
									<T.companiesButton />
								</WhiteButton>
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
										<T.hear />
										<br />
										<T.community />
									</div>
									<div className="frontLogo">
										<img
											className="img-responsive vertical-center"
											src="images/community-icon.png"
										/>
									</div>
									<div className="frontLocation">
										<T.hear_text />
									</div>
									<br />
									<div>
										<WriteReviewButton />
									</div>
									<br />
								</div>
							</div>

							<div className="panel-card">
								<div className="front">
									<div className="frontTitle">
										<T.get_fair_salary /> <br />
										<T.your_work />
									</div>
									<div className="frontLogo">
										<img
											className="img-responsive vertical-center"
											src="images/salary-icon.png"
										/>
									</div>
									<div className="frontLocation">
										<T.fairsalary_text />
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</div>
									<br />
									<div>
										<LinkButton
											primary
											to="/submit-salary-data"
										>
											<FontAwesomeIcon icon={faPlus} />
											&nbsp;
											<T.salary_button />
										</LinkButton>
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
									<T.discover_employers />{" "}
								</h1>
								<br />
							</center>
						</div>
						<div className="col-md-2">
							<div>
								<center>
									{" "}
									<BlackBorderButton to="/register">
										<T.signup_button />
									</BlackBorderButton>
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

export default HomePage;
