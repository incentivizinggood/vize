import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { BrowserRouter, Route} from 'react-router-dom';

import './main.html';

import Home from '../imports/ui/home-view.jsx';
import Contact from '../imports/ui/contact-view.jsx';

Meteor.startup(() => {
    render(
        <BrowserRouter>
            <div>
                <Route path='/home' component={Home}/>
                <Route path='/contact-us' component={ Contact }/>
            </div>
        </BrowserRouter>,
        document.getElementById('view-render')
    );
});




