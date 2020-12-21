import React from "react";
import {
	Switch,
	Route,
	useLocation,
	RouteComponentProps,
} from "react-router-dom";

import * as analytics from "src/startup/analytics";

import AboutPage from "./about";
import ResourcePage from "src/pages/resources-index/resource";
import ResourcesByTopicPage from "src/pages/resources-index/resources-by-topic";
import ResourcesIndex from "./resources-index";
import ApplyToJobAd from "./apply-to-job-ad";
import CreateCompany from "./create-company";
import CreateSalary from "./create-salary";
import CompanyProfile from "./company-profile";
import CompanySearchTrial from "./company-search";
import ContactUsPage from "./contact-us";
import ForEmployers from "./for-employers";
import HelpPage from "./help";
import HomePage from "./home";
import LoginPage from "./login";
import MyAccountPage from "./my-account";
import NotFoundPage from "./not-found";
import PasswordChanger from "./password-changer";
import CreateJobAd from "./create-job-ad";
import RegisterPage from "./register";
import ShowJobs from "./show-jobs";
import UserPage from "./user";
import CreateReview from "./create-review";
import ReviewSubmitted from "./review-submitted";
import { PrivacyPolicy } from "./privacy-policy";

import { queryRoutes } from "./url-generators";
import { JobAdPage } from "./job-ad";

/** Replace null with undefined. */
function fixNullParams<T>(param?: T | null): T | undefined {
	if (param === null) return undefined;
	return param;
}

export default function Pages(): JSX.Element {
	analytics.usePageView();

	const location = useLocation();
	const params = new URLSearchParams(location.search);

	return (
		<Switch>
			<Route path="/" exact component={HomePage} />
			<Route path="/acerca-de-nosotros" component={AboutPage} />
			<Route path="/poliza-de-privacidad" component={PrivacyPolicy} />
			<Route path="/cambiar-contraseña" component={PasswordChanger} />
			<Route path="/empresa/crear" component={CreateCompany} />
			<Route path="/contactenos" component={ContactUsPage} />
			<Route path="/evaluacion-enviada" component={ReviewSubmitted} />
			<Route path="/empleadores" component={ForEmployers} />
			<Route path="/ayuda" component={HelpPage} />
			<Route path="/trabajos" component={ShowJobs} />
			<Route path="/iniciar-sesion" component={LoginPage} />
			<Route path="/mi-cuenta" component={MyAccountPage} />
			<Route path="/publicar-una-oferta" component={CreateJobAd} />
			<Route path="/crear-cuenta" component={RegisterPage} />
			{/* recursos = resources */}
			<Route
				path={`/recursos/recurso/:slug`}
				component={() => <ResourcePage />}
			/>
			<Route
				path={`/recursos/temas/:topicName`}
				component={() => <ResourcesByTopicPage />}
			/>
			<Route path={`/recursos/`} component={() => <ResourcesIndex />} />
			{/* empresas = companies */}
			<Route
				path={`/empresas`}
				component={() => (
					<CompanySearchTrial
						searchText={fixNullParams(params.get("q"))}
					/>
				)}
			/>
			<Route
				path={`/${queryRoutes.companyProfile}/:id`}
				component={({ match }: RouteComponentProps<{ id: string }>) => (
					<CompanyProfile companyId={match.params.id} />
				)}
			/>
			{/* Trabajo = Job */}
			<Route
				path={`/trabajo/:id`}
				component={({ match }: RouteComponentProps<{ id: string }>) => (
					<JobAdPage jobAdId={match.params.id} />
				)}
			/>
			<Route
				path={`/${queryRoutes.writeReview}`}
				component={() => (
					<CreateReview
						companyName={fixNullParams(params.get("companyname"))}
						referredBy={fixNullParams(params.get("ref"))}
					/>
				)}
			/>
			<Route
				path={`/${queryRoutes.submitSalaryData}`}
				component={() => (
					<CreateSalary
						companyName={fixNullParams(params.get("companyname"))}
					/>
				)}
			/>
			<Route
				path={`/${queryRoutes.applyForJob}`}
				component={() => (
					<ApplyToJobAd jobAdId={fixNullParams(params.get("id"))} />
				)}
			/>
			<Route
				path={`/${queryRoutes.user}`}
				component={() => (
					<UserPage user_id={fixNullParams(params.get("id"))} />
				)}
			/>
			<Route component={NotFoundPage} />
		</Switch>
	);
}
