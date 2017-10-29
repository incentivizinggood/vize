import React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';

import Home from '../../ui/home-view.jsx';
import Contact from '../../ui/contact-view.jsx';
import About from '../../ui/about-view';
import Login from '../../ui/login-view';
import Companies from '../../ui/companies-view';

export const siteRoutes = (
    <BrowserRouter>
        <div>
            <Route path='/home' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/companies' component={Companies}/>
            <Route path='/contact-us' component={ Contact }/>
            <Route path='/login' component={Login}/>
        </div>
    </BrowserRouter>);
