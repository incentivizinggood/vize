import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Router, Route } from 'react-router';

import Contact from '../imports/ui/contact-view.jsx';

Meteor.startup(() => {
    render(
        <Router>
            <Route path='/contact-us' component={Contact}/>
        </Router>,
        document.getElementById('view-render')
    );

});



