/* This file defines how URL's are handled
 * and the permalink structure of the app.
 *
 * All pages are rendered into the view-render div.
 * See client/main.html
 */
 if (Meteor.isDevelopment && Meteor.isClient) {
 	import SimpleSchema from "simpl-schema";
 	import { AutoForm } from "meteor/aldeed:autoform";
 	SimpleSchema.debug = true;
 	AutoForm.debug();
 }

import React from "react";
import ReactDOM from "react-dom";

import Header from "../../ui/pages/header.jsx";
import Footer from "../../ui/pages/footer.jsx";
import OverviewTab from "../../ui/components/overviewTabCP.jsx";
import ReviewComponent from "../../ui/components/companyReview.jsx";
import ReviewTab from "../../ui/components/reviewTabCP.jsx";
import JobTab from "../../ui/components/jobTabCP.jsx";
import JobPosting from "../../ui/components/jobPosting.jsx";
import SalaryTab from "../../ui/components/salaryTabCP.jsx";
import SalaryPosting from "../../ui/components/salaryPosting.jsx";
import CompanyComponent from "../../ui/components/companyComponent.jsx";
import CompanyRating from "../../ui/components/companyRatingsComponent.jsx";


import HomePage from "../../ui/pages/home.jsx";
import AboutPage from "../../ui/pages/about.jsx";
import CompanySearchTrial from "../../ui/company-search-trial.jsx"


import ForEmployers from "../../ui/pages/foremployers.jsx";
import CompanySearchPage from "../../ui/pages/company-search.jsx";
import CompanyPage from "../../ui/pages/company.jsx";
import CompanyProfile from "../../ui/pages/companyprofile.jsx";
import ContactUsPage from "../../ui/pages/contact-us.jsx";
import HelpPage from "../../ui/pages/help.jsx";
import LoginPage from "../../ui/pages/login.jsx";
import MyAccountPage from "../../ui/pages/my-account.jsx";
import NotFoundPage from "../../ui/pages/not-found.jsx";
import RegisterPage from "../../ui/pages/register.jsx";
import UserPage from "../../ui/pages/user.jsx";

//TESTING ONLY, but leaving in until the site's structure is better defined
import CompanyCreateProfileForm from "../../ui/pages/create-company-profile.jsx";
import WriteReviewForm from "../../ui/pages/write-review.jsx";
import SubmitSalaryDataForm from "../../ui/pages/submit-salary-data.jsx";
import PostAJobForm from "../../ui/pages/post-a-job.jsx";
import ApplyForJobForm from "../../ui/pages/apply-for-job.jsx";

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
		action(params, queryParams) {
			ReactDOM.render(element, document.getElementById("view-render"));
		}
	});
}

//----- Define all of the simple routes. -----//

routeSimplePage("/", <HomePage />);
routeSimplePage("/about", <AboutPage />);
routeSimplePage("/foremployers", <ForEmployers />);
routeSimplePage("/contact-us", <ContactUsPage />);
routeSimplePage("/help", <HelpPage />);
routeSimplePage("/login", <LoginPage />);
routeSimplePage("/my-account", <MyAccountPage />);
routeSimplePage("/register", <RegisterPage />);
routeSimplePage("/create-company-profile", <CompanyCreateProfileForm />);

//----- Define the more complex routes. -----//

FlowRouter.route("/companies", {
    action(params, queryParams) {
        ReactDOM.render(

					// changing the route for now, because the search code is on CompanySearchTrial now.
					// ORIGINAL CODE -- <CompanySearchPage queryParams={queryParams} />,
            <CompanySearchTrial queryParams={queryParams} />,
            document.getElementById("view-render")
        );
    }
});

FlowRouter.route("/companyprofile", {
    action(params, queryParams) {
        ReactDOM.render(
            <CompanyProfile companyId={queryParams.id} />,
            document.getElementById("view-render")
        );
    }
});

FlowRouter.route("/write-review", {
	action(params, queryParams) {
		ReactDOM.render(
			<WriteReviewForm companyId={queryParams.id} />,
			document.getElementById("view-render")
		);
	}
});

FlowRouter.route("/submit-salary-data", {
	action(params, queryParams) {
		ReactDOM.render(
			<SubmitSalaryDataForm companyId={queryParams.id} />,
			document.getElementById("view-render")
		);
	}
});

FlowRouter.route("/post-a-job", {
	action(params, queryParams) {
		ReactDOM.render(
			<PostAJobForm companyId={queryParams.id} />,
			document.getElementById("view-render")
		);
	}
});

FlowRouter.route("/apply-for-job", {
	action(params, queryParams) {
		ReactDOM.render(
			<ApplyForJobForm jobId={queryParams.id} />,
			document.getElementById("view-render")
		);
	}
});

FlowRouter.route("/user", {
    action(params, queryParams) {
        ReactDOM.render(
            <UserPage user_id={queryParams.id} />,
            document.getElementById("view-render")
        );
    }
});

// Add a 404 page to handle unknown paths.
FlowRouter.notFound = {
    action() {
        ReactDOM.render(
            <NotFoundPage />,
            document.getElementById("view-render")
        );
    }
};
