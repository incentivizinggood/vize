import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Router, Route } from 'react-router';

import './main.html';

import Home from '../imports/ui/home-view.jsx';
import Contact from '../imports/ui/contact-view.jsx';

Meteor.startup(() => {
    render(
        <Router>
            <Route path='/' component={Home}/>
            <Route path='/contact-us' component={ Contact }/>
        </Router>,
        document.getElementById('view-render')
    );
});




