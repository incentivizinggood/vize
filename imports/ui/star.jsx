import React, {Component} from 'react';
import {StarRating} from './StarRating.js'

export default class Star extends Component {
    render() {
        return (<html>
        <head>
            <title>Star</title>
            <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"/>
        </head>
        <body>
        <br/>
        <br/>

        <div>
            <p> Health and Safety </p>
            <span> <x-star-rating id="safety" value="0" number="5"></x-star-rating> </span>
        </div>

        <br/>
        <div>
            <p> Wages </p>
            <span> <x-star-rating id="safety" value="0" number="5"></x-star-rating> </span>
        </div>
        <br/>
        <div>
            <p> Recommended </p>
            <span> <x-star-rating id="safety" value="0" number="5"></x-star-rating> </span>
        </div>
        <br/>
        <textarea rows="10" columns="50" placeholder=" Your reviews here.."></textarea>
        <script>
            alert("Hello")
        </script>
        </body>
        </html>);

    }
}