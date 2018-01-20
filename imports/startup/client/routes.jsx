import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Home from "../../ui/home-view.jsx";
import Contact from "../../ui/contact-view.jsx";
import About from "../../ui/about-view";
import Login from "../../ui/login-view";
import CompaniesView from "../../ui/companies-view";
import Reviews from "../../ui/Review.jsx";
import Mainpage from "../../ui/main-page";
import Register from "../../ui/register-view.jsx";

export const siteRoutes = (
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/companies" component={CompaniesView} />
            <Route path="/contact-us" component={Contact} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </div>
    </BrowserRouter>
);
