import React from "react";
import {
	Switch,
	Route,
	withRouter,
	RouteComponentProps,
} from "react-router-dom";

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

import { queryRoutes } from "./url-generators";

/** Replace null with undefined. */
function fixNullParams<T>(param?: T | null): T | undefined {
	if (param === null) return undefined;
	return param;
}

function Pages(props) {
	const params = new URLSearchParams(props.location.search);

	return (
		<Switch>
			<Route path="/" exact component={HomePage} />
			<Route path="/about" component={AboutPage} />
			<Route path="/change-password" component={PasswordChanger} />
			<Route path="/company/create" component={CreateCompany} />
			<Route path="/contact-us" component={ContactUsPage} />
			<Route path="/review-submitted" component={ReviewSubmitted} />
			<Route path="/for-employers" component={ForEmployers} />
			<Route path="/help" component={HelpPage} />
			<Route path="/jobs" component={ShowJobs} />
			<Route path="/login" component={LoginPage} />
			<Route path="/my-account" component={MyAccountPage} />
			<Route path="/post-a-job" component={CreateJobAd} />
			<Route path="/register" component={RegisterPage} />
			// recursos = resources
			<Route
				path={`/recursos/recurso/:slug`}
				component={() => <ResourcePage />}
			/>
			<Route
				path={`/recursos/temas/:topicName`}
				component={() => <ResourcesByTopicPage />}
			/>
			<Route path={`/recursos/`} component={() => <ResourcesIndex />} />
			<Route
				path={`/companies`}
				component={() => (
					<CompanySearchTrial
						searchText={fixNullParams(params.get("q"))}
					/>
				)}
			/>
			<Route
				path={`/${queryRoutes.companyProfile}/:id`}
				component={({
					match,
				}: RouteComponentProps<{ id?: string }>) => (
					<CompanyProfile
						companyId={fixNullParams(match.params.id)}
					/>
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

export default withRouter(Pages);
