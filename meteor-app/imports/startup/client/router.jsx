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
import { AutoForm } from "meteor/aldeed:autoform";

import ShowJobs from "/imports/ui/pages/showjobs.jsx";

import HomePage from "/imports/ui/pages/home.jsx";
import AboutPage from "/imports/ui/pages/about.jsx";
import CompanySearchTrial from "/imports/ui/pages/company-search-trial.jsx";

import ForEmployers from "/imports/ui/pages/foremployers.jsx";
import CompanyProfile from "/imports/ui/pages/company-profile";
import ContactUsPage from "/imports/ui/pages/contact-us.jsx";
import HelpPage from "/imports/ui/pages/help.jsx";
import LoginPage from "/imports/ui/pages/login.jsx";
import MyAccountPage from "/imports/ui/pages/my-account.jsx";
import NotFoundPage from "/imports/ui/pages/not-found.jsx";
import RegisterPage from "/imports/ui/pages/register.jsx";
import UserPage from "/imports/ui/pages/user.jsx";

import CompanyCreateProfileForm from "/imports/ui/pages/create-company-profile";
import WriteReviewForm from "/imports/ui/pages/write-review";
import SubmitSalaryDataForm from "/imports/ui/pages/submit-salary-data";
import PostAJobForm from "/imports/ui/pages/post-a-job";
import ApplyForJobForm from "/imports/ui/pages/apply-for-job";
import ResourcesWorkers from "/imports/ui/pages/resources-workers.jsx";
import ResourcesEmployers from "/imports/ui/pages/resources-employers.jsx";
import PasswordChanger from "/imports/ui/pages/password-changer.jsx";

if (Meteor.isDevelopment && Meteor.isClient) {
	/*
		This just provides additional debug information
		to developers via the browser console
	*/
	import SimpleSchema from "simpl-schema";

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
routeSimplePage("/jobs", <ShowJobs />);
routeSimplePage("/worker-resources", <ResourcesWorkers />);
routeSimplePage("/employer-resources", <ResourcesEmployers />);
routeSimplePage("/change-password", <PasswordChanger />);

/*
	These next two render AutoForms, and require
	special exit triggers to remove so-called
	"sticky validation errors", which could cause
	someone to, say, fail to submit a review for
	one company, go back to the search results page,
	go to the review form for a different company,
	and see the errors from their failed attempt
	to submit a review for the first company.
*/

FlowRouter.route(`/create-company-profile`, {
	action() {
		currentPage.set(<CompanyCreateProfileForm />);
	},
});

FlowRouter.route(`/post-a-job`, {
	action() {
		currentPage.set(<PostAJobForm />);
	},
});

// ----- Define the more complex routes. -----//

/*
	NOTE
	The site makes use of URL query arguments for navigation,
	often using these to indicate things like what company a
	page is supposed to be about so that it can load that company's
	information. The queryRoutes object, the subsequent FlowRouter
	invocations that use it, and the so-called "URL generator functions"
	that come a few lines further down, serve two purposes:
	1) They make the URL handling more robust, so that it requires
	fewer changes when we need to rename, reroute, or redesign something
	2) It allows us to determine what the URL is supposed to be at any
	time and at any place in the code, rather than storing that information
	in the backend, which was a disgusting temporary solution
*/

const queryRoutes = {
	companies: "companies",
	companyProfile: "companyprofile",
	writeReview: "write-review",
	submitSalaryData: "submit-salary-data",
	applyForJob: "apply-for-job",
	user: "user",
};

FlowRouter.route(`/${queryRoutes.companies}`, {
	action(params, queryParams) {
		currentPage.set(
			// changing the route for now, because the search code is on CompanySearchTrial now.
			// ORIGINAL CODE -- <CompanySearchPage queryParams={queryParams} />,
			<CompanySearchTrial searchText={queryParams.search} />
		);
	},
});

FlowRouter.route(`/${queryRoutes.companyProfile}`, {
	action(params, queryParams) {
		currentPage.set(<CompanyProfile companyId={queryParams.id} />);
	},
});

FlowRouter.route(`/${queryRoutes.writeReview}`, {
	action(params, queryParams) {
		currentPage.set(<WriteReviewForm companyId={queryParams.id} />);
	},
});

FlowRouter.route(`/${queryRoutes.submitSalaryData}`, {
	action(params, queryParams) {
		currentPage.set(<SubmitSalaryDataForm companyId={queryParams.id} />);
	},
});

FlowRouter.route(`/${queryRoutes.applyForJob}`, {
	action(params, queryParams) {
		currentPage.set(<ApplyForJobForm jobId={queryParams.id} />);
	},
});

FlowRouter.route(`/${queryRoutes.user}`, {
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

// exporting commonly-used URL generators
// in order to reduce the risk of typos
// and reduce the use of magic strings
const vizeProfileUrl = function(companyId) {
	return Meteor.absoluteUrl(
		`${queryRoutes.companyProfile}/?id=${companyId}`,
		{
			secure: true,
		}
	);
};
const vizeReviewUrl = function(companyId) {
	return Meteor.absoluteUrl(`${queryRoutes.writeReview}/?id=${companyId}`, {
		secure: true,
	});
};
const vizeSalaryUrl = function(companyId) {
	return Meteor.absoluteUrl(
		`${queryRoutes.submitSalaryData}/?id=${companyId}`,
		{
			secure: true,
		}
	);
};
const vizeApplyForJobUrl = function(jobId) {
	return Meteor.absoluteUrl(`${queryRoutes.applyForJob}/?id=${jobId}`, {
		secure: true,
	});
};

const urlGenerators = {
	vizeProfileUrl,
	vizeReviewUrl,
	vizeSalaryUrl,
	vizeApplyForJobUrl,
};

export { currentPage, urlGenerators };
