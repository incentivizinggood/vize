import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { urlGenerators } from "src/pages/url-generators";

import PageWrapper from "src/components/page-wrapper";
import { WriteReviewButton } from "src/components/button";
import {
	LinkButton,
	WhiteButton,
	BlackBorderButton,
} from "src/components/button";
import CompaniesSearchBar from "src/components/companies-search-bar";
import { useTranslations } from "src/translations";
import ReactGA from "react-ga";

import homeImg1 from "src/images/home-img-1.png";
import homeImg2 from "src/images/home-img-2.png";
import swapIcon from "src/images/swap-icon.png";
import mobile1 from "src/images/mobile-1.png";
import mobile2 from "src/images/mobile-2.png";
import communityIcon from "src/images/community-icon.png";
import salaryIcon from "src/images/salary-icon.png";

function addReviewHomeTop() {
	ReactGA.event({
		category: "Button",
		action: "Add Review Pressed",
		label: "Home | Top",
	});
}
function addSalaryHomeBottom() {
	ReactGA.event({
		category: "Button",
		action: "Add Salary Pressed",
		label: "Home | Bottom",
	});
}

// no longer using the reward component but keeping it in case we use it in the future again
function RewardComponent() {
	const t = useTranslations().homePage;

	return (
		<div
			className="full-width-container background-primary"
			style={{ paddingBottom: "4em" }}
		>
			<div className="container">
				<div className="row add-flex-row">
					<div className="col-md-2 add-flex-col center-element">
						<img
							className="img-responsive vertical-center"
							src={swapIcon}
							alt="Reward"
						/>
						<br />
					</div>
					<div className="col-md-8">
						<div>
							<div>
								<p
									className="white-text-center"
									style={{ fontSize: 23 }}
								>
									{t.rewardText}
								</p>
								<p
									className="white-text-center"
									style={{ fontSize: 23 }}
								>
									{t.rewardText2}
								</p>
							</div>
							<div>
								<center>
									<WhiteButton
										to="/write-review"
										style={{ fontSize: 18 }}
										onClick={addReviewHomeTop}
									>
										<FontAwesomeIcon icon={faPlus} />
										&nbsp;
										{t.add_review_button}
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
	);
}

function HomePage() {
	const t = useTranslations().homePage;

	return (
		<PageWrapper>
			<div className="banner">
				<div className="banner-info">
					<div className="banner-text">
						<div id="top" className="callbacks_container">
							<div className="banner-text-info">
								<h1>{t.mainBanner}</h1>
							</div>
							<CompaniesSearchBar />
						</div>
					</div>
				</div>
			</div>

			<div className="full-width-container background-white">
				<div className="container desktop-view">
					<div className="col-md-8">
						<div>
							<img
								className="img-responsive"
								src={homeImg2}
								alt="Computer screen with example job ad."
							/>
						</div>
					</div>
					<div className="col-md-4">
						<div className="great-job-hm">
							<h1>{t.findjob_title}</h1>
						</div>
						<div className="great-comp-hm">
							<h4>{t.findjob_text}</h4>
						</div>
						<div>
							<center>
								<BlackBorderButton to="/jobs">
									{t.jobsButton}
								</BlackBorderButton>
							</center>
						</div>
					</div>

					<div className="clearfix" />
				</div>

				{/* =====mobile view show====  */}

				<div className="container mobile-view background-white">
					<div className="col-md-4">
						<div className="great-job-hm">
							<h1>{t.findjob_title}</h1>
						</div>
						<div className="great-comp-hm">
							<h4>{t.findjob_text}</h4>
						</div>
						<div>
							<center>
								<BlackBorderButton to="/jobs">
									{t.jobsButton}
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
									src={mobile1}
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
								{t.findemp_title}
							</h1>
						</div>
						<div>
							<h4 className="white-text-center">
								{t.findemp_text}
							</h4>
						</div>
						<div>
							<center>
								<WhiteButton to="/companies">
									{t.companiesButton}
								</WhiteButton>
							</center>
						</div>
					</div>
					<div className="col-md-7">
						<div>
							<img
								className="img-responsive"
								src={homeImg1}
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
								{t.findemp_title}
							</h1>
						</div>
						<div>
							<h4 className="white-text-center">
								{t.findemp_text}
							</h4>
						</div>
						<div>
							<center>
								<WhiteButton to="/companies">
									{t.companiesButton}
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
									src={mobile2}
									alt="Company ratings"
								/>
							</center>
						</div>
					</div>
					<div className="clearfix" />
				</div>
			</div>

			<div className="full-width-container">
				<div className="row">
					<div className="col-md-12">
						<center>
							<div className="panel-card">
								<div className="front">
									<div className="frontTitle">
										{t.hear}
										<br />
										{t.community}
									</div>
									<div className="frontLogo">
										<img
											className="img-responsive vertical-center"
											src={communityIcon}
										/>
									</div>
									<div className="frontLocation">
										{t.hear_text}
									</div>
									<br />
									<div>
										<WriteReviewButton buttonLocation="Home | Bottom" />
									</div>
									<br />
								</div>
							</div>

							<div className="panel-card">
								<div className="front">
									<div className="frontTitle">
										{t.get_fair_salary} <br />
										{t.your_work}
									</div>
									<div className="frontLogo">
										<img
											className="img-responsive vertical-center"
											src={salaryIcon}
										/>
									</div>
									<div className="frontLocation">
										{t.fairsalary_text}
										&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
									</div>
									<br />
									<div>
										<LinkButton
											primary
											to="/submit-salary-data"
											onClick={addSalaryHomeBottom}
										>
											<FontAwesomeIcon icon={faPlus} />
											&nbsp;
											{t.salary_button}
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
								<h1>{t.discover_employers} </h1>
								<br />
							</center>
						</div>
						<div className="col-md-2">
							<div>
								<center>
									{" "}
									<BlackBorderButton
										to={urlGenerators.vizeRegister(
											"worker"
										)}
									>
										{t.signup_button}
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
