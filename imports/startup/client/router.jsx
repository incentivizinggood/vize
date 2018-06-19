/* This file defines how URL's are handled
 * and the permalink structure of the app.
 *
 * All pages are rendered into the view-render div.
 * See client/main.html
 */
import React from "react";
import { Meteor } from "meteor/meteor";
import { FlowRouter } from "meteor/kadira:flow-router";
import { ReactiveVar } from "meteor/reactive-var";

import ShowJobs from "/imports/ui/pages/showjobs.jsx";

import HomePage from "/imports/ui/pages/home.jsx";
import AboutPage from "/imports/ui/pages/about.jsx";
import CompanySearchTrial from "/imports/ui/pages/company-search-trial.jsx";

import ForEmployers from "/imports/ui/pages/foremployers.jsx";
import CompanyProfile from "/imports/ui/pages/companyprofile.jsx";
import ContactUsPage from "/imports/ui/pages/contact-us.jsx";
import HelpPage from "/imports/ui/pages/help.jsx";
import LoginPage from "/imports/ui/pages/login.jsx";
import MyAccountPage from "/imports/ui/pages/my-account.jsx";
import NotFoundPage from "/imports/ui/pages/not-found.jsx";
import RegisterPage from "/imports/ui/pages/register.jsx";
import UserPage from "/imports/ui/pages/user.jsx";

import CompanyCreateProfileForm from "/imports/ui/pages/create-company-profile.jsx";
import WriteReviewForm from "/imports/ui/pages/write-review.jsx";
import SubmitSalaryDataForm from "/imports/ui/pages/submit-salary-data.jsx";
import PostAJobForm from "/imports/ui/pages/post-a-job.jsx";
import ApplyForJobForm from "/imports/ui/pages/apply-for-job.jsx";
import ResourcesWorkers from "/imports/ui/pages/resources-workers.jsx";

if (Meteor.isDevelopment && Meteor.isClient) {
	import SimpleSchema from "simpl-schema";
	import { AutoForm } from "meteor/aldeed:autoform";

	SimpleSchema.debug = true;
	AutoForm.debug();
}

const currentPage = new ReactiveVar(null);

/**
 * Reduces boiler plate for simple pages.
 * Use this for all pages that use static non-paramerized URL's.
 *
 * @param  {String}       path    The path that the page is located at.
 * @param  {ReactElement} element The page. Note: this expects a jsx
 *                                expression, not the class name.
 */
function routeSimplePage(path, element) {
	FlowRouter.route(path, {
		action() {
			currentPage.set(element);
		},
	});
}

// ----- Define all of the simple routes. -----//

routeSimplePage("/", <HomePage />);
routeSimplePage("/about", <AboutPage />);
routeSimplePage("/foremployers", <ForEmployers />);
routeSimplePage("/contact-us", <ContactUsPage />);
routeSimplePage("/help", <HelpPage />);
routeSimplePage("/login", <LoginPage />);
routeSimplePage("/my-account", <MyAccountPage />);
routeSimplePage("/register", <RegisterPage />);
routeSimplePage("/create-company-profile", <CompanyCreateProfileForm />);
routeSimplePage("/jobs", <ShowJobs />);
routeSimplePage("/post-a-job", <PostAJobForm />);
routeSimplePage("/worker-resources", <ResourcesWorkers />);

// ----- Define the more complex routes. -----//

FlowRouter.route("/companies", {
	action(params, queryParams) {
		currentPage.set(
			// changing the route for now, because the search code is on CompanySearchTrial now.
			// ORIGINAL CODE -- <CompanySearchPage queryParams={queryParams} />,
			<CompanySearchTrial searchText={queryParams.search} />
		);
	},
});

FlowRouter.route("/companyprofile", {
	action(params, queryParams) {
		currentPage.set(<CompanyProfile companyId={queryParams.id} />);
	},
});

FlowRouter.route("/write-review", {
	action(params, queryParams) {
		currentPage.set(<WriteReviewForm companyId={queryParams.id} />);
	},
});

FlowRouter.route("/submit-salary-data", {
	action(params, queryParams) {
		currentPage.set(<SubmitSalaryDataForm companyId={queryParams.id} />);
	},
});

FlowRouter.route("/apply-for-job", {
	action(params, queryParams) {
		currentPage.set(<ApplyForJobForm jobId={queryParams.id} />);
	},
});

FlowRouter.route("/user", {
	action(params, queryParams) {
		currentPage.set(<UserPage user_id={queryParams.id} />);
	},
});

// Add a 404 page to handle unknown paths.
FlowRouter.notFound = {
	action() {
		currentPage.set(<NotFoundPage />);
	},
};

export { currentPage };
