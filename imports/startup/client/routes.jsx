import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../../ui/pages/home.jsx";
import Contact from "../../ui/contact-view.jsx";
import AboutPage from "../../ui/pages/about.jsx";
import Login from "../../ui/login-view";
import CompaniesPage from "../../ui/pages/companies.jsx";
import Reviews from "../../ui/Review.jsx";
import Mainpage from "../../ui/main-page";
import Register from "../../ui/register-view.jsx";

export const siteRoutes = (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={AboutPage} />
            <Route path="/companies" component={CompaniesPage} />
            <Route path="/contact-us" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </div>
    </BrowserRouter>
);
