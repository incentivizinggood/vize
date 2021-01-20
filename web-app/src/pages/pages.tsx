import React from "react";
import {
	Switch,
	Route,
	useLocation,
	RouteComponentProps,
} from "react-router-dom";

import * as analytics from "src/startup/analytics";
import * as urlGenerators from "src/pages/url-generators";

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
import JobApplicationSubmitted from "./job-application-submitted";
import { PrivacyPolicy } from "./privacy-policy";

import { queryRoutes } from "./url-generators";
import { JobAdPage } from "./job-ad";
import { UserProfilePage } from "./user-profile";

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
			<Route path={`/user-profile`} component={UserProfilePage} />
			<Route
				path={`/${urlGenerators.queryRoutes.about}`}
				component={AboutPage}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.privacyPolicy}`}
				component={PrivacyPolicy}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.changePassword}`}
				component={PasswordChanger}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.createCompanyProfile}`}
				component={CreateCompany}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.contactUs}`}
				component={ContactUsPage}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.reviewSubmitted}`}
				component={ReviewSubmitted}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.forEmployers}`}
				component={ForEmployers}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.help}`}
				component={HelpPage}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.jobs}`}
				component={ShowJobs}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.login}`}
				component={LoginPage}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.register}`}
				component={RegisterPage}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.myAccount}`}
				component={MyAccountPage}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.postJob}`}
				component={CreateJobAd}
			/>

			<Route
				path={`/${urlGenerators.queryRoutes.resources}/recurso/:slug`}
				component={() => <ResourcePage />}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.resources}/temas/:topicName`}
				component={() => <ResourcesByTopicPage />}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.resources}/`}
				component={() => <ResourcesIndex />}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.companies}`}
				component={() => (
					<CompanySearchTrial
						searchText={fixNullParams(params.get("q"))}
					/>
				)}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.companyProfile}/:id`}
				component={({ match }: RouteComponentProps<{ id: string }>) => (
					<CompanyProfile companyId={match.params.id} />
				)}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.job}/:id`}
				component={({ match }: RouteComponentProps<{ id: string }>) => (
					<JobAdPage jobAdId={match.params.id} />
				)}
			/>
			<Route
				path={`/${urlGenerators.queryRoutes.jobApplicationSubmitted}`}
				component={() => (
					<JobApplicationSubmitted
						companyId={fixNullParams(params.get("id"))}
					/>
				)}
			/>
			<Route
				path={`/${queryRoutes.writeReview}`}
				component={() => (
					<CreateReview
						companyName={fixNullParams(
							params.get(
								urlGenerators.queryParameters.companyName
							)
						)}
						referredBy={fixNullParams(params.get("ref"))}
					/>
				)}
			/>
			<Route
				path={`/${queryRoutes.submitSalaryData}`}
				component={() => (
					<CreateSalary
						companyName={fixNullParams(
							params.get(
								urlGenerators.queryParameters.companyName
							)
						)}
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
