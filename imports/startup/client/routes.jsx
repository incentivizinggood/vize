import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import HomePage from "../../ui/pages/home.jsx";
import ContactUsPage from "../../ui/pages/contact-us.jsx";
import AboutPage from "../../ui/pages/about.jsx";
import LoginPage from "../../ui/pages/login.jsx";
import CompaniesPage from "../../ui/pages/companies.jsx";
import RegisterPage from "../../ui/pages/register.jsx";

export const siteRoutes = (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={HomePage} />
            <Route path="/home" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/companies" component={CompaniesPage} />
            <Route path="/contact-us" component={ContactUsPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
        </div>
    </BrowserRouter>
);
