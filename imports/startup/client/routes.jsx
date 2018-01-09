import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Home from '../../ui/home-view.jsx';
import Contact from '../../ui/contact-view.jsx';
import About from '../../ui/about-view';
import Login from '../../ui/login-view';
import Companies from '../../ui/companies-view';
import Reviews from '../../ui/Review.jsx'
import Mainpage from '../../ui/main-page'
import Register from '../../ui/register-view.jsx'
import Star from "../../ui/star";


// Containers go below
import AppContainer from '../../ui/containers/app-container'


export const siteRoutes = (
    <BrowserRouter>
        <div>
            <Route path='/home' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/companies' component={Reviews}/>
            <Route path='/contact-us' component={Contact}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/stars' component={Star} />
            <Route exact={true} path={'/'} component={AppContainer}/>
        </div>
    </BrowserRouter>);
