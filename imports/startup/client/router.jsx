import ReactDOM from "react-dom";
import React from "react";

import HomePage from "../../ui/pages/home.jsx";
import ContactUsPage from "../../ui/pages/contact-us.jsx";
import AboutPage from "../../ui/pages/about.jsx";
import LoginPage from "../../ui/pages/login.jsx";
import CompaniesPage from "../../ui/pages/companies.jsx";
import RegisterPage from "../../ui/pages/register.jsx";

FlowRouter.route("/", {
    action(params, queryParams) {
        ReactDOM.render(<HomePage />, document.getElementById("view-render"));
    }
});

FlowRouter.route("/about", {
    action(params, queryParams) {
        ReactDOM.render(<AboutPage />, document.getElementById("view-render"));
    }
});

FlowRouter.route("/companies", {
    action(params, queryParams) {
        ReactDOM.render(
            <CompaniesPage />,
            document.getElementById("view-render")
        );
    }
});

FlowRouter.route("/contact-us", {
    action(params, queryParams) {
        ReactDOM.render(
            <ContactUsPage />,
            document.getElementById("view-render")
        );
    }
});

FlowRouter.route("/login", {
    action(params, queryParams) {
        ReactDOM.render(<LoginPage />, document.getElementById("view-render"));
    }
});

FlowRouter.route("/register", {
    action(params, queryParams) {
        ReactDOM.render(
            <RegisterPage />,
            document.getElementById("view-render")
        );
    }
});
