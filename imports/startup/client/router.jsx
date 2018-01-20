import ReactDOM from "react-dom";
import React from "react";

import HomePage from "../../ui/pages/home.jsx";
import ContactUsPage from "../../ui/pages/contact-us.jsx";
import AboutPage from "../../ui/pages/about.jsx";
import LoginPage from "../../ui/pages/login.jsx";
import CompaniesPage from "../../ui/pages/companies.jsx";
import RegisterPage from "../../ui/pages/register.jsx";

// Reduces boiler plate for simple pages.
function routeSimplePage(path, component) {
    FlowRouter.route(path, {
        action(params, queryParams) {
            ReactDOM.render(component, document.getElementById("view-render"));
        }
    });
}

routeSimplePage("/", <HomePage />);
routeSimplePage("/about", <AboutPage />);
routeSimplePage("/companies", <CompaniesPage />);
routeSimplePage("/contact-us", <ContactUsPage />);
routeSimplePage("/login", <LoginPage />);
routeSimplePage("/register", <RegisterPage />);
