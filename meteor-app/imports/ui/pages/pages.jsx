import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";

import AboutPage from "./about.jsx";
import ApplyForJobForm from "./apply-for-job";
import CompanyCreateProfileForm from "./create-company-profile";
import CompanyProfile from "./company-profile";
import CompanySearchTrial from "./company-search-trial.jsx";
import ContactUsPage from "./contact-us.jsx";
import ForEmployers from "./foremployers.jsx";
import HelpPage from "./help.jsx";
import HomePage from "./home.jsx";
import LoginPage from "./login.jsx";
import MyAccountPage from "./my-account.jsx";
import NotFoundPage from "./not-found.jsx";
import PasswordChanger from "./password-changer.jsx";
import PostAJobForm from "./post-a-job";
import RegisterPage from "./register.jsx";
import ResourcesEmployers from "./resources-employers.jsx";
import ResourcesWorkers from "./resources-workers.jsx";
import ShowJobs from "./showjobs.jsx";
import SubmitSalaryDataForm from "./submit-salary-data";
import UserPage from "./user.jsx";
import WriteReviewForm from "./write-review";

import { queryRoutes } from "./url-generators.js";

// Replace null with undefined.
// TODO: Make pages handel nulls properly on their own.
function fixNullParams(param) {
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
			<Route
				path="/create-company-profile"
				component={CompanyCreateProfileForm}
			/>
			<Route path="/contact-us" component={ContactUsPage} />
			<Route path="/employer-resources" component={ResourcesEmployers} />
			<Route path="/foremployers" component={ForEmployers} />
			<Route path="/help" component={HelpPage} />
			<Route path="/jobs" component={ShowJobs} />
			<Route path="/login" component={LoginPage} />
			<Route path="/my-account" component={MyAccountPage} />
			<Route path="/post-a-job" component={PostAJobForm} />
			<Route path="/register" component={RegisterPage} />
			<Route path="/worker-resources" component={ResourcesWorkers} />

			<Route
				path={`/${queryRoutes.companies}`}
				component={() => (
					<CompanySearchTrial
						searchText={fixNullParams(params.get("search"))}
					/>
				)}
			/>
			<Route
				path={`/${queryRoutes.companyProfile}`}
				component={() => (
					<CompanyProfile
						companyId={fixNullParams(params.get("id"))}
					/>
				)}
			/>
			<Route
				path={`/${queryRoutes.writeReview}`}
				component={() => (
					<WriteReviewForm
						companyId={fixNullParams(params.get("id"))}
					/>
				)}
			/>
			<Route
				path={`/${queryRoutes.submitSalaryData}`}
				component={() => (
					<SubmitSalaryDataForm
						companyId={fixNullParams(params.get("id"))}
					/>
				)}
			/>
			<Route
				path={`/${queryRoutes.applyForJob}`}
				component={() => (
					<ApplyForJobForm jobId={fixNullParams(params.get("id"))} />
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
