import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route} from 'react-router-dom';

import './main.html';

import Home from '../imports/ui/home-view.jsx';
import Contact from '../imports/ui/contact-view.jsx';
import About from '../imports/ui/about-view';
import Login from '../imports/ui/login-view';
import Companies from '../imports/ui/companies-view';

Meteor.startup(() => {
    render(
        <BrowserRouter>
            <div>
                <Route path='/home' component={Home}/>
                <Route path='/about' component={About}/>
                <Route path='/companies' component={Companies}/>
                <Route path='/contact-us' component={ Contact }/>
                <Route path='/login' component={Login}/>
            </div>
        </BrowserRouter>,
        document.getElementById('view-render')
    );
});




