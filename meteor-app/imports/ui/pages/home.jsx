import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import withUpdateOnChangeLocale from "/imports/ui/hoc/update-on-change-locale.jsx";
import PageWrapper from "/imports/ui/components/page-wrapper";
import WriteReviewButton from "/imports/ui/components/write-review-button.jsx";
import {
	LinkButton,
	WhiteButton,
	BlackBorderButton,
} from "/imports/ui/components/button";
import makeTranslaties from "/imports/ui/components/i18n-switch.jsx";

import CompaniesSearchBar from "../components/companies-search-bar.jsx";

const T = makeTranslaties({
	en: {
		mainBanner: "Find a Great Job Near You",
		searchButton: "SEARCH",
		placeholder: "Search for a Company...",
		findjob_part1: "Know The Job Before You Get It",
		commonLine: "",
		rewardText: "Earn $100 pesos by sharing your work experience",
		findjob_text:
			"Don't waste your time going from factory to factory, search job posts and read reviews from other employees to find the best job for you",
		jobsButton: "Jobs",
		findemp_part1: "Find an Employer",
		findemp_part2: "That Treats You Right",
		findemp_text:
			"Vize helps you discover employers based on different industries, job types, and company sizes. The feedback and rating system holds companies accountable for creating rich work environments and safe working conditions",
		companiesButton: "Companies",
		hear: "Hear From Your",
		community: "Community",
		hear_text:
			"See anonymous reviews and ratings of companies from people in your Community. Add value to the community by sharing your work experience.",
		add_review_button: "Add a Review",
		get_fair_salary: "Get a Fair Salary For",
		your_work: "Your Work",
		fairsalary_text:
			"Find hundreds of salaries for different job positions by gender. Share your salary anonymously to make sure others are getting fairly compensated.",
		salary_button: "Add a Salary",
		discover_employers: "Start discovering new employers now",
		signup_button: "SIGN UP",
	},
	es: {
		mainBanner: "Encuentre un Buen Trabajo Cerca de Usted",
		searchButton: "Buscar",
		placeholder: "Buscar una empresa...",
		findjob_part1: "Conoce El Trabajo Antes De Que Lo Consigas",
		rewardText: "Gana $100 pesos por compartir tu experiencia laboral",
		findjob_text:
			"No pierda el tiempo yendo de fábrica a fábrica, busque puestos de trabajo y lea opiniones de otros empleados para encontrar el mejor trabajo para usted",
		jobsButton: "Trabajos",
		findemp_part1: "Encuentre un empleador",
		findemp_part2: "que lo trate bien",
		findemp_text:
			"Vize te ayuda a identificar empleadores basados en diferentes industrias, tipos de trabajo y tamaños de empresas. Las opiniones y calificaciones incentivan a las empresas a crear ambientes de trabajo enriquecedores y condiciones de trabajo seguras.",
		companiesButton: "Empresas",
		hear: "Escuche de su ",
		community: "comunidad",
		hear_text:
			"Consulte opiniones y valoraciones anónimas de compañías expedidas por personas en su Comunidad. Agregue valor a la comunidad al compartir su experiencia laboral.",
		add_review_button: "Agregar una Opinión",
		get_fair_salary: "Obtenga un salario",
		your_work: "justo por su trabajo",
		fairsalary_text:
			"Encuentre cientos de salarios para diferentes puestos de trabajo y géneros. Comparta su salario de forma anónima para asegurarse de que otros reciban una compensación justa.",
		salary_button: "Agregar un Salario",
		discover_employers: "Comience a descubrir nuevos empleadores ahora",
		signup_button: "Registrar",
	},
});

function HomePage() {
	console.log(T);
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
								<T.findjob_part1 /> <br />{" "}
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
								<T.findjob_part1 /> <br />{" "}
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
								<T.findemp_part1 /> <br />
								<T.findemp_part2 />{" "}
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
								<T.findemp_part1 /> <br />
								<T.findemp_part2 />{" "}
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

export default withUpdateOnChangeLocale(HomePage);
