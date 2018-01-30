import ReactDOM from "react-dom";
import React from "react";

import HomePage from "../../ui/pages/home.jsx";
import ContactUsPage from "../../ui/pages/contact-us.jsx";
import AboutPage from "../../ui/pages/about.jsx";
import LoginPage from "../../ui/pages/login.jsx";
import CompaniesPage from "../../ui/pages/companies.jsx";
import RegisterPage from "../../ui/pages/register.jsx";
import NotFoundPage from "../../ui/pages/not-found.jsx";

// Reduces boiler plate for simple pages.
function routeSimplePage(path, pageType) {
    FlowRouter.route(path, {
        action(params, queryParams) {
            ReactDOM.render(
                React.createElement(pageType, { params: params, queryParams }),
                document.getElementById("view-render")
            );
        }
    });
}

routeSimplePage("/", HomePage);
routeSimplePage("/about", AboutPage);
routeSimplePage("/companies", CompaniesPage);
routeSimplePage("/contact-us", ContactUsPage);
routeSimplePage("/login", LoginPage);
routeSimplePage("/register", RegisterPage);

// Add a 404 page to handle unknown paths.
FlowRouter.notFound = {
    action() {
        ReactDOM.render(
            <NotFoundPage />,
            document.getElementById("view-render")
        );
    }
};
