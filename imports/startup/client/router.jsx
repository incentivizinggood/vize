import React from "react";
import ReactDOM from "react-dom";

import AboutPage from "../../ui/pages/about.jsx";
import CompanySearchPage from "../../ui/pages/company-search.jsx";
import CompanyPage from "../../ui/pages/company.jsx";
import ContactUsPage from "../../ui/pages/contact-us.jsx";
import HelpPage from "../../ui/pages/help.jsx";
import HomePage from "../../ui/pages/home.jsx";
import LoginPage from "../../ui/pages/login.jsx";
import MyAccountPage from "../../ui/pages/my-account.jsx";
import NotFoundPage from "../../ui/pages/not-found.jsx";
import RegisterPage from "../../ui/pages/register.jsx";
import UserPage from "../../ui/pages/user.jsx";
import WriteReviewPage from "../../ui/pages/write-review.jsx";

// Reduces boiler plate for simple pages.
function routeSimplePage(path, element) {
    FlowRouter.route(path, {
        action(params, queryParams) {
            ReactDOM.render(element, document.getElementById("view-render"));
        }
    });
}

routeSimplePage("/", <HomePage />);
routeSimplePage("/about", <AboutPage />);
routeSimplePage("/contact-us", <ContactUsPage />);
routeSimplePage("/help", <HelpPage />);
routeSimplePage("/login", <LoginPage />);
routeSimplePage("/my-account", <MyAccountPage />);
routeSimplePage("/register", <RegisterPage />);
routeSimplePage("/write-review", <WriteReviewPage />);

FlowRouter.route("/companies", {
    action(params, queryParams) {
        ReactDOM.render(
            <CompanySearchPage queryParams={queryParams} />,
            document.getElementById("view-render")
        );
    }
});

FlowRouter.route("/company", {
    action(params, queryParams) {
        ReactDOM.render(
            <CompanyPage company_id={queryParams.id} />,
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
